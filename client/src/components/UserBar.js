import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Submenu from '../components/Submenu';
import { useGlobalContext } from '../context/GlobalContext';

const UserBar = ({ showUserSubmenu, container, logout }) => {
    const { user, isSubmenuOpen, closeSubmenu, userName } = useGlobalContext();

    return (
        <>
            <button
                className='user-bar basic-flex helper'
                onClick={isSubmenuOpen ? closeSubmenu : showUserSubmenu}
            >
                <p style={{ marginBottom: '0' }} className='user-info helper'>
                    Hallo {user && userName}
                </p>
                <span className='user-icon basic-flex helper'>
                    <FaUserCircle className='helper' />
                </span>
            </button>
            <Submenu container={container} logout={logout} />
        </>
    );
};

export default UserBar;
