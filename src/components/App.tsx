/**
 * src\components\App.tsx
 */
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PagesRouter } from "@Component/Router";
import './style.css';
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';
document.addEventListener('DOMContentLoaded', () => {
    
    const root = document.getElementById('root');
    console.log("----------------");
    if (!root) {
        console.log("[App]: Something what woong! It is an id  was not found ");
        throw new Error('[App]: Something what woong! It is an id "root" was not found ');
    }
    console.log("[App]: OK ");
    createRoot(root).render(
        <StrictMode>
            <Provider store={store}>
                <PagesRouter />
            </Provider>
        </StrictMode>,
    );
});
