import { createSlice } from "@reduxjs/toolkit"

const initState = {
    isLoding: false,
    wishlist: [],
    error: null
}

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: initState,
    reducers: {
        handleWishlistData: (state, action) => {
            console.log(action.payload);

            if (!state.wishlist.includes(action.payload)) {
                state.wishlist.push(action.payload)
            } else {
                let fdata = state.wishlist.filter((v) => v !== action.payload)
                state.wishlist = fdata;
            }
        }
    }
})

export const {handleWishlistData} = wishlistSlice.actions;
export default wishlistSlice.reducer;