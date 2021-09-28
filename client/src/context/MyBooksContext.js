import {
    createContext,
    useState,
    useCallback,
    useEffect,
    useContext
} from 'react';
import { useGlobalContext } from './GlobalContext';

const MyBooksContext = createContext();

export const MyBooksProvider = ({ children }) => {
    const [myBooks, setMyBooks] = useState([]);
    const { setLoading, API_BOOKSBYUSER, userId, jwt } = useGlobalContext();

    // GET Bücher des Users
    const fetchMyBooks = useCallback(
        async (api, id, token) => {
            setLoading(true);
            try {
                const res = await fetch(`${api}${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'content-type': 'application/json'
                    }
                });
                if (res.ok) {
                    const myBookList = await res.json();
                    setMyBooks(myBookList);
                } else {
                    throw new Error(`could not get books of user ${id}`);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        },
        [setLoading]
    );

    // hole Bücher des Users
    useEffect(() => {
        fetchMyBooks(API_BOOKSBYUSER, userId, jwt);
    }, [fetchMyBooks, API_BOOKSBYUSER, userId, jwt]);

    // sammle alle states und functions und gebe sie an children weiter
    const myValues = {
        myBooks
    };

    return (
        <MyBooksContext.Provider value={myValues}>
            {children}
        </MyBooksContext.Provider>
    );
};

export const useMyBooksContext = () => {
    return useContext(MyBooksContext);
};
