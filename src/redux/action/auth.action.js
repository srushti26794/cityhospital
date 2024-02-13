import { FORGET_REQUEST, LOGGEDIN_USER, LOGGEDOUT_USER, LOGIN_REQUEST, LOGOUT_REQUEST, SIGNUP_REQUEST, SIGNUP_RESPONSE } from "../ActionType"

export const signupRequest = (data) => (dispatch) => {
    console.log(data);
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

export const logoutRequest = () => (dispatch) => {
    console.log('logout request');
    dispatch({type: LOGOUT_REQUEST})
}

export const loggedOutUser = () => (dispatch) => {
    console.log('logged out');
    dispatch({type: LOGGEDOUT_USER})
}