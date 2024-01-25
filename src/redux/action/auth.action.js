import { FORGET_REQUEST, LOGGEDIN_USER, LOGIN_REQUEST, SIGNUP_REQUEST } from "../ActionType"

export const signupRequest = (data) => (dispatch) => {
    dispatch({type: SIGNUP_REQUEST, payload: data})
}

export const loginRequest = (data) => (dispatch) => {
    console.log(data);
    dispatch({type: LOGIN_REQUEST, payload: data})
}

export const forgetRequest = (data) => (dispatch) => {
    console.log(data);
    dispatch({type: FORGET_REQUEST, payload: data})
}

export const loggedUser = (data) => (dispatch) => {
    console.log(data);
    dispatch({type: LOGGEDIN_USER, payload: data})
}