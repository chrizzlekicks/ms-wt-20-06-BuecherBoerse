import * as React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useLayoutContext } from '../context/LayoutContext';
import { API_MESSAGES, API_MESSAGESUSER } from '../config/config';
import { FaFlushed } from 'react-icons/fa';

const MessageContext = React.createContext();

export const MessageProvider = ({ children }) => {
    const [conversations, setConversations] = React.useState([]);
    const [chat, setChat] = React.useState([]);
    const [newMessage, setNewMessage] = React.useState({
        sender: '',
        reciever: '',
        message: ''
    });
    const scrollToBottom = React.useRef();
    const {
        isMessageSent,
        setIsMessageSent,
        selectedConversation,
        setSelectedConversation,
        setLoading,
        setAlert
    } = useLayoutContext();
    const { userId, jwt } = useAuthContext();

    // GET Konversationen vom Backend
    const fetchUserConversations = React.useCallback(
        async (api_messages_user, user_id, token) => {
            try {
                setLoading(true);
                const res = await fetch(`${api_messages_user}${user_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    let data = await res.json();
                    const convList = data.reverse();
                    console.log(convList);
                    setConversations(convList);
                } else {
                    throw new Error('conversations could not be fetched');
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        },
        [setConversations, setLoading]
    );

    // GET alle Nachrichten einer Konversation
    const fetchMessages = React.useCallback(
        async (api_messages, conv_id, token, user_id) => {
            if (selectedConversation) {
                try {
                    setLoading(true);
                    const res = await fetch(`${api_messages}${conv_id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (res.ok) {
                        const singleConv = await res.json();
                        console.log(singleConv);
                        setChat(singleConv);
                        setNewMessage({
                            sender: user_id,
                            reciever:
                                user_id === singleConv.recipients[0]._id
                                    ? singleConv.recipients[1]._id
                                    : singleConv.recipients[0]._id,
                            message: ''
                        });
                        scrollToBottom.current.scrollIntoView({
                            block: 'end',
                            behavior: 'smooth'
                        });
                    } else {
                        throw new Error(
                            'could not get the conversation you are looking for'
                        );
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                    setIsMessageSent(false);
                }
            }
            return null;
        },
        [selectedConversation, setLoading, setIsMessageSent]
    );

    // POST Nachricht in bestehende Konversation
    const postMessage = async (api_messages, conv_id, token, message) => {
        try {
            setLoading(true);
            const res = await fetch(`${api_messages}${conv_id}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(message)
            });
            if (res.ok) {
                const sentMessage = await res.json();
                console.log(sentMessage);
            } else {
                throw new Error('Nachricht konnte nicht verschickt werden');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setNewMessage({
                sender: '',
                reciever: '',
                message: ''
            });
        }
    };

    // ziehe alle Konversationen eines Users
    React.useEffect(() => {
        fetchUserConversations(API_MESSAGESUSER, userId, jwt);
    }, [fetchUserConversations, isMessageSent, setIsMessageSent, userId, jwt]);

    // update die Nachrichten
    React.useEffect(() => {
        fetchMessages(
            API_MESSAGES,
            sessionStorage.getItem('convId'),
            jwt,
            userId
        );
    }, [isMessageSent, fetchMessages, jwt, userId]);

    // rufe eine Konversation und die dazugehörigen Nachrichten auf
    const openConversation = (e) => {
        setSelectedConversation(true);
        sessionStorage.setItem('convId', e.currentTarget.id);
        fetchMessages(API_MESSAGES, e.currentTarget.id, jwt, userId);
    };

    // Nachrichteneingabe
    const handleMessage = (e) => {
        setNewMessage({ ...newMessage, [e.target.name]: e.target.value });
    };

    // schicke die Nachricht ab
    const sendMessage = (e) => {
        if (!selectedConversation) {
            setAlert({
                display: true,
                icon: <FaFlushed />,
                msg: 'Du hast keine Konversation ausgewählt!'
            });
            return null;
        }
        e.preventDefault();
        postMessage(API_MESSAGES, chat._id, jwt, newMessage);
        setIsMessageSent(true);
    };

    // schicke die Nachricht per Enter ab
    const handleKeyPress = (e) => {
        if (e.charCode === 13) {
            sendMessage(e);
        }
    };

    const messageProps = {
        conversations,
        openConversation,
        chat,
        newMessage,
        handleKeyPress,
        handleMessage,
        scrollToBottom
    };

    return (
        <MessageContext.Provider value={messageProps}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessagesContext = () => React.useContext(MessageContext);
