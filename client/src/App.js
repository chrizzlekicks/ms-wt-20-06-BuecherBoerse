import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useGlobalContext } from './context/GlobalContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Marketplace from './pages/Marketplace';
import OpenBook from './pages/OpenBook';
import UploadBook from './pages/UploadBook';
import Footer from './components/Footer';
import LoginScreen from './pages/LoginScreen';
import Error from './pages/Error';
import ScrollToTop from './components/ScrollToTop';
import DataPrivacy from './pages/DataPrivacy';
import Imprint from './pages/Imprint';
import MyBooks from './pages/MyBooks';
import Messages from './pages/Messages';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { UploadBookProvider } from './context/UploadBookContext';
import { OpenBookProvider } from './context/OpenBookContext';
import { MyBooksProvider } from './context/MyBooksContext';
import { MessageProvider } from './context/MessageContext';
import { AuthProvider } from './context/AuthContext';
import { NavbarProvider } from './context/NavbarContext';
import Reset from './pages/Reset';

const App = () => {
  const { isUserLoggedIn } = useGlobalContext();
  return (
    <Router>
      <ScrollToTop />
      {isUserLoggedIn && (
        <NavbarProvider>
          <Navbar />
        </NavbarProvider>
      )}
      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch>
          <Route path='/login'>
            {!isUserLoggedIn ? (
              <AuthProvider>
                <LoginScreen />
              </AuthProvider>
            ) : (
              <Redirect to='/' />
            )}
          </Route>
          <Route path='/reset'>
            {!isUserLoggedIn ? (
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
          <ProtectedRoute path='/openbook/:id'>
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
      {isUserLoggedIn && <Footer />}
    </Router>
  );
};

export default App;
