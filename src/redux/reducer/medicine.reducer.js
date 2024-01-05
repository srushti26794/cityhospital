import { DELETE_MEDICINE, GET_MEDICINES, POST_MEDICINE, UPDATE_MEDICINE } from "../ActionType"


export const initialState = {
    isLoding: false,
    medicines: [],
    error: null
}

export const medicinesReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case GET_MEDICINES:
            return {
                ...state,
                medicines: action.payload
            }

        case POST_MEDICINE:
            return {
                ...state,
                medicines: state.medicines.concat(action.payload)
            }

        case DELETE_MEDICINE:
            return {
                ...state,
                medicines: state.medicines.filter((v) => v.id !== action.payload)
            }

        case UPDATE_MEDICINE:
            return {
                ...state,
                medicines: state.medicines.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return v;
                    }
                })
            }


        default:
            return state;
    }
}