import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const portfolioSlice = createSlice({
    name: "portfolio",
    initialState: {
        portfolio:  [],
    },
    reducers: {
        // Add your reducers here
    },
});

// Action creators are generated for each case reducer function


export default portfolioSlice.reducer;
