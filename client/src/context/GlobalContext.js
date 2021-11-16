import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const userName = sessionStorage.getItem('name');
    const userId = sessionStorage.getItem('id');
    const jwt = sessionStorage.getItem('token');
    const [user, setUser] = useState(jwt ? true : false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ display: false, icon: '', msg: '' });
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const [showLinks, setShowLinks] = useState(false);
    const [selectedConversation, setSelectedConversation] = useState(false);
    const [isMessageSent, setIsMessageSent] = useState(false);

    // schließe das Usermenu rechts oben
    const closeSubmenu = () => {
        setIsSubmenuOpen(false);
    };

    // klappe das Navigationsmenu ein nach Klicken eines Links
    const hideLinks = () => {
        if (showLinks) {
            setShowLinks(false);
        }
    };

    // speichere APIs, states und functions in einer globalen Variable
    const globalValues = {
        user,
        setUser,
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
        showLinks,
        setShowLinks,
        hideLinks
    };

    return (
        <AppContext.Provider value={globalValues}>
            {children}
        </AppContext.Provider>
    );
};

// custom hook
export const useGlobalContext = () => {
    return useContext(AppContext);
};
