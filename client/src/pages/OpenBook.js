import React, { useState, useCallback, useEffect } from 'react';
import Loading from '../components/Loading';
import UserAction from '../components/UserAction';
import Alert from '../components/Alert';
import ReturnTo from '../components/ReturnTo';
import MessageModal from '../components/MessageModal';
import Loading2 from '../components/Loading2';
import { motion } from 'framer-motion';
import EditBook from '../components/EditBook';
import { useParams, useNavigate } from 'react-router-dom';
import { useLayoutContext } from '../context/LayoutContext';
import { FaCheckCircle, FaPoo } from 'react-icons/fa';
import { API_BOOKS, API_MESSAGES } from '../config/config';
import { useAuthContext } from '../context/AuthContext';

const OpenBook = () => {
    const { alert, setAlert, closeSubmenu, loading, setLoading } =
        useLayoutContext();

    const [openBook, setOpenBook] = useState({});
    const [showEditBook, setShowEditBook] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [newConv, setNewConv] = useState({
        sender: '',
        reciever: '',
        message: ''
    });
    const history = useNavigate();
    const { id } = useParams();
    const { userId, jwt } = useAuthContext();
    const { image, name, author, category, language, description } = openBook;

    // GET Buchinfo vom Backend
    const fetchSingleBook = useCallback(
        async (api, id, token) => {
            setLoading(true);
            try {
                const res = await fetch(`${api}${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const singleBook = await res.json();
                    setOpenBook(singleBook);
                } else {
                    throw new Error('Es fehlt jegliche Buchinfo...');
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
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                await res.json();
                setLoading(false);
                history(
                    -1,
                    setAlert({
                        display: true,
                        icon: <FaCheckCircle />,
                        msg: 'Das Buch wurde erfolgreich gelöscht'
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
                msg: 'Das Buch konnte nicht gelöscht werden...'
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
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                await res.json();
                setShowEditBook(false);
                setAlert({
                    display: true,
                    icon: <FaCheckCircle />,
                    msg: 'Du hast die Buchinfo erfolgreich geändert!'
                });
            } else {
                throw new Error('Hoppla, da ist wohl was schief gegangen');
            }
        } catch (error) {
            console.log('Update fehlgeschlagen', error);
            setAlert({
                display: true,
                icon: <FaPoo />,
                msg: 'Die Buchinfo konnte irgendwie nicht gespeichert werden...'
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
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(message)
            });
            if (res.ok) {
                const newConv = await res.json();
                console.log(newConv);
                setAlert({
                    display: true,
                    icon: <FaCheckCircle />,
                    msg: 'Nachricht wurde erfolgreich verschickt'
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
                message: ''
            });
        }
    };

    // öffne Buch
    useEffect(() => {
        fetchSingleBook(API_BOOKS, id, jwt);
    }, [fetchSingleBook, id, jwt]);

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

    // kontaktiere Besitzer des Buchs
    const messageUser = () => {
        setShowMessageModal(true);
    };

    // Input des Nachrichtenfensters
    const msgModalInput = (e) => {
        setNewConv({
            sender: userId,
            reciever: openBook.owner,
            message: e.target.value
        });
    };

    // schicke die fertige erste Anfrage ab
    const submitConv = (e) => {
        e.preventDefault();
        startNewConversation(API_MESSAGES, jwt, newConv);
    };

    // schließe Nachrichtenfenster
    const closeMessageModal = () => {
        setShowMessageModal(false);
    };

    if (loading) {
        return (
            <>
                <Loading />
            </>
        );
    }
    return (
        <>
            {showMessageModal && (
                <MessageModal
                    closeMessageModal={closeMessageModal}
                    msgModalInput={msgModalInput}
                    submitConv={submitConv}
                />
            )}
            {showEditBook && (
                <EditBook
                    openBook={openBook}
                    textChange={textChange}
                    updateBook={updateBook}
                    closeEditWindow={closeEditWindow}
                />
            )}
            {loading && <Loading2 />}
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={closeSubmenu}
            >
                <ReturnTo />
                <article className='open-book'>
                    <img src={image} alt={name} />
                    <section className='open-book-info'>
                        <div>
                            <h2 className='title'>{name}</h2>
                            <h4 className='title'>{author}</h4>
                        </div>
                        <hr className='separation-line' />
                        <div>
                            <h4>Genre</h4>
                            <p>{category}</p>
                        </div>
                        <div>
                            <h4>Sprache</h4>
                            <p>{language}</p>
                        </div>
                        <div>
                            <h4>Beschreibung</h4>
                            <p>{description}</p>
                        </div>
                    </section>
                    <UserAction
                        openBook={openBook}
                        removeBook={removeBook}
                        openEditWindow={openEditWindow}
                        messageUser={messageUser}
                    />
                </article>
                {alert.display && <Alert />}
            </motion.main>
        </>
    );
};

export default OpenBook;
