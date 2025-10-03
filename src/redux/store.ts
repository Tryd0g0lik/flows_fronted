/**
 * \src\redux\store.ts
 */
import { configureStore } from '@reduxjs/toolkit';
import pageSlice from 'src/redux/features/pagestate/pageSlice';
import rowSlice from './features/tableRow/rowSlice';


/**
 * personSlice - This is the state of the  user/person.
 * pageSlice - This is the state of the meta page's data.
 */
export const store = configureStore({
    reducer: {
        metapage: pageSlice,
        flow: rowSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself;
export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
