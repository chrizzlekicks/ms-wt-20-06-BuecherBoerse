import React from 'react';
import { useLayoutContext } from '../context/LayoutContext';
import Loading2 from '../components/Loading2';
import Alert from '../components/Alert';
import PasswordReset from '../components/PasswordReset';

const Reset = () => {
    const { alert, loading } = useLayoutContext();

    return (
        <>
            {loading && <Loading2 />}
            <main className='hero'>
                <section className='signin-center'>
                    <PasswordReset />
                </section>
            </main>
            {alert.display && <Alert />}
        </>
    );
};

export default Reset;
