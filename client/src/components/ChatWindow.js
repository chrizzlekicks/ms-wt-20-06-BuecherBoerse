import React from 'react';
import FilterButton from './FilterButton';
import Form from './Form';
import OpenChat from './OpenChat';
import { FaPaperPlane } from 'react-icons/fa';
import { useMessagesContext } from '../context/MessageContext';

const ChatWindow = () => {
    const { sendMessage, newMessage, handleKeyPress, handleMessage } =
        useMessagesContext();
    return (
        <>
            <aside className='chat-window'>
                <OpenChat />
                <Form className='input-message' onSubmit={sendMessage}>
                    <textarea
                        className='enter-message'
                        name='message'
                        value={newMessage.message}
                        onChange={handleMessage}
                        onKeyPress={handleKeyPress}
                    />
                    <FilterButton type='submit' style={{ margin: '0' }}>
                        <FaPaperPlane
                            style={{ display: 'grid', placeItems: 'center' }}
                        />
                    </FilterButton>
                </Form>
            </aside>
        </>
    );
};

export default ChatWindow;
