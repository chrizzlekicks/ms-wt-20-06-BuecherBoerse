import React from 'react';
import Form from './Form';
import InputField from './InputField';
import SigninBtn from './SigninBtn';
import { useAuthContext } from '../context/AuthContext';

const SetEmailForReset = () => {
    const {
        userCredential,
        checkSigninInput,
        requestReset,
        openPasswordResetTab
    } = useAuthContext();

    return (
        <>
            <Form className='form-center' onSubmit={requestReset}>
                <div className='title'>
                    <h3>Passwort Reset</h3>
                    <p>
                        Gib hier deine Email ein und wir schicken dir einen
                        Reset-Link
                    </p>
                </div>
                <section className='form'>
                    <InputField
                        type='text'
                        htmlFor='Deine Email:'
                        name='email'
                        id='email'
                        value={userCredential.email}
                        onChange={checkSigninInput}
                        required
                    />
                    <SigninBtn type='submit'>Passwort zurücksetzen</SigninBtn>
                    <button
                        type='button'
                        className='reset'
                        onClick={openPasswordResetTab}
                    >
                        zurück zum Login
                    </button>
                </section>
            </Form>
        </>
    );
};

export default SetEmailForReset;
