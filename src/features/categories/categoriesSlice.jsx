import { createSlice } from '@reduxjs/toolkit'
import { categoriesListing } from './categoriesListing'

const categoriesSlice = createSlice({
    name : 'categoriesSlice',
    initialState : {
        categories : categoriesListing 
    }

})

export default categoriesSlice.reducer