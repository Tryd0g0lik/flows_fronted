/**
 * src\components\Router\index.tsx
 */
import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { MainFC } from '@pages/components/Main';
import { setCurrentMeta } from 'src/redux/features/pagestate/pageSlice';
// import { RegisterFC } from 'src/pages/components/Register';
import { PageMeta } from '@interfeces';
import { RootState } from 'src/redux/store';
// import AppGoogleMapsFC from 'src/pages/components/Maps';

// 'pageMeta' - Data from redux
const router_ = (pageMeta: PageMeta) => createBrowserRouter([
        {
            path: '/',
            element: <MainFC {...pageMeta}/>,
        },
    
    ]);

export const MetaListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const pathname = window.location.pathname.toLowerCase().trim();
        const pageName = pathname.includes('LOgin')
            ? 'Registration'
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
