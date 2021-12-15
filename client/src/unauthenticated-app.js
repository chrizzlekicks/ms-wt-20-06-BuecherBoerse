import React, { lazy, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';
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
                        <Routes>
                            <Route path='/' element={<LoginScreen />} />
                            <Route path='/reset' element={<Reset />} />
                            <Route
                                path='*'
                                element={<Navigate to={{ pathname: '/' }} />}
                            />
                        </Routes>
                    </AuthProvider>
                </Router>
            </Suspense>
        </>
    );
}

export default UnauthApp;
