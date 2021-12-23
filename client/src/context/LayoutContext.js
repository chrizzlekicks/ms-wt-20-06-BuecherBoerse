import React, { createContext, useState, useContext } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ display: false, icon: '', msg: '' });
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const [isTabLeft, setIsTabLeft] = useState(true);
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
    const layoutValues = {
        loading,
        setLoading,
        alert,
        setAlert,
        isTabLeft,
        setIsTabLeft,
        closeSubmenu,
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
        <LayoutContext.Provider value={layoutValues}>
            {children}
        </LayoutContext.Provider>
    );
};

// custom hook
export const useLayoutContext = () => {
    return useContext(LayoutContext);
};
