import {  createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name : 'user/login' ,
    initialState : {
        isAuth : false ,
        credentials : {
            name : 'Emmanuel' ,
            image : require('../../assets/user.png')
        }
    } ,
    reducers : {
        updateLoginStatus :  (state,{ payload }) => {
            state.isAuth = true ;             
        } ,
        logoutUser : state => {
            state.isAuth = false ;
        }
    }
})

export const {  updateLoginStatus , logoutUser } = loginSlice.actions
export default loginSlice.reducer ;