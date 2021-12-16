import React from 'react';
import { useLayoutContext } from '../context/LayoutContext';

const Tab = () => {
    const { isTabLeft, setIsTabLeft } = useLayoutContext();
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
