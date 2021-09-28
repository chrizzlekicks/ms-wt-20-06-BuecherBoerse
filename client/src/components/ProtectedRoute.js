import { Route, Redirect } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

const ProtectedRoute = ({ children, location, ...path }) => {
    const { user } = useGlobalContext();
    if (user) {
        return (
            <>
                <Route {...path}>{children}</Route>
            </>
        );
    } else {
        return (
            <Redirect to={{ pathname: '/login', state: { from: location } }} />
        );
    }
};

export default ProtectedRoute;
