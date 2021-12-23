import React from 'react';
import InputField from './InputField';
import SigninBtn from './SigninBtn';
import Form from './Form';
import { useAuthContext } from '../context/AuthContext';

const Signup = () => {
    const {
        userCredential: { name, email, password },
        signupNow,
        checkSigninInput
    } = useAuthContext();

    return (
        <>
            <Form className='form-center' onSubmit={signupNow}>
                <div className='title'>
                    <h3>Melde dich jetzt an!</h3>
                </div>
                <section className='form'>
                    <InputField
                        type='text'
                        htmlFor='Dein Wunsch-Username:'
                        name='name'
                        id='name'
                        value={name}
                        onChange={checkSigninInput}
                        required
                    />
                    <InputField
                        type='text'
                        htmlFor='Deine bevorzugte Email:'
                        name='email'
                        id='email'
                        value={email}
                        onChange={checkSigninInput}
                        required
                    />
                    <InputField
                        type='password'
                        htmlFor='Dein bärenstarkes Passwort:'
                        name='password'
                        id='password'
                        value={password}
                        onChange={checkSigninInput}
                        required
                    />
                    <SigninBtn type='submit'>Registrieren</SigninBtn>
                </section>
            </Form>
        </>
    );
};

export default Signup;
