import { useLayoutEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';

const Alert = () => {
    const { alert, setAlert } = useGlobalContext();

    useLayoutEffect(() => {
        setTimeout(() => {
            setAlert({ display: false, icon: '', msg: '' });
        }, 3000);
    });

    return (
        <div className='alert basic-flex'>
            <span className='icon basic-flex'>{alert.icon}</span>
            <p>{alert.msg}</p>
        </div>
    );
};

export default Alert;
