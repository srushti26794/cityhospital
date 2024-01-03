import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { medicinesReducer } from "./medicine.reducer";

export const rootReducer = combineReducers({
    counter : counterReducer,
    medicines : medicinesReducer
})