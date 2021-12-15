import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { UploadBookProvider } from './context/UploadBookContext';
import { OpenBookProvider } from './context/OpenBookContext';
import { MyBooksProvider } from './context/MyBooksContext';
import { MessageProvider } from './context/MessageContext';
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

function AuthApp() {
    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <NavbarProvider>
                    <Navbar />
                </NavbarProvider>
                <ScrollToTop />
                <AnimatePresence initial={false} exitBeforeEnter>
                    <Routes>
                        <Route exact path='/'>
                            <MarketplaceProvider>
                                <Marketplace />
                            </MarketplaceProvider>
                        </Route>
                        <Route path='/mybooks'>
                            <MyBooksProvider>
                                <MyBooks />
                            </MyBooksProvider>
                        </Route>
                        <Route path='/uploadbook'>
                            <UploadBookProvider>
                                <UploadBook />
                            </UploadBookProvider>
                        </Route>
                        <Route path='/book/:id'>
                            <OpenBookProvider>
                                <OpenBook />
                            </OpenBookProvider>
                        </Route>
                        <Route path='/messages'>
                            <MessageProvider>
                                <Messages />
                            </MessageProvider>
                        </Route>
                        <Route path='/imprint'>
                            <Imprint />
                        </Route>
                        <Route path='/dataprivacy'>
                            <DataPrivacy />
                        </Route>
                        <Route path='*'>
                            <Error />
                        </Route>
                    </Routes>
                </AnimatePresence>
                <Footer />
            </Suspense>
        </Router>
    );
}

export default AuthApp;
