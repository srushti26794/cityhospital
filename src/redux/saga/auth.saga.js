import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { forgetAPI, loginAPI, logoutAPI, signupAPI } from '../../common/api/auth.api'
import { FORGET_REQUEST, LOGGEDOUT_USER, LOGIN_REQUEST, SIGNUP_REQUEST } from '../ActionType';
import { loggedOutUser, loggedUser } from '../action/auth.action';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* signup(action) {
  try {
    const user = yield call(signupAPI, action.payload)
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
    console.log(user);
  } catch (e) {
    console.log(e);
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
    console.log(e);
  }
}

function* login(action){
  try {
    const user = yield call(loginAPI, action.payload.data)
    yield put(loggedUser(user.user))
    action.payload.callback("/")
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
    console.log(user);
  } catch (e) {
    console.log(e);
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

function* forget(action){
  try {
    const user = yield call(forgetAPI, action.payload)
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

function* logout(){
  try {
    const user = yield call(logoutAPI)
    yield put(loggedOutUser())
  } catch (error) {
    console.log(error);
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
  yield takeEvery(LOGGEDOUT_USER, logout)
}

export default function* rootSaga() {
    yield all([
      watchSignup(),
      watchLogin(),
      watchForget(),
      watchLogout()
    ])
  }