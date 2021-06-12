import InputField from './InputField';
import SigninBtn from './SigninBtn';
import Form from './Form';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  const { userCredential, loginNow, checkSigninInput } = useAuthContext();
  const { email, password } = userCredential;

  return (
    <>
      <Form className='form-center' onSubmit={loginNow}>
        <div className='title'>
          <h3>Willkommen zurück</h3>
        </div>
        <section className='form'>
          <InputField
            type='text'
            htmlFor='Deine Email:'
            name='email'
            id='email'
            value={email}
            onChange={checkSigninInput}
            required
          />
          <InputField
            type='password'
            htmlFor='Dein Passwort:'
            name='password'
            id='password'
            value={password}
            onChange={checkSigninInput}
            required
          />
          <SigninBtn type='submit'>Einloggen</SigninBtn>
        </section>
      </Form>
    </>
  );
};

export default Login;
