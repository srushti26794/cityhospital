import { combineReducers } from "redux";
import { medicinesReducer } from "./medicine.reducer";
import counterReducer from "../slice/counter.slice";
import addToCartSlice from "../slice/addToCart.slice";
import docWishlistSlice from "../slice/docWishlist.slice";

export const rootReducer = combineReducers({
    counter : counterReducer,
    medicines : medicinesReducer,
    cart : addToCartSlice,
    wishlist : docWishlistSlice
})