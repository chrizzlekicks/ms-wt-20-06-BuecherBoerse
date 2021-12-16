import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { FaMeh } from 'react-icons/fa';
import ReturnTo from '../components/ReturnTo';

const Error = () => {
    const { closeSubmenu } = useGlobalContext();
    return (
        <>
            <main onClick={closeSubmenu}>
                <ReturnTo />
                <section className='error-page basic-flex'>
                    <span className='error-icon'>
                        <FaMeh />
                    </span>
                    <h3 className='title error-title'>
                        Ooops, sieht aus als wäre die aktuelle Seite noch in
                        Bearbeitung (oder nicht verfügbar).
                    </h3>
                </section>
            </main>
        </>
    );
};

export default Error;
