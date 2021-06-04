import Message from './Message';
import { useMessageContext } from '../context/MessageContext';

const OpenChat = () => {
  const { chat, selectedConversation, scrollToBottom } = useMessageContext();
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
              <Message key={message._id} recipients={recipients} {...message} />
            );
          })}
        <div ref={scrollToBottom}></div>
      </section>
    </>
  );
};

export default OpenChat;
