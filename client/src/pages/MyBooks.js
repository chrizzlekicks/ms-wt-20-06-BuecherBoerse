import { useGlobalContext } from '../context/GlobalContext';
import { useMyBooksContext } from '../context/MyBooksContext';
import UserDashboard from '../components/UserDashboard';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import { motion } from 'framer-motion';
import Shelf from '../components/Shelf';

const MyBooks = () => {
    const { alert, closeSubmenu, loading } = useGlobalContext();
    const { myBooks } = useMyBooksContext();

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={closeSubmenu}
                >
                    <UserDashboard />
                    <Shelf>{myBooks}</Shelf>
                    {alert.display && <Alert />}
                </motion.main>
            )}
        </>
    );
};

export default MyBooks;
