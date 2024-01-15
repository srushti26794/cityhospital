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

            // if (!state.wishlist.includes(id)) {
            //     state.wishlist.push({state.})
            // } else {
            //     let fdata = wishlist.filter((v) => v !== id)
            //     console.log(fdata);
            //     setWishlist(fdata)
            // }
        }
    }
})

export const {handleWishlistData} = wishlistSlice.actions;
export default wishlistSlice.reducer;