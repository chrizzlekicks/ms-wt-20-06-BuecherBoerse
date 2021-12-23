import React from 'react';
import Conversation from './Conversation';

const Conversations = ({ conversations, openConversation }) => {
    return (
        <>
            <aside className='conversations'>
                {conversations.map((conversation) => {
                    return (
                        <Conversation
                            key={conversation._id}
                            {...conversation}
                            openConversation={openConversation}
                        />
                    );
                })}
            </aside>
        </>
    );
};

export default Conversations;
