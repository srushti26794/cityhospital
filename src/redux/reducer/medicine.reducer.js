import { DELETE_MEDICINE, GET_MEDICINES, POST_MEDICINE } from "../ActionType"


export const initialState = {
    isLoding: false,
    medicines: [],
    error: null
}

export const medicinesReducer = (state = initialState, action) => {
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

        case DELETE_MEDICINE : return {
            ...state,
            medicines: state.medicines.filter((v) => v.id !== action.payload)
        }

        default:
            return state;
    }
}