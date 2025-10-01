/**
 * src\components\App.tsx
 */
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PagesRouter } from './Router';
import './style.css';
import { Provider } from 'react-redux';
import { store } from 'reduxToolkit/store';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

    if (!root) {
        throw new Error('[App]: Something what woong! It is an id "root" was not found ');
    }
    createRoot(root).render(
        <StrictMode>
            <Provider store={store}>
                <PagesRouter />
            </Provider>
        </StrictMode>,
    );
});
