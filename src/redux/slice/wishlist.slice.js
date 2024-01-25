import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isloading : false,
    wishlist : [],
    error : null
}

const wishlistSlice = createSlice ({
    name: 'wishlist',
    initialState,
    reducer : {
        handleWishlistData : (state, action) => {
            console.log(action);
            if(!state.wishlist.includes(action.payload)){
                state.wishlist.push(action.payload)
            }else {
                let data = state.wishlist.filter((v) => v.id !== action.payload)
                console.log(data);
            }
        }
    }
})

export const {handleWishlistData} = wishlistSlice.actions;
export default wishlistSlice.reducer;