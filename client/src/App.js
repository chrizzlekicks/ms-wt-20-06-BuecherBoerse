import React, { lazy, Suspense } from 'react';
import { useGlobalContext } from './context/GlobalContext';
import Loading from './components/Loading';

// lazy import von zwei separaten apps
const UnauthenticatedApp = lazy(() => import('./unauthenticated-app'));
const AuthenticatedApp = lazy(() => import('./authenticated-app'));

function App() {
    const { user } = useGlobalContext();
    return (
        <>
            <Suspense fallback={<Loading />}>
                {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
            </Suspense>
        </>
    );
}

export default App;
