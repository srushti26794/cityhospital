import { GET_MEDICINES } from "../ActionType"


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

        default:
            return state;
    }
}