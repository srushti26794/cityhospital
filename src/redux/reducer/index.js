import { combineReducers } from "redux";
import { doctorReducer } from "./doctors.reducer";
import counterReducer from "../slice/counter.slice";
import addToCartSlice from "../slice/addToCart.slice";
import medicinesSlice from "../slice/medicines.slice";

export const rootReducer = combineReducers({
    counter : counterReducer,
    medicines : medicinesSlice,
    doctors : doctorReducer,
    cart : addToCartSlice
})