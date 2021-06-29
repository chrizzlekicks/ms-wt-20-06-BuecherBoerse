import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useGlobalContext } from './GlobalContext';

const MarketplaceContext = createContext();

export const MarketplaceProvider = ({ children }) => {
  const [allBooks, setAllBooks] = useState([]);
  const [books, setBooks] = useState(allBooks);
  const [search, setSearch] = useState('');
  const { setLoading, API_BOOKS } = useGlobalContext();

  // GET Bücher vom Backend
  const fetchBooks = useCallback(
    async (api) => {
      try {
        setLoading(true);
        const res = await fetch(api);
        if (res.ok) {
          let data = await res.json();
          const bookList = data.reverse();
          setAllBooks(bookList);
          setBooks(bookList);
        } else {
          throw new Error('Hoppala, da ist was schief gelaufen');
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  // hole alle Bücher
  useEffect(() => {
    fetchBooks(API_BOOKS);
  }, [fetchBooks, API_BOOKS]);

  // filter Bücher nach Suche
  useEffect(() => {
    let searchedBooks = allBooks.filter(
      (book) =>
        book.name.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );
    setBooks(searchedBooks);
  }, [search, allBooks, setBooks]);

  // ziehe Kategorien der Bücher
  const categories = [
    'alle',
    ...new Set(allBooks.map((book) => book.category)),
  ];

  // verarbeite den Input des Suchfeldes
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // filtert Bücher anhand der Kategorien
  const filterBooks = (category) => {
    if (category === 'alle') {
      return setBooks(allBooks);
    }
    let filteredBooks = allBooks.filter((book) => book.category === category);
    setBooks(filteredBooks);
  };

  // sammle alle states und functions und gebe sie an children weiter
  const marketValues = {
    allBooks,
    books,
    categories,
    handleSearch,
    filterBooks,
  };

  return (
    <MarketplaceContext.Provider value={marketValues}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplaceContext = () => {
  return useContext(MarketplaceContext);
};
