import { useHistory, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaPoop } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';

export const useAuth = () => {
  const {
    userCredential,
    setUserCredential,
    setIsUserLoggedIn,
    setAlert,
    setIsTabLeft,
    setLoading,
  } = useGlobalContext();
  const history = useHistory();
  const { state } = useLocation();

  const signInUser = async (url, tryLogin) => {
    try {
      setLoading(true);
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(userCredential),
      });
      if (res.ok) {
        const userData = await res.json();
        setLoading(false);
        if (tryLogin) {
          sessionStorage.setItem('id', userData.user._id);
          sessionStorage.setItem('name', userData.user.name);
          sessionStorage.setItem('token', userData.token);
          history.push(state ? state.from : '/', setIsUserLoggedIn(true));
        } else {
          setAlert({
            display: true,
            icon: <FaCheckCircle />,
            msg: 'Du bist registriert! Logge dich nun ein!',
          });
          setUserCredential({ name: '', email: '', password: '' });
          setIsTabLeft(true);
        }
      } else {
        throw new Error('Hoppala, da ist wohl was schief gelaufen...');
      }
    } catch (error) {
      console.log('errrorrrrr', error);
      setLoading(false);
      setAlert({
        display: true,
        icon: <FaPoop />,
        msg: 'Das hat leider nicht geklappt',
      });
      setUserCredential({ name: '', email: '', password: '' });
    }
  };

  const getLoggedOut = async (url) => {
    try {
      const res = await fetch(url);
      if (res.ok) {
        await res.json();
        sessionStorage.clear();
        setUserCredential({ name: '', email: '', password: '' });
      } else {
        throw new Error('Hoppala, da ist wohl was schief gelaufen...');
      }
    } catch (error) {
      console.log('Das hat nicht geklappt', error);
    }
  };

  return {
    signInUser,
    getLoggedOut,
  };
};
