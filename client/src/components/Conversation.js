import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';
import { useDateFormatter } from '../hooks/useDateFormatter';

const Conversation = ({
    _id,
    recipients,
    messages,
    updatedAt,
    openConversation
}) => {
    const { userName } = useGlobalContext();
    const formattedDate = useDateFormatter(updatedAt);

    return (
        <>
            <button
                id={_id}
                className='conversation basic-flex'
                onClick={openConversation}
            >
                <span className='user-icon basic-flex'>
                    <FaUserCircle />
                </span>
                <aside className='glimpse-message'>
                    <header className='message-header'>
                        <h4>
                            {userName === recipients[0].name
                                ? recipients[1].name
                                : recipients[0].name}
                        </h4>
                        <h5>{formattedDate}</h5>
                    </header>
                    <p>{`${
                        messages[messages.length - 1].sender ===
                        recipients[0]._id
                            ? recipients[0].name
                            : recipients[1].name
                    }: ${messages[messages.length - 1].message}`}</p>
                </aside>
            </button>
        </>
    );
};

export default Conversation;
