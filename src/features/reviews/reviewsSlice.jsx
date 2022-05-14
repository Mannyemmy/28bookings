import { createSlice } from "@reduxjs/toolkit";
import { reviews } from "./reviews";

const reviewsSlice = createSlice({
    name : 'reviewsSlice',
    initialState : {
        reviews : [...reviews],
    }    
})

export default reviewsSlice.reducer