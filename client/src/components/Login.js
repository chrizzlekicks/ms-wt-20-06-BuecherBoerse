import { useGlobalContext } from '../context/OverallContext';
import { useAuth } from '../hooks/useAuth';
import InputField from './InputField';
import SigninBtn from './SigninBtn';
import Form from './Form';

const Login = () => {
  const { AUTH_SIGNIN, isTabLeft, userCredential, setUserCredential } =
    useGlobalContext();
  const { signInUser } = useAuth();
  const { email, password } = userCredential;

  const checkLoginInput = (e) => {
    setUserCredential({
      ...userCredential,
      [e.target.name]: e.target.value,
    });
  };

  const loginNow = (e) => {
    e.preventDefault();
    signInUser(AUTH_SIGNIN, isTabLeft);
  };

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
            onChange={checkLoginInput}
            required
          />
          <InputField
            type='password'
            htmlFor='Dein Passwort:'
            name='password'
            id='password'
            value={password}
            onChange={checkLoginInput}
            required
          />
          <SigninBtn type='submit'>Einloggen</SigninBtn>
        </section>
      </Form>
    </>
  );
};

export default Login;
