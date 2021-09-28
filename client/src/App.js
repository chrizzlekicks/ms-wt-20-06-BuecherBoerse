import { lazy, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useGlobalContext } from './context/GlobalContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginScreen from './pages/LoginScreen';
import Reset from './pages/Reset';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { UploadBookProvider } from './context/UploadBookContext';
import { OpenBookProvider } from './context/OpenBookContext';
import { MyBooksProvider } from './context/MyBooksContext';
import { MessageProvider } from './context/MessageContext';
import { AuthProvider } from './context/AuthContext';
import { NavbarProvider } from './context/NavbarContext';

// lazy imports
const Marketplace = lazy(() => import('./pages/Marketplace'));
const MyBooks = lazy(() => import('./pages/MyBooks'));
const Messages = lazy(() => import('./pages/Messages'));
const OpenBook = lazy(() => import('./pages/OpenBook'));
const UploadBook = lazy(() => import('./pages/UploadBook'));
const DataPrivacy = lazy(() => import('./pages/DataPrivacy'));
const Imprint = lazy(() => import('./pages/Imprint'));
const Error = lazy(() => import('./pages/Error'));
const Footer = lazy(() => import('./components/Footer'));

const App = () => {
    const { user } = useGlobalContext();
    return (
        <Router>
            <Suspense fallback={<Loading />}>
                {user && (
                    <NavbarProvider>
                        <Navbar />
                    </NavbarProvider>
                )}
                <ScrollToTop />
                <AnimatePresence initial={false} exitBeforeEnter>
                    <Switch>
                        <Route path='/login'>
                            {!user ? (
                                <AuthProvider>
                                    <LoginScreen />
                                </AuthProvider>
                            ) : (
                                <Redirect to='/' />
                            )}
                        </Route>
                        <Route path='/reset'>
                            {!user ? (
                                <AuthProvider>
                                    <Reset />
                                </AuthProvider>
                            ) : (
                                <Redirect to='/' />
                            )}
                        </Route>
                        <ProtectedRoute exact path='/'>
                            <MarketplaceProvider>
                                <Marketplace />
                            </MarketplaceProvider>
                        </ProtectedRoute>
                        <ProtectedRoute path='/mybooks'>
                            <MyBooksProvider>
                                <MyBooks />
                            </MyBooksProvider>
                        </ProtectedRoute>
                        <ProtectedRoute path='/uploadbook'>
                            <UploadBookProvider>
                                <UploadBook />
                            </UploadBookProvider>
                        </ProtectedRoute>
                        <ProtectedRoute path='/book/:id'>
                            <OpenBookProvider>
                                <OpenBook />
                            </OpenBookProvider>
                        </ProtectedRoute>
                        <ProtectedRoute path='/messages'>
                            <MessageProvider>
                                <Messages />
                            </MessageProvider>
                        </ProtectedRoute>
                        <ProtectedRoute path='/imprint'>
                            <Imprint />
                        </ProtectedRoute>
                        <ProtectedRoute path='/dataprivacy'>
                            <DataPrivacy />
                        </ProtectedRoute>
                        <Route path='*'>
                            <Error />
                        </Route>
                    </Switch>
                </AnimatePresence>
                {user && <Footer />}
            </Suspense>
        </Router>
    );
};

export default App;
