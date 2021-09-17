import multer from 'multer';
import ImageKit from 'imagekit';
import config from './../../config/config';

// imagekit.io Auth definition
// Define in process.env.
var imagekitUpload = new ImageKit({
  publicKey: 'public_s2ZIqzkkWu+a+UOrk9u2Jhdns2Q=',
  privateKey: 'private_L2UxjOxihAT5R251LixHqwXpopI=',
  urlEndpoint: 'https://ik.imagekit.io/buecherregal/',
});

// Save picture temporally in memory
var storage = multer.memoryStorage();

// Überprüfung, ob es sich um ein Bild handelt
const checkFileType = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/; // Allowed extention
  const hasMatchingMimetype = filetypes.test(file.mimetype); // Check mime

  if (hasMatchingMimetype) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//Anwendung verschiedener Upload-Parameter
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 4000000, //max. Dateigröße 4MB
  },
  fileFilter: checkFileType,
});

// Upload Image to memory
// feldname beim Upload-formular = bookImage
const UploadImageToMemory = upload.single('bookImage');

const ShowUploadInfo = (req, res, next) => {
  //console.log(req.file)
  console.log('File upload to memory successfull.');
  next();
};

const UploadBookImageToImagekit = (req, res, next) => {
  const file_name = Date.now() + '-' + req.file.originalname;

  imagekitUpload
    .upload({
      file: req.file.buffer, //required
      fileName: file_name, //required
      folder: 'b',
    })
    .then((response) => {
      // Add the image url to the response
      res.locals.BookUrl = response.url;
      // Add the image id to the response for deleting
      res.locals.BookImageId = response.fileId;
      next();
    })
    .catch((error) => {
      res.send(error);
    });
};

// For later for removing pictures from the db
const MoveBookToDeleteFolder = (req, res, next) => {
  const fileName = req.profile.image.split('/').pop();
  const sourceFilePath = '/b/' + fileName;
  const destinationPath = '/d/';

  imagekitUpload
    .moveFile(sourceFilePath, destinationPath)
    .then((response) => {
      //console.log(response);
      next();
    })
    .catch((error) => {
      res.send(error);
    });
};

// We need the id to delete the file
const DeleteBookImage = (req, res, next) => {
  // Find by file name and file path
  const fileName = req.profile.image.split('/').pop();
  let ImageId = 0;
  imagekitUpload.listFiles(
    {
      searchQuery: 'name=' + fileName + ' AND filePath="b"',
    },
    function (error, result) {
      if (error) {
        console.log(error);
      } else {
        ImageId = result.fileId;
      }
    }
  );

  if (ImageId != 0) {
    imagekitUpload.deleteFile(ImageId, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });
  } else {
    res.send('Image not found');
  }
};

export default {
  UploadImageToMemory,
  UploadBookImageToImagekit,
  ShowUploadInfo,
  MoveBookToDeleteFolder,
};
