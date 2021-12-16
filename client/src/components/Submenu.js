import React from 'react';
import { Link } from 'react-router-dom';
import { useLayoutContext } from '../context/LayoutContext';

const Submenu = ({ container, logout }) => {
    const { isSubmenuOpen } = useLayoutContext();

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
