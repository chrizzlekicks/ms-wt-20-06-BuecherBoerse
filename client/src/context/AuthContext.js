import React, { createContext, useContext, useState } from 'react';
import { useLayoutContext } from '../context/LayoutContext';
import { FaCheckCircle, FaPoop } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUrlParams } from '../helpers/getUrlParams';
import {
    AUTH_SIGNIN,
    AUTH_SIGNOUT,
    API_REQUESTRESET,
    API_RESETPASSWORD,
    API_USERS
} from '../config/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const userName = sessionStorage.getItem('name');
    const userId = sessionStorage.getItem('id');
    const jwt = sessionStorage.getItem('token');
    const [user, setUser] = useState(jwt ? true : false);
    const [userCredential, setUserCredential] = useState({
        name: '',
        email: '',
        password: ''
    });
    const {
        setAlert,
        setLoading,
        isTabLeft,
        setIsTabLeft,
        setShowLinks,
        setSelectedConversation
    } = useLayoutContext();
    const forwardPage = useNavigate();
    const { state, search } = useLocation();
    let query = getUrlParams(search);

    // POST registriere neuen User im Backend / logge User ein (Backend)
    const signInUser = async (url, tryLogin) => {
        try {
            setLoading(true);
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(userCredential)
            });
            if (res.ok) {
                const userData = await res.json();
                setLoading(false);
                if (tryLogin) {
                    sessionStorage.setItem('id', userData.user._id);
                    sessionStorage.setItem('name', userData.user.name);
                    sessionStorage.setItem('token', userData.token);
                    forwardPage(state ? state.from : '/', setUser(true));
                } else {
                    setAlert({
                        display: true,
                        icon: <FaCheckCircle />,
                        msg: 'Du bist registriert! Logge dich nun ein!'
                    });
                    setUserCredential({ name: '', email: '', password: '' });
                    setIsTabLeft(true);
                }
            } else {
                throw new Error('Username oder Passwort stimmen nicht');
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            setAlert({
                display: true,
                icon: <FaPoop />,
                msg: 'Username oder Passwort stimmen nicht'
            });
            setUserCredential({ name: '', email: '', password: '' });
        }
    };

    const requestPasswordReset = async (api) => {
        try {
            setLoading(true);
            const res = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email: userCredential.email })
            });
            if (res.ok) {
                const sentEmail = await res.json();
                console.log(sentEmail);
                setLoading(false);
                setAlert({
                    display: true,
                    icon: <FaCheckCircle />,
                    msg: 'Der erste Schritt war erfolgreich! Halte Ausschau in deinen Emails nach Post von uns'
                });
                setUserCredential({ email: '' });
            } else {
                throw new Error(
                    'Datenbankabgleich funktioniert nicht, versuche es später erneut'
                );
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            setAlert({
                display: true,
                icon: <FaPoop />,
                msg: 'Der Request hat leider nicht funktioniert. Versuche es später noch mal'
            });
            setUserCredential({ email: '' });
        }
    };

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

    const resetPassword = async (api) => {
        try {
            setLoading(true);
            const res = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    userId: query.get('id'),
                    token: query.get('token'),
                    password: userCredential.password
                })
            });
            if (res.ok) {
                await res.json();
                setLoading(false);
                setAlert({
                    display: true,
                    icon: <FaCheckCircle />,
                    msg: 'Dein neues Passwort wurde erfolgreich eingerichtet. Logge dich nun damit ein.'
                });
                forwardPage(
                    '/',
                    setUserCredential({ email: '', password: '' })
                );
            } else {
                throw new Error(
                    'Das neue Passwort konnte nicht gespeichert werden'
                );
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            setAlert({
                display: true,
                icon: <FaPoop />,
                msg: 'Irgendwie konnte das neue Passwort nicht gespeichert werden'
            });
            setUserCredential({ password: '' });
        }
    };

    // verarbeite die Eingabe des Users
    const checkSigninInput = (e) => {
        setUserCredential({
            ...userCredential,
            [e.target.name]: e.target.value
        });
    };

    // logge den User ein (UI)
    const loginNow = (e) => {
        e.preventDefault();
        signInUser(AUTH_SIGNIN, isTabLeft);
    };

    // registriere den User
    const signupNow = (e) => {
        e.preventDefault();
        signInUser(API_USERS);
    };

    // logge den User aus (UI)
    const logout = () => {
        signoutUser(AUTH_SIGNOUT);
        setUser(false);
        setUserCredential({ name: '', email: '', password: '' });
        setSelectedConversation(false);
    };

    // schicke den Password Request mit useremail ab
    const requestReset = (e) => {
        e.preventDefault();
        requestPasswordReset(API_REQUESTRESET);
    };

    const reset = (e) => {
        e.preventDefault();
        resetPassword(API_RESETPASSWORD);
    };

    // speichere states und functions in Variable
    const authValues = {
        userName,
        userId,
        jwt,
        user,
        userCredential,
        checkSigninInput,
        loginNow,
        signupNow,
        logout,
        requestReset,
        reset
    };

    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
