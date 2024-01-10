import { combineReducers } from "redux";
import { medicinesReducer } from "./medicine.reducer";
import { doctorReducer } from "./doctors.reducer";
import counterReducer from "../slice/counter.slice";

export const rootReducer = combineReducers({
    counter : counterReducer,
    medicines : medicinesReducer,
    doctors : doctorReducer
})