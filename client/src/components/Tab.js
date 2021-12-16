import React from 'react';
import { useAuthContext } from '../context/AuthContext';

const Tab = () => {
    const { isTabLeft, setIsTabLeft } = useAuthContext();
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
