import express from 'express';
import authCtrl from '../controllers/auth.controller';
import bookCtrl from '../controllers/book.controller';
import imgCtrl from '../controllers/image.controller';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router
  .route('/')
  .get(bookCtrl.list) //Seite mit allen hochgeladenen Büchern
  .post(
    authCtrl.requireSignin,
    imgCtrl.UploadImageToMemory,
    imgCtrl.UploadBookImageToImagekit,
    bookCtrl.create
  ); // login notwendig

// New Route to getBooks by User
router.route('/user/:userId').get(authCtrl.requireSignin, bookCtrl.bookByUser);

// get book by bookid
router
  .route('/:bookId')
  .get(authCtrl.requireSignin, bookCtrl.read) //Registrierung nötig
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorizationForBook,
    bookCtrl.update
  ) // Update with PUT
  .delete(
    authCtrl.requireSignin,
    authCtrl.hasAuthorizationForBook,
    imgCtrl.MoveBookToDeleteFolder,
    bookCtrl.remove
  ); // Remove with DELETE

// Update image
router
  .route('/image/:bookId')
  .put(
    authCtrl.requireSignin,
    authCtrl.hasAuthorizationForBook,
    imgCtrl.UploadImageToMemory,
    imgCtrl.UploadBookImageToImagekit,
    bookCtrl.updateImage
  ); // Update with PUT

// add user and book id to req
router.param('bookId', bookCtrl.bookByID);
router.param('userId', userCtrl.userByID);

export default router;
