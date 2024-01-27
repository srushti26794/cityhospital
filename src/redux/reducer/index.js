import { combineReducers } from "redux";
import { doctorReducer } from "./doctors.reducer";
import counterReducer from "../slice/counter.slice";
import addToCartSlice from "../slice/addToCart.slice";
import medicinesSlice from "../slice/medicines.slice";
import { authReducer } from "./auth.reducer";
import wishlistSlice from "../slice/wishlist.slice";
import AlertSlice from "../slice/Alert.slice";

export const rootReducer = combineReducers({
    counter : counterReducer,
    medicines : medicinesSlice,
    doctors : doctorReducer,
    cart : addToCartSlice,
    auth : authReducer,
    wishlist: wishlistSlice,
    alert : AlertSlice
})