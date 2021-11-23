import { useGlobalContext } from '../context/GlobalContext';
import { useMarketplaceContext } from '../context/MarketplaceContext';
import Filter from '../components/Filter';
import Shelf from '../components/Shelf';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import { motion } from 'framer-motion';

const Marketplace = () => {
    const { alert, loading, closeSubmenu } = useGlobalContext();
    const {
        books,
        categories,
        lenguajes,
        status,
        filterByCategory,
        filterByLanguage,
        filterByStatus
    } = useMarketplaceContext();

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
                    <SearchBar />
                    <Filter elements={categories} onClick={filterByCategory} />
                    <Filter elements={lenguajes} onClick={filterByLanguage} />
                    <Filter elements={status} onClick={filterByStatus} />
                    <Shelf>{books}</Shelf>
                    {alert.display && <Alert />}
                </motion.main>
            )}
        </>
    );
};

export default Marketplace;
