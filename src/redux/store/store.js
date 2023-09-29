import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux'
import { counterSlice } from "../slices/counterSlice"
import { authSlice } from "../slices/authSlice";


const rootReducer = combineReducers({
    counterSlice: counterSlice.reducer,
    authSlice: authSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer
})