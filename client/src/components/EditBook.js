import { useOpenBookContext } from '../context/OpenBookContext';
import ModalWrapper from './ModalWrapper';
import Form from './Form';
import InputField from './InputField';
import TextAreaInput from './TextAreaInput';
import ActionBtn from './ActionBtn';

const EditBook = () => {
  const { openBook, showEditBook, updateBook, textChange, closeEditWindow } =
    useOpenBookContext();
  const { name, author, category, language, condition, description } = openBook;

  return (
    <>
      <ModalWrapper showEditBook={showEditBook}>
        <Form className='book-update-form' onSubmit={updateBook}>
          <div className='info-upload'>
            <InputField
              type='text'
              htmlFor='Name:'
              name='name'
              id='name'
              placeholder='Name des Buches'
              value={name}
              onChange={textChange}
            />
            <InputField
              type='text'
              htmlFor='Autor*in:'
              name='author'
              id='author'
              placeholder='Autor*in des Buches'
              value={author}
              onChange={textChange}
            />
            <InputField
              type='text'
              htmlFor='Genre:'
              name='category'
              id='category'
              placeholder='Genre des Buches'
              value={category}
              onChange={textChange}
            />
            <InputField
              type='text'
              htmlFor='Sprache:'
              name='language'
              id='language'
              placeholder='Sprache des Buches'
              value={language}
              onChange={textChange}
            />
            <InputField
              type='text'
              htmlFor='Zustand:'
              name='condition'
              id='condition'
              placeholder='Zustand des Buches'
              value={condition}
              onChange={textChange}
            />
            <TextAreaInput
              htmlFor='Beschreibung:'
              name='desc'
              id='desc'
              rows='2'
              placeholder='Kurze Beschreibung des Buches'
              value={description}
              onChange={textChange}
            />
            <div className='action-btn-container'>
              <ActionBtn type='submit'>Jetzt speichern</ActionBtn>
              <ActionBtn onClick={closeEditWindow}>Abbrechen</ActionBtn>
            </div>
          </div>
        </Form>
      </ModalWrapper>
    </>
  );
};

export default EditBook;
