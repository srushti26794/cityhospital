import { combineReducers } from "redux";
import { medicinesReducer } from "./medicine.reducer";
import { doctorReducer } from "./doctors.reducer";
import counterReducer from "../slice/counter.slice";
import addToCartSlice from "../slice/addToCart.slice";

export const rootReducer = combineReducers({
    counter : counterReducer,
    medicines : medicinesReducer,
    doctors : doctorReducer,
    cart : addToCartSlice
})