import React, { useState } from 'react';
import ReturnTo from '../components/ReturnTo';
import '../styles/UploadBook.css';
import Alert from '../components/Alert';
import ImageUploader from '../components/ImageUploader';
import { FaCheckCircle, FaFlushed, FaPoo } from 'react-icons/fa';

const api = 'http://localhost:4000/api/books/';

const UploadBook = () => {
  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
    genre: '',
    language: '',
    condition: '',
    desc: '',
  });
  const [bookImage, setBookImage] = useState();
  const [alert, setAlert] = useState({ display: false, icon: '', msg: '' });
  const { name, author, genre, language, condition, desc } = newBook;

  const textChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const uploadAll = (e) => {
    e.preventDefault();
    if (name && author && genre && language && condition) {
      const bookData = new FormData();
      bookData.append('file', bookImage);
      bookData.append('name', name);
      bookData.append('author', author);
      bookData.append('category', genre);
      bookData.append('language', language);
      bookData.append('condition', condition);
      bookData.append('description', desc);
      fetch(api, {
        method: 'POST',
        body: bookData,
      })
        .then((res) => {
          if (res >= 200 && res <= 299) {
            return res.json();
          } else {
            throw new Error('Hoppala, da ist was schief gegangen');
          }
        })
        .then((postedBook) => console.log('Success!', postedBook))
        .catch((err) => {
          console.log('Hochladen fehlgeschlagen', err);
          setAlert({
            display: true,
            icon: <FaPoo />,
            msg: 'Scheisse! Das hat irgendwie nicht geklappt...',
          });
        });
      setAlert({
        display: true,
        icon: <FaCheckCircle />,
        msg: 'Das Buch wurde erfolgreich hinzugefügt',
      });
      setNewBook({
        name: '',
        author: '',
        genre: '',
        language: '',
        condition: '',
        desc: '',
      });
      setBookImage();
    } else {
      setAlert({
        display: true,
        icon: <FaFlushed />,
        msg: 'Halt, da fehlen paar Felder!',
      });
    }
  };

  return (
    <main>
      <ReturnTo />
      <h2 className='title'>Buch hochladen</h2>
      <section className='section-center'>
        <form className='book-form' onSubmit={uploadAll}>
          <ImageUploader bookImage={bookImage} setBookImage={setBookImage} />
          <div className='info-upload'>
            <div className='form-control'>
              <label htmlFor='name' name='name'>
                Name:
              </label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Name des Buches'
                value={name}
                onChange={textChange}
              ></input>
            </div>
            <div className='form-control'>
              <label htmlFor='author' name='author'>
                Autor:
              </label>
              <input
                type='text'
                id='author'
                name='author'
                placeholder='Autor des Buches'
                value={author}
                onChange={textChange}
              ></input>
            </div>
            <div className='form-control'>
              <label htmlFor='genre' name='genre'>
                Genre:
              </label>
              <input
                type='text'
                id='genre'
                name='genre'
                placeholder='Genre des Buches'
                value={genre}
                onChange={textChange}
              ></input>
            </div>
            <div className='form-control'>
              <label htmlFor='language' name='language'>
                Sprache:
              </label>
              <input
                type='text'
                id='language'
                name='language'
                placeholder='Sprache des Buches'
                value={language}
                onChange={textChange}
              ></input>
            </div>
            <div className='form-control'>
              <label htmlFor='condition' name='condition'>
                Zustand:
              </label>
              <input
                type='text'
                id='condition'
                name='condition'
                placeholder='Zustand des Buches'
                value={condition}
                onChange={textChange}
              ></input>
            </div>
            <div className='form-control'>
              <label htmlFor='desc' name='desc'>
                Beschreibung:
              </label>
              <textarea
                id='desc'
                name='desc'
                placeholder='Kurze Beschreibung des Buches'
                cols='30'
                rows='5'
                value={desc}
                onChange={textChange}
              ></textarea>
            </div>
            <div className='btn-containr'>
              <button className='btn' type='submit' onSubmit={uploadAll}>
                Hochladen
              </button>
              <button
                className='btn'
                type='reset'
                onClick={() => {
                  setBookImage();
                  setNewBook({
                    name: '',
                    author: '',
                    genre: '',
                    language: '',
                    condition: '',
                    desc: '',
                  });
                }}
              >
                Löschen
              </button>
            </div>
          </div>
        </form>
      </section>
      {alert.display && <Alert {...alert} setAlert={setAlert} />}
    </main>
  );
};

export default UploadBook;
