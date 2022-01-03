import React from 'react';
import ModalWrapper from './ModalWrapper';
import { motion } from 'framer-motion';
import InputField from './InputField';
import TextAreaInput from './TextAreaInput';
import ActionBtn from './ActionBtn';
import Dropdown from './Dropdown';
import { genres, languages, conditions, status } from '../utils/dropdown';

const EditBook = ({
    openBook,
    showEditBook,
    updateBook,
    textChange,
    closeEditWindow
}) => {
    return (
        <>
            <ModalWrapper showEditBook={showEditBook} onClick={closeEditWindow}>
                <motion.form
                    drag
                    className='book-update-form'
                    onSubmit={updateBook}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className='info-upload'>
                        <InputField
                            type='text'
                            htmlFor='Name:'
                            name='name'
                            id='name'
                            placeholder='Name des Buches'
                            value={openBook.name}
                            onChange={textChange}
                        />
                        <InputField
                            type='text'
                            htmlFor='Autor*in:'
                            name='author'
                            id='author'
                            placeholder='Autor*in des Buches'
                            value={openBook.author}
                            onChange={textChange}
                        />
                        <Dropdown
                            htmlFor='Genre:'
                            name='category'
                            id='category'
                            options={genres}
                            value={openBook.category}
                            onChange={textChange}
                        />
                        <Dropdown
                            htmlFor='Sprache:'
                            name='language'
                            id='language'
                            options={languages}
                            value={openBook.language}
                            onChange={textChange}
                        />
                        <Dropdown
                            htmlFor='Zustand:'
                            name='condition'
                            id='condition'
                            options={conditions}
                            value={openBook.condition}
                            onChange={textChange}
                        />
                        <Dropdown
                            htmlFor='Status:'
                            name='status'
                            id='status'
                            options={status}
                            value={openBook.status}
                            onChange={textChange}
                        />
                        <TextAreaInput
                            htmlFor='Beschreibung:'
                            name='description'
                            id='description'
                            rows='2'
                            placeholder='Kurze Beschreibung des Buches'
                            value={openBook.description}
                            onChange={textChange}
                        />
                        <div className='action-btn-container'>
                            <ActionBtn type='submit'>Jetzt speichern</ActionBtn>
                            <ActionBtn onClick={closeEditWindow}>
                                Abbrechen
                            </ActionBtn>
                        </div>
                    </div>
                </motion.form>
            </ModalWrapper>
        </>
    );
};

export default EditBook;
