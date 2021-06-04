import Conversations from '../components/Conversations';
import ChatWindow from '../components/ChatWindow';
import { useGlobalContext } from '../context/GlobalContext';
import Loading2 from '../components/Loading2';
import { motion } from 'framer-motion';
import EmptyShelf from '../components/EmptyShelf';
import { useMessageContext } from '../context/MessageContext';

const Messages = () => {
  const { closeSubmenu, loading } = useGlobalContext();
  const { conversations } = useMessageContext();

  return (
    <>
      {loading && <Loading2 />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={closeSubmenu}
      >
        {conversations.length < 1 ? (
          <EmptyShelf>
            Aktuell hast du noch keine Nachrichten verfasst. Schreibe einem
            User, indem du ein Buch auswählst und auf "Jetzt ausleihen" klickst.
          </EmptyShelf>
        ) : (
          <section className='message-container'>
            <Conversations />
            <ChatWindow />
          </section>
        )}
      </motion.main>
    </>
  );
};

export default Messages;
