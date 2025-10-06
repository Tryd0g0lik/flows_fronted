/**
 * src\redux\store.ts
 */
import { configureStore } from '@reduxjs/toolkit';
import pageSlice from '@redux/Slice/pagestate/pageSlice';
import rowSlice from '@redux/Slice/tableRow/rowSlice';
import subcategorySlice from "@redux/Slice/cellSubcategories/subcategoriesSlice";

/**
 * personSlice - This is the state of the  user/person.
 * pageSlice - This is the state of the meta page's data.
 */
export const store = configureStore({
    reducer: {
        metapage: pageSlice,
        flow: rowSlice,
        subcategory: subcategorySlice
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself;
export type RootState = ReturnType<typeof store.getState>;

