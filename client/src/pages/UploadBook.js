import React from 'react';
import '../styles/UploadBook.css';
import Alert from '../components/Alert';
import ImageUploader from '../components/ImageUploader';
import InputField from '../components/InputField';
import { FaFlushed } from 'react-icons/fa';
import { useGlobalContext } from '../context/OverallContext';
import TextAreaInput from '../components/TextAreaInput';
import ActionBtn from '../components/ActionBtn';
import Form from '../components/Form';
import { useBookUpload } from '../hooks/useBookUpload';

const UploadBook = () => {
  const {
    alert,
    setAlert,
    closeSubmenu,
    newBook,
    setNewBook,
    jwt,
    userId,
    API_BOOKS,
    bookImage,
    setBookImage,
  } = useGlobalContext();
  const { bookUpload } = useBookUpload();

  const textChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const uploadAll = (e) => {
    e.preventDefault();
    if (
      newBook.name &&
      newBook.author &&
      newBook.genre &&
      newBook.language &&
      newBook.condition &&
      newBook.owner
    ) {
      const bookData = new FormData();
      bookData.append('bookImage', bookImage);
      bookData.append('name', newBook.name);
      bookData.append('author', newBook.author);
      bookData.append('category', newBook.genre);
      bookData.append('language', newBook.language);
      bookData.append('condition', newBook.condition);
      bookData.append('owner', newBook.owner);
      bookData.append('description', newBook.desc);
      bookUpload(API_BOOKS, jwt, bookData);
    } else {
      setAlert({
        display: true,
        icon: <FaFlushed />,
        msg: 'Halt, da fehlen paar Felder!',
      });
    }
  };

  return (
    <>
      <main onClick={closeSubmenu}>
        <h2 className='title'>Buch hochladen</h2>
        <Form className='book-form' onSubmit={uploadAll}>
          <ImageUploader />
          <div className='info-upload'>
            <InputField
              type='text'
              htmlFor='Name:'
              name='name'
              id='name'
              placeholder='Name des Buches'
              value={newBook.name}
              onChange={textChange}
            />
            <InputField
              type='text'
              htmlFor='Autor:'
              name='author'
              id='author'
              placeholder='Autor des Buches'
              value={newBook.author}
              onChange={textChange}
            />
            <InputField
              type='text'
              htmlFor='Genre:'
              name='genre'
              id='genre'
              placeholder='Genre des Buches'
              value={newBook.genre}
              onChange={textChange}
            />
            <InputField
              type='text'
              htmlFor='Sprache:'
              name='language'
              id='language'
              placeholder='Sprache des Buches'
              value={newBook.language}
              onChange={textChange}
            />
            <InputField
              type='text'
              htmlFor='Zustand:'
              name='condition'
              id='condition'
              placeholder='Zustand des Buches'
              value={newBook.condition}
              onChange={textChange}
            />
            <InputField
              type='text'
              htmlFor='Besitzer:'
              name='owner'
              id='owner'
              value={userId}
              disabled
            />
            <TextAreaInput
              htmlFor='Beschreibung:'
              name='desc'
              id='desc'
              cols='30'
              rows='5'
              placeholder='Kurze Beschreibung des Buches'
              value={newBook.desc}
              onChange={textChange}
            />
            <div className='action-btn-container'>
              <ActionBtn type='submit'>Hochladen</ActionBtn>
              <ActionBtn
                type='reset'
                onClick={() => {
                  setBookImage();
                  setNewBook({
                    name: '',
                    author: '',
                    genre: '',
                    language: '',
                    condition: '',
                    owner: userId,
                    desc: '',
                  });
                }}
              >
                Löschen
              </ActionBtn>
            </div>
          </div>
        </Form>
        {alert.display && <Alert />}
      </main>
    </>
  );
};

export default UploadBook;
