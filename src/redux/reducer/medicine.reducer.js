import { GET_MEDICINES, POST_MEDICINE } from "../ActionType"


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

        default:
            return state;
    }
}