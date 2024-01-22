import { SIGNUP_REQUEST } from "../ActionType"

export const signupRequest = (data) => (dispatch) => {
    dispatch({type: SIGNUP_REQUEST, payload: data})
}