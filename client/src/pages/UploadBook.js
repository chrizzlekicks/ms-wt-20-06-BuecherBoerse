import React, { useState } from 'react';
import { FaCheckCircle, FaPoo, FaFlushed } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';
import { API_BOOKS } from '../config/config';
import Alert from '../components/Alert';
import ImageUploader from '../components/ImageUploader';
import InputField from '../components/InputField';
import TextAreaInput from '../components/TextAreaInput';
import ActionBtn from '../components/ActionBtn';
import Form from '../components/Form';
import Loading2 from '../components/Loading2';
import { motion } from 'framer-motion';
import Dropdown from '../components/Dropdown';
import { genres, languages, conditions, status } from '../utils/dropdown';

const UploadBook = () => {
    const { alert, loading, closeSubmenu } = useGlobalContext();
    const [newBook, setNewBook] = useState({
        name: '',
        author: '',
        category: genres[0].title,
        language: languages[0].title,
        condition: conditions[0].title,
        status: status[0].title,
        desc: ''
    });
    const [bookImage, setBookImage] = useState();
    const { setLoading, setAlert, userId, userName, jwt } = useGlobalContext();

    // POST Buch
    const bookUpload = async (api, token, formdata) => {
        try {
            setLoading(true);
            const res = await fetch(api, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formdata
            });
            if (res.ok) {
                await res.json();
                setLoading(false);
                setAlert({
                    display: true,
                    icon: <FaCheckCircle />,
                    msg: 'Das Buch wurde erfolgreich hinzugefügt'
                });
            } else {
                throw new Error('Hoppala, da ist was schief gegangen');
            }
        } catch (error) {
            console.log('Hochladen fehlgeschlagen', error);
            setLoading(false);
            setAlert({
                display: true,
                icon: <FaPoo />,
                msg: 'Das hat irgendwie nicht geklappt...'
            });
        } finally {
            setNewBook({
                name: '',
                author: '',
                category: genres[0].title,
                language: languages[0].title,
                condition: conditions[0].title,
                status: status[0].title,
                desc: ''
            });
            setBookImage();
        }
    };

    // Textfeldeingabe
    const textChange = (e) => {
        setNewBook({ ...newBook, [e.target.name]: e.target.value });
    };

    // Bilddatei hinzufügen
    const imageChange = (e) => {
        setBookImage(e.target.files[0]);
    };

    // Buch hochladen
    const uploadAll = (e) => {
        e.preventDefault();
        if (
            newBook.name &&
            newBook.author &&
            newBook.category &&
            newBook.language &&
            newBook.condition &&
            newBook.status
        ) {
            const bookData = new FormData();
            bookData.append('bookImage', bookImage);
            bookData.append('name', newBook.name);
            bookData.append('author', newBook.author);
            bookData.append('category', newBook.category);
            bookData.append('language', newBook.language);
            bookData.append('condition', newBook.condition);
            bookData.append('owner', userId);
            bookData.append('username', userName);
            bookData.append('status', newBook.status);
            bookData.append('description', newBook.desc);
            bookUpload(API_BOOKS, jwt, bookData);
        } else {
            setAlert({
                display: true,
                icon: <FaFlushed />,
                msg: 'Halt, da fehlen paar Felder!'
            });
        }
    };

    // resette die komplette Eingabe
    const resetInput = () => {
        setBookImage();
        setNewBook({
            name: '',
            author: '',
            category: genres[0].title,
            language: languages[0].title,
            condition: conditions[0].title,
            owner: userId,
            username: userName,
            status: status[0].title,
            desc: ''
        });
    };

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
                <h2 className='title'>Buch hochladen</h2>
                <Form className='book-form' onSubmit={uploadAll}>
                    <ImageUploader
                        bookImage={bookImage}
                        imageChange={imageChange}
                    />
                    <div className='info-upload'>
                        <InputField
                            type='text'
                            htmlFor='Name:'
                            name='name'
                            id='name'
                            placeholder='Name des Buches'
                            value={newBook.name}
                            onChange={textChange}
                        />
                        <InputField
                            type='text'
                            htmlFor='Autor*in:'
                            name='author'
                            id='author'
                            placeholder='Autor*in des Buches'
                            value={newBook.author}
                            onChange={textChange}
                        />
                        <Dropdown
                            htmlFor='Genre:'
                            name='category'
                            id='category'
                            options={genres}
                            value={newBook.category}
                            onChange={textChange}
                        />
                        <Dropdown
                            htmlFor='Sprache:'
                            name='language'
                            id='language'
                            options={languages}
                            value={newBook.language}
                            onChange={textChange}
                        />
                        <Dropdown
                            htmlFor='Zustand:'
                            name='condition'
                            id='condition'
                            options={conditions}
                            value={newBook.condition}
                            onChange={textChange}
                        />
                        <Dropdown
                            htmlFor='Status:'
                            name='status'
                            id='status'
                            options={status}
                            value={newBook.status}
                            onChange={textChange}
                        />
                        <TextAreaInput
                            htmlFor='Beschreibung:'
                            name='desc'
                            id='desc'
                            rows='4'
                            placeholder='Kurze Beschreibung des Buches'
                            value={newBook.desc}
                            onChange={textChange}
                        />
                        <div className='action-btn-container'>
                            <ActionBtn type='submit'>Hochladen</ActionBtn>
                            <ActionBtn type='reset' onClick={resetInput}>
                                Löschen
                            </ActionBtn>
                        </div>
                    </div>
                </Form>
                {alert.display && <Alert />}
            </motion.main>
        </>
    );
};

export default UploadBook;
