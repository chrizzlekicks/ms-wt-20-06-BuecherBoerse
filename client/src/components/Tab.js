import { useGlobalContext } from '../context/GlobalContext';

const Tab = () => {
  const { isTabLeft, setIsTabLeft } = useGlobalContext();
  return (
    <>
      <div className='tab-container'>
        <button
          className={`tab-btn ${!isTabLeft && 'not-active'}`}
          onClick={() => {
            setIsTabLeft(true);
          }}
        >
          Login
        </button>
        <button
          className={`tab-btn ${isTabLeft && 'not-active'}`}
          onClick={() => {
            setIsTabLeft(false);
          }}
        >
          Registrieren
        </button>
      </div>
    </>
  );
};

export default Tab;
