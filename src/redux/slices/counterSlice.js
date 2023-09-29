import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    counter: 1
}

export const counterSlice = createSlice({
    name: 'counterSlice',
    initialState,
    reducers: {
        incrementCounter: (state, action) => {
            state.counter = state.counter + 1
         },
        decrementCounter: (state, action) => {
            state.counter = state.counter - 1
         },
    }
})

export const {incrementCounter, decrementCounter} = counterSlice.actions