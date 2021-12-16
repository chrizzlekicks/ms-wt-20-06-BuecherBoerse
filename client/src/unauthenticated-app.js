import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loading from './components/Loading';
import LoginScreen from './pages/LoginScreen';

// lazy import
const Reset = lazy(() => import('./pages/Reset'));

function UnauthApp() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path='/' element={<LoginScreen />} />
                    <Route path='/reset' element={<Reset />} />
                    <Route
                        path='*'
                        element={<Navigate to={{ pathname: '/' }} />}
                    />
                </Routes>
            </Suspense>
        </>
    );
}

export default UnauthApp;
