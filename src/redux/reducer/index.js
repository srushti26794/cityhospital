import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { medicinesReducer } from "./medicine.reducer";
import { doctorReducer } from "./doctors.reducer";

export const rootReducer = combineReducers({
    counter : counterReducer,
    medicines : medicinesReducer,
    doctors : doctorReducer
})