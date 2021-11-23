import { useGlobalContext } from '../context/GlobalContext';
import Loading from '../components/Loading';
import UserAction from '../components/UserAction';
import Alert from '../components/Alert';
import ReturnTo from '../components/ReturnTo';
import MessageModal from '../components/MessageModal';
import Loading2 from '../components/Loading2';
import { motion } from 'framer-motion';
import EditBook from '../components/EditBook';
import { useOpenBookContext } from '../context/OpenBookContext';

const OpenBook = () => {
    const { alert, closeSubmenu, loading } = useGlobalContext();
    const { openBook, showMessageModal, showEditBook } = useOpenBookContext();
    const { image, name, author, category, language, description } = openBook;

    if (loading) {
        return (
            <>
                <Loading />
            </>
        );
    }
    return (
        <>
            {showMessageModal && <MessageModal />}
            {showEditBook && <EditBook />}
            {loading && <Loading2 />}
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={closeSubmenu}
            >
                <ReturnTo />
                <article className='open-book'>
                    <img src={image} alt={name} />
                    <section className='open-book-info'>
                        <div>
                            <h2 className='title'>{name}</h2>
                            <h4 className='title'>{author}</h4>
                        </div>
                        <hr className='separation-line' />
                        <div>
                            <h4>Genre</h4>
                            <p>{category}</p>
                        </div>
                        <div>
                            <h4>Sprache</h4>
                            <p>{language}</p>
                        </div>
                        <div>
                            <h4>Beschreibung</h4>
                            <p>{description}</p>
                        </div>
                    </section>
                    <UserAction />
                </article>
                {alert.display && <Alert />}
            </motion.main>
        </>
    );
};

export default OpenBook;
