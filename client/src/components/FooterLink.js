import React from 'react';
import { Link } from 'react-router-dom';

const MenuLink = ({ id, url, text }) => {
    return (
        <>
            <li key={id} className='footer-link'>
                <Link to={url}>{text}</Link>
            </li>
        </>
    );
};

export default MenuLink;
