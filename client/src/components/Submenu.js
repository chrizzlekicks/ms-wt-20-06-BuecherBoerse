import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavbarContext } from '../context/NavbarContext';

const Submenu = () => {
  const { isSubmenuOpen } = useGlobalContext();
  const { container, logout } = useNavbarContext();

  return (
    <>
      <ul
        className={`${isSubmenuOpen ? 'user-submenu show' : 'user-submenu'}`}
        ref={container}
      >
        <li className='links'>
          <Link to='/' onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Submenu;
