import { useGlobalContext } from '../context/GlobalContext';
import { useMarketplaceContext } from '../context/MarketplaceContext';
import GenreFilter from '../components/GenreFilter';
import Shelf from '../components/Shelf';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import { motion } from 'framer-motion';

const Marketplace = () => {
  const { alert, loading, closeSubmenu } = useGlobalContext();
  const { books } = useMarketplaceContext();

  return (
    <>
      {loading ? (
        <main>
          <Loading />
        </main>
      ) : (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeSubmenu}
        >
          <SearchBar />
          <GenreFilter />
          <Shelf books={books}>{books}</Shelf>
          {alert.display && <Alert />}
        </motion.main>
      )}
    </>
  );
};

export default Marketplace;
