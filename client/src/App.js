import React, { lazy, Suspense } from 'react';
import { useAuthContext } from './context/AuthContext';
import Loading from './components/Loading';

// lazy import von zwei separaten apps
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'));
const AuthenticatedApp = lazy(() => import('./authenticated-app'));

export function App() {
    const { user } = useAuthContext();
    return (
        <>
            <Suspense fallback={<Loading />}>
                {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </Suspense>
        </>
    );
}
