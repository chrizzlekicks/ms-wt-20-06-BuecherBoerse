import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';

const Alert = () => {
  const { alert, setAlert } = useGlobalContext();
  useEffect(() => {
    setTimeout(() => {
      setAlert({ display: false, icon: '', msg: '' });
    }, 2000);
  });

  return (
    <div className='alert basic-flex'>
      <span className='icon basic-flex'>{alert.icon}</span>
      <p>{alert.msg}</p>
    </div>
  );
};

export default Alert;
