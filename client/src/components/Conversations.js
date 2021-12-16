import React from 'react';
import Conversation from './Conversation';

const Conversations = ({ conversations }) => {
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
