import Alert from '../components/Alert';
import ImageUploader from '../components/ImageUploader';
import InputField from '../components/InputField';
import { useGlobalContext } from '../context/GlobalContext';
import TextAreaInput from '../components/TextAreaInput';
import ActionBtn from '../components/ActionBtn';
import Form from '../components/Form';
import Loading from '../components/Loading';
import { motion } from 'framer-motion';
import { useUploadBookContext } from '../context/UploadBookContext';
import Dropdown from '../components/Dropdown';
import { genres, languages, conditions, status } from '../utils/dropdown';

const UploadBook = () => {
    const { alert, loading, closeSubmenu } = useGlobalContext();
    const { newBook, textChange, uploadAll, resetInput } =
        useUploadBookContext();

    return (
        <>
            {loading && <Loading />}
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={closeSubmenu}
            >
                <h2 className='title'>Buch hochladen</h2>
                <Form className='book-form' onSubmit={uploadAll}>
                    <ImageUploader />
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
