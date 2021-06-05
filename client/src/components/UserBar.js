import { FaUserCircle } from 'react-icons/fa';
import Submenu from '../components/Submenu';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavbarContext } from '../context/NavbarContext';

const UserBar = () => {
  const { isUserLoggedIn, isSubmenuOpen, closeSubmenu, userName } =
    useGlobalContext();
  const { showUserSubmenu } = useNavbarContext();

  return (
    <>
      <button
        className='user-bar basic-flex helper'
        onClick={isSubmenuOpen ? closeSubmenu : showUserSubmenu}
      >
        <p style={{ marginBottom: '0' }} className='user-info helper'>
          Hallo {isUserLoggedIn && userName}
        </p>
        <span className='user-icon basic-flex helper'>
          <FaUserCircle className='helper' />
        </span>
      </button>
      <Submenu />
    </>
  );
};

export default UserBar;
