import React from 'react';
import Login from '../components/Login';
import '../styles/LoginScreen.css';
import Tab from '../components/Tab';
import Signup from '../components/Signup';
import { useGlobalContext } from '../context/OverallContext';
import Loading2 from '../components/Loading2';
import Alert from '../components/Alert';
import { motion } from 'framer-motion';

const LoginScreen = () => {
  const { alert, isTabLeft, loading } = useGlobalContext();

  return (
    <>
      {loading && <Loading2 />}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='hero'
      >
        <section className='signin-center'>
          <Tab />
          {isTabLeft ? <Login /> : <Signup />}
        </section>
      </motion.main>
      {alert.display && <Alert />}
    </>
  );
};

export default LoginScreen;
