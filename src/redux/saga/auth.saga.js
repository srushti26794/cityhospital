import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { forgetAPI, loginAPI, logoutAPI, signupAPI } from '../../common/api/auth.api'
import { FORGET_REQUEST, LOGGEDOUT_USER, LOGIN_REQUEST, LOGOUT_REQUEST, SIGNUP_REQUEST } from '../ActionType';
import { loggedOutUser, loggedUser } from '../action/auth.action';
import { setAlert } from '../slice/Alert.slice';

function* signup(action) {
  try {
    const user = yield call(signupAPI, action.payload)
    console.log(user);
    yield put(setAlert({text : user.message, color : 'success'}))
  } catch (e) {
    console.log(e);
    yield put(setAlert({text : e.message, color : 'error'}))
  }
}

function* login(action){
  try {
    const user = yield call(loginAPI, action.payload.data)
    console.log(user);
    yield put(loggedUser(user.user))
    action.payload.callback("/")
    yield put(setAlert({text : user.message, color : 'success'}))
    console.log(user);
  } catch (e) {
    console.log(e);
    yield put(setAlert({text : e.message, color : 'error'}))
  }
}

function* forget(action){
  try {
    const user = yield call(forgetAPI, action.payload)
    yield put(setAlert({text : user.message, color : 'success'}))
  } catch (e) {
    yield put(setAlert({text : e.message, color : 'error'}))
  }
}

function* logout(){
  try {
    const user = yield call(logoutAPI)
    console.log(user);
    yield put(loggedOutUser())
    yield put(setAlert({text : user.message, color : 'success'}))
  } catch (e) {
    yield put(setAlert({text : e.message, color : 'error'}))
  }
}

function* watchSignup() {
  yield takeEvery(SIGNUP_REQUEST, signup)
}

function* watchLogin() {
  yield takeEvery(LOGIN_REQUEST,login)
}

function* watchForget() {
  yield takeEvery(FORGET_REQUEST ,forget)
}

function* watchLogout() {
  yield takeEvery(LOGOUT_REQUEST, logout)
}

export default function* rootSaga() {
    yield all([
      watchSignup(),
      watchLogin(),
      watchForget(),
      watchLogout()
    ])
  }