import { useGlobalContext } from '../context/GlobalContext';
import { useOpenBookContext } from '../context/OpenBookContext';
import ActionButton from './ActionBtn';

const UserAction = () => {
  const { userId } = useGlobalContext();
  const { openBook, removeBook, openEditWindow, messageUser } =
    useOpenBookContext();
  const { username, condition, owner } = openBook;

  return (
    <>
      <aside className='user-action'>
        <section className='action-section'>
          <p>Dieses Buch gehört:</p>
          <h3>{username}</h3>
        </section>
        <hr className='separation-line' />
        <section className='action-section'>
          <p>Zustand des Buches ist:</p>
          <h3>{condition}</h3>
        </section>
        <hr className='separation-line' />
        <section className='action-section'>
          <p>Was möchtest du tun?</p>
          {owner === userId ? (
            <>
              <ActionButton onClick={openEditWindow}>
                Jetzt bearbeiten
              </ActionButton>
              <ActionButton onClick={removeBook}>Jetzt löschen</ActionButton>
            </>
          ) : (
            <ActionButton onClick={messageUser}>Jetzt ausleihen</ActionButton>
          )}
        </section>
      </aside>
    </>
  );
};

export default UserAction;
