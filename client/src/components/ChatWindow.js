import React from 'react';
import FilterButton from './FilterButton';
import Form from './Form';
import OpenChat from './OpenChat';
import { FaPaperPlane } from 'react-icons/fa';

const ChatWindow = ({
    chat,
    sendMessage,
    newMessage,
    handleKeyPress,
    handleMessage,
    scrollToBottom
}) => {
    return (
        <>
            <aside className='chat-window'>
                <OpenChat chat={chat} scrollToBottom={scrollToBottom} />
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
