import { FaFileImage } from 'react-icons/fa';
import { useUploadBookContext } from '../context/UploadBookContext';

const ImageUploader = () => {
  const { bookImage, imageChange } = useUploadBookContext();

  return (
    <>
      <div className='image-upload'>
        <label htmlFor='image' name='image' className='upload-icon'>
          <FaFileImage />
        </label>
        <input
          type='file'
          id='image'
          name='image'
          className='file-input'
          onChange={imageChange}
        />
        <p className='file-info'>Lade hier ein Bild deines Buches hoch</p>
        <p className='file-name'>
          {bookImage ? bookImage.name : 'Kein Bild ausgewählt'}
        </p>
      </div>
    </>
  );
};

export default ImageUploader;
