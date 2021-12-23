import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLayoutContext } from '../context/LayoutContext';

const MenuLink = ({ id, url, text }) => {
    const { hideLinks } = useLayoutContext();
    return (
        <>
            <li key={id} onClick={hideLinks} className='menu-link'>
                <NavLink to={url}>{text}</NavLink>
            </li>
        </>
    );
};

export default MenuLink;
