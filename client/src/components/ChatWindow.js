import FilterButton from './FilterButton';
import Form from './Form';
import OpenChat from './OpenChat';
import { useMessageContext } from '../context/MessageContext';

const ChatWindow = () => {
  const { sendMessage, newMessage, handleKeyPress, handleMessage } =
    useMessageContext();

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
            Abschicken
          </FilterButton>
        </Form>
      </aside>
    </>
  );
};

export default ChatWindow;
