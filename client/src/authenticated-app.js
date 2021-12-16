import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

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
                <Navbar />
                <ScrollToTop />
                <AnimatePresence initial={false} exitBeforeEnter>
                    <Routes>
                        <Route path='/' element={<Marketplace />} />
                        <Route path='/mybooks' element={<MyBooks />} />
                        <Route path='/uploadbook' element={<UploadBook />} />
                        <Route path='/book/:id' element={<OpenBook />} />
                        <Route path='/messages' element={<Messages />} />
                        <Route path='/imprint' element={<Imprint />} />
                        <Route path='/dataprivacy' element={<DataPrivacy />} />
                        <Route path='*' element={<Error />} />
                    </Routes>
                </AnimatePresence>
                <Footer />
            </Suspense>
        </Router>
    );
}

export default AuthApp;
