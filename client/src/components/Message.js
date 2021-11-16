import { FaUserCircle } from 'react-icons/fa';
import { useDateFormatter } from '../hooks/useDateFormatter';

const Message = ({ recipients, message, sender, createdAt }) => {
    const formattedDate = useDateFormatter(createdAt);
    return (
        <>
            <article className='message basic-flex'>
                <span className='user-icon basic-flex'>
                    <FaUserCircle />
                </span>
                <aside className='glimpse-message'>
                    <header className='message-header'>
                        <h4 className='title'>
                            {sender === recipients[0]._id
                                ? recipients[0].name
                                : recipients[1].name}
                        </h4>
                        <p>{formattedDate}</p>
                    </header>
                    <p className='message-body'>{message}</p>
                </aside>
            </article>
        </>
    );
};

export default Message;
