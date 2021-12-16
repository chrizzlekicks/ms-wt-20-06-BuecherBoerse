import React from 'react';
import { useLayoutContext } from '../context/LayoutContext';
import Message from './Message';

const OpenChat = ({ chat, scrollToBottom }) => {
    const { selectedConversation } = useLayoutContext();
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
