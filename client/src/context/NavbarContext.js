import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useGlobalContext } from './GlobalContext';

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
    const AUTH_SIGNOUT = '/auth/signout';
    const [navbar, setNavbar] = useState(false);
    const [location, setLocation] = useState({});
    const container = useRef(null);
    const {
        setUser,
        closeSubmenu,
        setIsSubmenuOpen,
        setSelectedConversation,
        setShowLinks,
        showLinks
    } = useGlobalContext();

    // GET logge User aus System
    const signoutUser = async (url) => {
        try {
            const res = await fetch(url);
            if (res.ok) {
                await res.json();
                sessionStorage.clear();
                setShowLinks(false);
            } else {
                throw new Error('Hoppala, da ist wohl was schief gelaufen...');
            }
        } catch (error) {
            console.log('Das hat nicht geklappt', error);
        }
    };

    // aktiviere sticky navbar beim scrollen
    useEffect(() => {
        const stickyNav = () => {
            if (window.scrollY >= 120) {
                setNavbar(true);
            } else {
                setNavbar(false);
            }
        };
        window.addEventListener('scroll', stickyNav);
        return () => {
            window.removeEventListener('scroll', stickyNav);
        };
    });

    // bestimme die Position des Submenus
    useEffect(() => {
        const submenu = container.current;
        const { divCenter, divBottom } = location;
        submenu.style.left = `${divCenter}px`;
        submenu.style.bottom = `${divBottom}px`;
    }, [location]);

    // toggle Navbar in mobiler Ansicht
    const toggleNavbar = () => {
        setShowLinks(!showLinks);
    };

    // öffne das Usermenu rechts oben
    const openSubmenu = (coordinates) => {
        setLocation(coordinates);
        setIsSubmenuOpen(true);
    };

    // schliesse das Usermenu unabhängig davon wo der User hinklickt (außerhalb des Usermenus)
    const hideSubmenu = (e) => {
        if (!e.target.classList.contains('helper')) {
            closeSubmenu();
        }
    };

    // bestimme die Position des Submenus
    const showUserSubmenu = (e) => {
        const divSize = e.currentTarget.getBoundingClientRect();
        const divCenter = (divSize.left + divSize.right) / 2;
        const divBottom = divSize.bottom - 3;
        openSubmenu({ divCenter, divBottom });
    };

    // logge den User aus (UI)
    const logout = () => {
        signoutUser(AUTH_SIGNOUT);
        setUser(false);
        setSelectedConversation(false);
    };

    // speichere states unf functions in Variable
    const navValues = {
        navbar,
        location,
        container,
        toggleNavbar,
        openSubmenu,
        hideSubmenu,
        showUserSubmenu,
        logout
    };

    return (
        <NavbarContext.Provider value={navValues}>
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbarContext = () => useContext(NavbarContext);
