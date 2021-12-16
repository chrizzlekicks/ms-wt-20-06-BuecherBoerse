import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import { App } from './App';
import { LayoutProvider } from './context/LayoutContext';
import { AuthProvider } from './context/AuthContext';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <LayoutProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </LayoutProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
