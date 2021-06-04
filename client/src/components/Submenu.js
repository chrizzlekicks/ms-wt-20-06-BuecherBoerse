import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import { useAuth } from '../hooks/useAuth';

const Submenu = () => {
  const { setIsUserLoggedIn, AUTH_SIGNOUT, isSubmenuOpen, location } =
    useGlobalContext();
  const container = useRef(null);
  const { getLoggedOut } = useAuth();

  useEffect(() => {
    const submenu = container.current;
    const { divCenter, divBottom } = location;
    submenu.style.left = `${divCenter}px`;
    submenu.style.bottom = `${divBottom}px`;
  }, [location]);

  // logge den User aus
  const logout = () => {
    getLoggedOut(AUTH_SIGNOUT);
    setIsUserLoggedIn(false);
  };

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
