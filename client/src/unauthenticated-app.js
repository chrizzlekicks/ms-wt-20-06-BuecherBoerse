import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginScreen from './pages/LoginScreen';
import Reset from './pages/Reset';

function UnauthApp() {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Route exact path='/'>
                        <LoginScreen />
                    </Route>
                    <Route path='/reset'>
                        <Reset />
                    </Route>
                    <Route path='*'>
                        <Redirect to={{ pathname: '/' }} />
                    </Route>
                </AuthProvider>
            </Router>
        </>
    );
}

export default UnauthApp;
