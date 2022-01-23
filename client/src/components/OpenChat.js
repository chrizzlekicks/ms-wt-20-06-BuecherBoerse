import React from 'react';
import { useLayoutContext } from '../context/LayoutContext';
import { useMessagesContext } from '../context/MessageContext';
import Message from './Message';

const OpenChat = () => {
    const { selectedConversation } = useLayoutContext();
    const { chat, scrollToBottom } = useMessagesContext();
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
