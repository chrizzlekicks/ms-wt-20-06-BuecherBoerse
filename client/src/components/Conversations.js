import { useMessageContext } from '../context/MessageContext';
import Conversation from './Conversation';

const Conversations = () => {
  const { conversations } = useMessageContext();

  return (
    <>
      <aside className='conversations'>
        {conversations.map((conversation) => {
          return <Conversation key={conversation._id} {...conversation} />;
        })}
      </aside>
    </>
  );
};

export default Conversations;
