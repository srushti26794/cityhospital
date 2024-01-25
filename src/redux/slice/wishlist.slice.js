import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isloading : false,
    wishlist : [],
    error : null
}

// const wishlistSlice = createSlice ({
//     name: 'wishlist',
//     initialState,
//     reducers : {
//         handleWishlistData : (state, action) => {
//             console.log(action);
//             if(!state.wishlist.includes(action.payload)){
//                return state.wishlist.push(action.payload)
//             }else {
//                 let data = state.wishlist.filter((v) => v.id !== action.payload)
//                 console.log(data);
//                 return data;
//             }
//         }
//     }
// })

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
      handleWishlistData: (state, action) => {
        const idToAddOrRemove = action.payload;
  
        // Check if the ID is already in the wishlist
        const isInWishlist = state.wishlist.includes(idToAddOrRemove);
  
        if (!isInWishlist) {
          // If not in the wishlist, add it
          return {
            ...state,
            wishlist: [...state.wishlist, idToAddOrRemove],
          };
        } else {
          // If already in the wishlist, remove it
          const updatedWishlist = state.wishlist.filter(
            (id) => id !== idToAddOrRemove
          );
  
          return {
            ...state,
            wishlist: updatedWishlist,
          };
        }
      },
    },
  });

export const {handleWishlistData} = wishlistSlice.actions;
export default wishlistSlice.reducer;