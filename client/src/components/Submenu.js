import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

const Submenu = ({ container, logout }) => {
    const { isSubmenuOpen } = useGlobalContext();

    return (
        <>
            <ul
                className={`${
                    isSubmenuOpen ? 'user-submenu show' : 'user-submenu'
                }`}
                ref={container}
            >
                <li className='menu-link'>
                    <Link to='/' onClick={logout}>
                        Logout
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default Submenu;
