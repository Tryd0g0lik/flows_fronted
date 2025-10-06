
/**
 * src\redux\features\tableRow\rowSlice.ts
 */
import {createSlice } from "@reduxjs/toolkit";

const clearRowState = {
    "flow": {
        "id": ""
    },
    "type": {
        "id": "",
        "content": ""
    },
    "category": {
        "id": "",
        "content": ""
    },
    "subcategory": {
        "id": "",
        "content": ""
    },
    "status": {
        "id": "",
        "content": ""
    },
    "money": {
        "content": ""
    },
    "slug": {
        "content": ""
    },
    "created_at": { // 2025-10-02T04:58:46
        "content": ""
    },
    "updated_at": {
        "content": ""
    }
};

const rowSlice = createSlice({
    name: "flow",
    initialState: clearRowState,
    reducers: {
        resetFlow: () => clearRowState,
        setCurrentFlow: (state, action) => {
            state = action.payload;
            return {...state };
        }
    }
});

export const {setCurrentFlow, resetFlow } = rowSlice.actions;
export default rowSlice.reducer;
