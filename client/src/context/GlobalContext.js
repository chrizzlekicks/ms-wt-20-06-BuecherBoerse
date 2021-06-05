import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const API_BOOKS = '/api/books/';
  const API_USERS = '/api/users/';
  const API_BOOKSBYUSER = '/api/books/user/';
  const API_MESSAGES = '/api/messages/';
  const API_MESSAGESUSER = '/api/messages/user/';
  const userName = sessionStorage.getItem('name');
  const userId = sessionStorage.getItem('id');
  const jwt = sessionStorage.getItem('token');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(userName ? true : false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ display: false, icon: '', msg: '' });
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);

  // schließe das Usermenu rechts oben
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  // speichere APIs, states und functions in einer globalen Variable
  const globalValues = {
    API_BOOKS,
    API_USERS,
    API_BOOKSBYUSER,
    API_MESSAGES,
    API_MESSAGESUSER,
    isUserLoggedIn,
    setIsUserLoggedIn,
    loading,
    setLoading,
    alert,
    setAlert,
    closeSubmenu,
    userName,
    userId,
    jwt,
    isSubmenuOpen,
    setIsSubmenuOpen,
    selectedConversation,
    setSelectedConversation,
    isMessageSent,
    setIsMessageSent,
  };

  return (
    <AppContext.Provider value={globalValues}>{children}</AppContext.Provider>
  );
};

// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};
