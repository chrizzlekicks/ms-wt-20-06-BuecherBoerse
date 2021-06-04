import { FaUserCircle } from 'react-icons/fa';
import Submenu from '../components/Submenu';
import { useGlobalContext } from '../context/GlobalContext';

const UserBar = () => {
  const { isUserLoggedIn, openSubmenu, isSubmenuOpen, closeSubmenu, userName } =
    useGlobalContext();

  const showUserSubmenu = (e) => {
    const divSize = e.currentTarget.getBoundingClientRect();
    const divCenter = (divSize.left + divSize.right) / 2;
    const divBottom = divSize.bottom - 3;
    openSubmenu({ divCenter, divBottom });
  };

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
