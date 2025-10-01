/**
 * src\redux\features\pagestate\pageState.ts
 *
 * From the PageRouter we can get page.title, page.description, page.keywords, page.pathName and other data.
 * Example. We can get variable the page.pathName and change the page title/handing in components.
 */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PageMeta } from '@interfeces';

/** Basis proporties of page  */
const clearPageState: PageMeta = {
    page: {
        title: '',
        description: '',
        keywords: [],
        pathName: '',
    },
};

const pageSlice = createSlice({
    name: 'metapage',
    initialState: clearPageState,
    reducers: {
        resetPageMeta: () => clearPageState,
        setCurrentMeta: (state, action: PayloadAction<PageMeta>) => {
            /**
             * state.page.title = action.payload.page.title;
             * state.page.description = action.payload.page.description;
             * state.page.keywords = action.payload.page.keywords;
             * ....
             */
            state = action.payload;
            return { ...state };
        },
    },
});

export const { setCurrentMeta, resetPageMeta } = pageSlice.actions;
export default pageSlice.reducer;
