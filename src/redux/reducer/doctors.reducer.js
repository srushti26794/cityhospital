import { DELETE_DOCTORS, GET_DOCTORS, POST_DOCTORS, UPDATE_DOCTORS } from "../ActionType";

export const initialState = {
    isLoding: false,
    doctors: [],
    error: null
}

export const doctorReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case GET_DOCTORS:
            return {
                ...state,
                doctors: action.payload
            }

        case POST_DOCTORS:
            return {
                ...state,
                doctors: state.doctors.concat(action.payload)
            }

        case DELETE_DOCTORS:
            return {
                ...state,
                doctors: state.doctors.filter((v) => v.id !== action.payload)
            }

        case UPDATE_DOCTORS:
            return {
                ...state,
                doctors: state.doctors.map((v) => {
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