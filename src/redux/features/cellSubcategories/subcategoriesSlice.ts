/**
 * src\redux\features\cellSubcategories\subcategoriesSlice.ts
 */
import {createSlice} from "@reduxjs/toolkit";
import type { PayloadAction} from "@reduxjs/toolkit";
import type { Category  } from "@interfeces";


const clearSubcategory: Category["subcategories"] = [];

const subcategorySlice = createSlice({
    name: "indexesSubcategory",
    initialState: clearSubcategory,
    reducers: {
        resetSubcategory: () => clearSubcategory,
        setSubcategory: (state, action: PayloadAction<Category["subcategories"] >) =>{
            /**
             * id: number of  position the sumbcategory
             * slug: string (pathname from URL-page this subcategory) of  position the sumbcategory;
             * name: string, it is title of position.
             */
            state = action.payload;
            return {...state};
        }
    }

});

export const { resetSubcategory, setSubcategory } = subcategorySlice.actions;
export default subcategorySlice.reducer;
