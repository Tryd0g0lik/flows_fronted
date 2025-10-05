/**
 * src\app\components\Router\index.tsx
 */

import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { MainFC } from '@pages/components/Main';
import { setCurrentMeta } from '@redux/Slice/pagestate/pageSlice';
import { BASIC_URL_API, PageMeta } from '@interfeces';
import { RootState } from 'src/redux/store';
const piUrl = [
        `${BASIC_URL_API}/flow/`, 
        `${BASIC_URL_API}/type/`, 
        `${BASIC_URL_API}/status/`, 
        `${BASIC_URL_API}/category/`, 
        `${BASIC_URL_API}/subcategory/`
    ];

// 'pageMeta' - Data from redux
const router_ = (pageMeta: PageMeta) => createBrowserRouter([
        {
            path: '/',
            element: <MainFC arrApiUrl={piUrl} {...pageMeta}/>,
            
        },
    
    ]);

export const MetaListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const pathname = window.location.pathname.toLowerCase().trim();
        const pageName = pathname.includes('')
            ? 'Записи'
            : pathname.includes('login')
              ? 'Authorisation'
              : 'Main page';

        const state: PageMeta = {
            page: {
                title: pageName,
                pathName: pathname,
                description: '',
                keywords: [],
            },
        };

        dispatch(setCurrentMeta(state));
    }, [location.pathname, dispatch]);

    return null;
};

export function PagesRouter() {
    const currantMeta: PageMeta = useSelector((state: RootState) => state.metapage);
    return (
        <>
            <MetaListener />
            <RouterProvider router={router_(currantMeta)} />
        </>
    );
}
