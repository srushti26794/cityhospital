import { createSlice } from "@reduxjs/toolkit"

const initState = {
    isLoding: false,
    cart: [],
    count: 0,
    error: null
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initState,
    reducers: {
        handleCartData: (state, action) => {
            console.log(action.payload);

            let index = state.cart.findIndex((v) => v.id === action.payload);

            if (index !== -1) {
                state.cart[index].qty++;
            } else {
                state.cart.push({ id: action.payload, qty: 1 })
            }
        },

        decreaseCartQty: (state, action) => {
            let index = state.cart.findIndex((v) => v.id === action.payload);
            state.cart[index].qty--;
        },

        incraseCartQty: (state, action) => {
            let index = state.cart.findIndex((v) => v.id === action.payload);
            state.cart[index].qty++;
        },

        removeCartData: (state, action) => {
            let fdata = state.cart.filter((v) => v.id !== action.payload)
            console.log(fdata);
            return state.cart = fdata;
        }
    }
})

export const { handleCartData, decreaseCartQty, incraseCartQty, removeCartData} = cartSlice.actions
export default cartSlice.reducer