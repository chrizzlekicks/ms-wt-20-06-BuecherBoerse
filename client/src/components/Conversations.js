import React from 'react';
import Conversation from './Conversation';
import { useMessagesContext } from '../context/MessageContext';

const Conversations = () => {
    const { conversations } = useMessagesContext();
    return (
        <>
            <aside className='conversations'>
                {conversations.map((conversation) => {
                    return (
                        <Conversation
                            key={conversation._id}
                            {...conversation}
                        />
                    );
                })}
            </aside>
        </>
    );
};

export default Conversations;
