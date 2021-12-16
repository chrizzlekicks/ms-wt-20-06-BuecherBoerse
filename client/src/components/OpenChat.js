import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import Message from './Message';

const OpenChat = ({ chat, scrollToBottom }) => {
    const { selectedConversation } = useGlobalContext();
    const { recipients, messages } = chat;

    if (!selectedConversation) {
        return null;
    }
    return (
        <>
            <section className='chat'>
                {messages &&
                    messages.map((message) => {
                        return (
                            <Message
                                key={message._id}
                                recipients={recipients}
                                {...message}
                            />
                        );
                    })}
                <div ref={scrollToBottom}></div>
            </section>
        </>
    );
};

export default OpenChat;
