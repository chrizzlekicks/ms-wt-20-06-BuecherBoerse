import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useGlobalContext } from './GlobalContext';
import { FaCheckCircle, FaPoo } from 'react-icons/fa';

const OpenBookContext = createContext();

export const OpenBookProvider = ({ children }) => {
  const [openBook, setOpenBook] = useState({});
  const [showDesc, setShowDesc] = useState(false);
  const [showEditBook, setShowEditBook] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [newConv, setNewConv] = useState({
    sender: '',
    reciever: '',
    message: '',
  });
  const { id } = useParams();
  const {
    setLoading,
    setAlert,
    API_BOOKS,
    API_MESSAGES,
    userId,
    jwt,
    setIsMessageSent,
  } = useGlobalContext();
  const history = useHistory();

  // GET Buchinfo vom Backend
  const fetchSingleBook = useCallback(
    async (api, id) => {
      setLoading(true);
      try {
        const res = await fetch(`${api}${id}`);
        if (res.ok) {
          const singleBook = await res.json();
          setOpenBook(singleBook);
        } else {
          throw new Error('etwas hat nicht geklappt');
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setOpenBook]
  );

  // DELETE Buch
  const deleteSingleBook = async (api, id, token) => {
    try {
      setLoading(true);
      const res = await fetch(`${api}${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        await res.json();
        setLoading(false);
        history.goBack(
          setAlert({
            display: true,
            icon: <FaCheckCircle />,
            msg: 'Das Buch wurde erfolgreich gelöscht',
          })
        );
      } else {
        throw new Error('Das Buch konnte nicht gelöscht werden');
      }
    } catch (error) {
      console.log('Löschen fehlgeschlagen', error);
      setLoading(false);
      setAlert({
        display: true,
        icon: <FaPoo />,
        msg: 'Das Buch konnte nicht gelöscht werden...',
      });
    }
  };

  // PUT verändere Buchinformation
  const updateSingleBookInfo = async (api, id, token, data) => {
    try {
      setLoading(true);
      const res = await fetch(`${api}${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        await res.json();
        setShowEditBook(false);
        setAlert({
          display: true,
          icon: <FaCheckCircle />,
          msg: 'Du hast die Buchinfo erfolgreich geändert!',
        });
      } else {
        throw new Error('Hoppla, da ist wohl was schief gegangen');
      }
    } catch (error) {
      console.log('Update fehlgeschlagen', error);
      setAlert({
        display: true,
        icon: <FaPoo />,
        msg: 'Die Buchinfo konnte irgendwie nicht gespeichert werden...',
      });
    } finally {
      setLoading(false);
    }
  };

  // POST Anfrage an den User
  const startNewConversation = async (api_messages, token, message) => {
    try {
      setLoading(true);
      const res = await fetch(`${api_messages}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
      });
      if (res.ok) {
        await res.json();
        setAlert({
          display: true,
          icon: <FaCheckCircle />,
          msg: 'Nachricht wurde erfolgreich verschickt',
        });
        setShowMessageModal(false);
      } else {
        throw new Error('Nachricht konnte nicht verschickt werden');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setNewConv({
        sender: '',
        reciever: '',
        message: '',
      });
    }
  };

  // öffne Buch
  useEffect(() => {
    fetchSingleBook(API_BOOKS, id);
  }, [API_BOOKS, fetchSingleBook, id]);

  // lösche Buch
  const removeBook = () => {
    deleteSingleBook(API_BOOKS, id, jwt);
  };

  // öffne Fenster zum Bearbeiten
  const openEditWindow = () => {
    setShowEditBook(true);
  };

  // Textfeldeingabe
  const textChange = (e) => {
    setOpenBook({ ...openBook, [e.target.name]: e.target.value });
  };

  // update Buchinfo
  const updateBook = (e) => {
    e.preventDefault();
    updateSingleBookInfo(API_BOOKS, id, jwt, openBook);
  };

  // schließe Fenster zum Bearbeiten
  const closeEditWindow = () => {
    setShowEditBook(false);
  };

  // minimiere Buchbeschreibung
  const collapseDesc = () => {
    setShowDesc(!showDesc);
  };

  // kontaktiere Besitzer des Buchs
  const messageUser = () => {
    setShowMessageModal(true);
  };

  // Input des Nachrichtenfensters
  const msgModalInput = (e) => {
    setNewConv({
      sender: userId,
      reciever: openBook.owner,
      message: e.target.value,
    });
  };

  // schicke die fertige erste Anfrage ab
  const submitConv = (e) => {
    e.preventDefault();
    startNewConversation(API_MESSAGES, jwt, newConv);
    setIsMessageSent(true);
  };

  // schließe Nachrichtenfenster
  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  // states und functions in Variable speichern
  const openValues = {
    openBook,
    showEditBook,
    showMessageModal,
    showDesc,
    newConv,
    removeBook,
    openEditWindow,
    textChange,
    updateBook,
    closeEditWindow,
    collapseDesc,
    messageUser,
    msgModalInput,
    submitConv,
    closeMessageModal,
  };

  // gib Variable an children weiter
  return (
    <OpenBookContext.Provider value={openValues}>
      {children}
    </OpenBookContext.Provider>
  );
};

// custom hook
export const useOpenBookContext = () => {
  return useContext(OpenBookContext);
};
