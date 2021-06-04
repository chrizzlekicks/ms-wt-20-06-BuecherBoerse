import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const API_BOOKS = '/api/books/';
  const API_USERS = '/api/users/';
  const AUTH_SIGNIN = '/auth/signin/';
  const AUTH_SIGNOUT = '/auth/signout';
  const API_BOOKSBYUSER = '/api/books/user/';
  const API_MESSAGES = '/api/messages/';
  const API_MESSAGESUSER = '/api/messages/user/';
  const userName = sessionStorage.getItem('name');
  const userId = sessionStorage.getItem('id');
  const jwt = sessionStorage.getItem('token');
  const [isTabLeft, setIsTabLeft] = useState(true);
  const [userCredential, setUserCredential] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(userName ? true : false);
  const [loading, setLoading] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [location, setLocation] = useState({});
  const [alert, setAlert] = useState({ display: false, icon: '', msg: '' });
  const [isMessageSent, setIsMessageSent] = useState(false);

  // öffne das Usermenu rechts oben
  const openSubmenu = (coordinates) => {
    setLocation(coordinates);
    setIsSubmenuOpen(true);
  };

  // schließe das Usermenu rechts oben
  const closeSubmenu = () => {
    setIsSubmenuOpen(false);
  };

  // schliesse das Usermenu unabhängig davon wo der User hinklickt (außerhalb des Usermenus)
  const hideSubmenu = (e) => {
    if (!e.target.classList.contains('helper')) {
      closeSubmenu();
    }
  };

  // klappe das Navigationsmenu ein nach Klicken eines Links
  const hideLinks = () => {
    if (showLinks) {
      setShowLinks(false);
    }
  };

  // speichere APIs, states und functions in einer globalen Variable
  const globalValues = {
    API_BOOKS,
    API_USERS,
    AUTH_SIGNIN,
    AUTH_SIGNOUT,
    API_BOOKSBYUSER,
    API_MESSAGES,
    API_MESSAGESUSER,
    isUserLoggedIn,
    setIsUserLoggedIn,
    userCredential,
    setUserCredential,
    loading,
    setLoading,
    alert,
    setAlert,
    showLinks,
    setShowLinks,
    isSubmenuOpen,
    openSubmenu,
    closeSubmenu,
    hideSubmenu,
    isTabLeft,
    setIsTabLeft,
    location,
    userName,
    userId,
    jwt,
    hideLinks,
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
