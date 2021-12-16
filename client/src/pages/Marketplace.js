import React, { useState, useEffect, useCallback } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import Filter from '../components/Filter';
import Shelf from '../components/Shelf';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import Alert from '../components/Alert';
import { motion } from 'framer-motion';
import { API_BOOKS } from '../config/config';

const Marketplace = () => {
    const { alert, loading, closeSubmenu } = useGlobalContext();

    const [allBooks, setAllBooks] = useState([]);
    const [books, setBooks] = useState(allBooks);
    const [search, setSearch] = useState('');
    const { setLoading } = useGlobalContext();

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
    }, [fetchBooks]);

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
        'alle bücher',
        ...new Set(allBooks.map((book) => book.category))
    ];

    // ziehe Status der Bücher
    const status = [...new Set(allBooks.map((book) => book.status))];

    // ziehe Sprache der Bücher
    const lenguajes = [...new Set(allBooks.map((book) => book.language))];

    // verarbeite den Input des Suchfeldes
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // filtert Bücher anhand der Kategorien
    const filterByCategory = (category) => {
        if (category === 'alle bücher') {
            return setBooks(allBooks);
        }
        let filteredBooks = allBooks.filter(
            (book) => book.category === category
        );
        setBooks(filteredBooks);
    };

    const filterByStatus = (status) => {
        let filteredBooks = allBooks.filter((book) => book.status === status);
        setBooks(filteredBooks);
    };

    const filterByLanguage = (language) => {
        let filteredBooks = allBooks.filter(
            (book) => book.language === language
        );
        setBooks(filteredBooks);
    };

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
                    <SearchBar search={search} handleSearch={handleSearch} />
                    <Filter elements={categories} onClick={filterByCategory} />
                    <Filter elements={lenguajes} onClick={filterByLanguage} />
                    <Filter elements={status} onClick={filterByStatus} />
                    <Shelf element={books} />
                    {alert.display && <Alert />}
                </motion.main>
            )}
        </>
    );
};

export default Marketplace;
