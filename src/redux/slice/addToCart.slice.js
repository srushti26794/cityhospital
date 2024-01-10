import { createSlice } from "@reduxjs/toolkit"

const initState = {
    cart: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initState,
    reducers: {
    }
})