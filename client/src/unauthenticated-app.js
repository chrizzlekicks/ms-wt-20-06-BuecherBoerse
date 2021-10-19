import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Loading from './components/Loading';
import LoginScreen from './pages/LoginScreen';

// lazy import
const Reset = lazy(() => import('./pages/Reset'));

function UnauthApp() {
    return (
        <>
            <Suspense fallback={<Loading />}>
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
            </Suspense>
        </>
    );
}

export default UnauthApp;
