import { Route, Redirect } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

const ProtectedRoute = ({ children, location, ...path }) => {
  const { isUserLoggedIn } = useGlobalContext();
  if (isUserLoggedIn) {
    return (
      <>
        <Route {...path}>{children}</Route>
      </>
    );
  } else {
    return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
  }
};

export default ProtectedRoute;
