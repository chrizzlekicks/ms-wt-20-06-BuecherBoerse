import React, { useLayoutEffect } from 'react';
import { useLayoutContext } from '../context/LayoutContext';

const Alert = () => {
    const { alert, setAlert } = useLayoutContext();

    useLayoutEffect(() => {
        setTimeout(() => {
            setAlert({ display: false, icon: '', msg: '' });
        }, 3000);
    }, [alert]);

    return (
        <div className='alert basic-flex'>
            <span className='icon basic-flex'>{alert.icon}</span>
            <p>{alert.msg}</p>
        </div>
    );
};

export default Alert;
