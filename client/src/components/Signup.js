import { useGlobalContext } from '../context/GlobalContext';
import { useAuth } from '../hooks/useAuth';
import InputField from './InputField';
import SigninBtn from './SigninBtn';
import Form from './Form';

const Signup = () => {
  const { API_USERS, userCredential, setUserCredential } = useGlobalContext();
  const { signInUser } = useAuth();
  const { name, email, password } = userCredential;

  const checkSignupInput = (e) => {
    setUserCredential({
      ...userCredential,
      [e.target.name]: e.target.value,
    });
  };

  const signupNow = (e) => {
    e.preventDefault();
    signInUser(API_USERS);
  };

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
            onChange={checkSignupInput}
            required
          />
          <InputField
            type='text'
            htmlFor='Deine bevorzugte Email:'
            name='email'
            id='email'
            value={email}
            onChange={checkSignupInput}
            required
          />
          <InputField
            type='password'
            htmlFor='Dein bärenstarkes Passwort:'
            name='password'
            id='password'
            value={password}
            onChange={checkSignupInput}
            required
          />
          <SigninBtn type='submit'>Registrieren</SigninBtn>
        </section>
      </Form>
    </>
  );
};

export default Signup;
