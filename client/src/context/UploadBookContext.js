import { createContext, useContext, useState } from 'react';
import { FaCheckCircle, FaPoo, FaFlushed } from 'react-icons/fa';
import { useGlobalContext } from './GlobalContext';
import { genres, languages, conditions, status } from '../utils/dropdown';

const UploadBookContext = createContext();

export const UploadBookProvider = ({ children }) => {
  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
    genre: genres[0].title,
    language: languages[0].title,
    condition: conditions[0].title,
    status: status[0].title,
    desc: '',
  });
  const [bookImage, setBookImage] = useState();
  const { setLoading, setAlert, API_BOOKS, userId, userName, jwt } =
    useGlobalContext();

  // POST Buch
  const bookUpload = async (api, token, formdata) => {
    try {
      setLoading(true);
      const res = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formdata,
      });
      if (res.ok) {
        await res.json();
        setLoading(false);
        setAlert({
          display: true,
          icon: <FaCheckCircle />,
          msg: 'Das Buch wurde erfolgreich hinzugefügt',
        });
      } else {
        throw new Error('Hoppala, da ist was schief gegangen');
      }
    } catch (error) {
      console.log('Hochladen fehlgeschlagen', error);
      setLoading(false);
      setAlert({
        display: true,
        icon: <FaPoo />,
        msg: 'Das hat irgendwie nicht geklappt...',
      });
    } finally {
      setNewBook({
        name: '',
        author: '',
        genre: genres[0].title,
        language: languages[0].title,
        condition: conditions[0].title,
        status: status[0].title,
        desc: '',
      });
      setBookImage();
    }
  };

  // Textfeldeingabe
  const textChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  // Bilddatei hinzufügen
  const imageChange = (e) => {
    setBookImage(e.target.files[0]);
  };

  // Buch hochladen
  const uploadAll = (e) => {
    e.preventDefault();
    if (
      newBook.name &&
      newBook.author &&
      newBook.genre &&
      newBook.language &&
      newBook.condition &&
      newBook.status
    ) {
      const bookData = new FormData();
      bookData.append('bookImage', bookImage);
      bookData.append('name', newBook.name);
      bookData.append('author', newBook.author);
      bookData.append('category', newBook.genre);
      bookData.append('language', newBook.language);
      bookData.append('condition', newBook.condition);
      bookData.append('owner', userId);
      bookData.append('username', userName);
      bookData.append('status', newBook.status);
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

  // resette die komplette Eingabe
  const resetInput = () => {
    setBookImage();
    setNewBook({
      name: '',
      author: '',
      genre: genres[0].title,
      language: languages[0].title,
      condition: conditions[0].title,
      owner: userId,
      username: userName,
      status: status[0].title,
      desc: '',
    });
  };

  // speichere states und functions in Variable
  const uploadValues = {
    newBook,
    bookImage,
    textChange,
    imageChange,
    uploadAll,
    resetInput,
  };

  // gebe Variable an children weiter
  return (
    <UploadBookContext.Provider value={uploadValues}>
      {children}
    </UploadBookContext.Provider>
  );
};

// custom hook
export const useUploadBookContext = () => {
  return useContext(UploadBookContext);
};
