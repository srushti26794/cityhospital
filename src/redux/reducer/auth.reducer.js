import { LOGGEDIN_USER, LOGGEDOUT_USER } from "../ActionType";

const initialState = {
    isLoading: false,
    user: null,
    error: null
}

export const authReducer = ((state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case LOGGEDIN_USER:
            return {
                isLoading: false,
                user: action.payload,
                error: null
            }

        case LOGGEDOUT_USER:
            return {
                isLoading: false,
                user: null,
                error: null
            }

        default:
            return state
    }
})