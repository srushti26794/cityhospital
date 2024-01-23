import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { forgetAPI, loginAPI, signupAPI } from '../../common/api/auth.api'
import { FORGET_REQUEST, LOGIN_REQUEST, SIGNUP_REQUEST } from '../ActionType';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* signup(action) {
  try {
    const user = yield call(signupAPI, action.payload)
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

function* login(action){
  try {
    const user = yield call(loginAPI, action.payload)
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
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

function* watchSignup() {
  yield takeEvery(SIGNUP_REQUEST, signup)
}

function* watchLogin() {
  yield takeEvery(LOGIN_REQUEST,login)
}

function* watchForget() {
  yield takeEvery(FORGET_REQUEST ,forget)
}

export default function* rootSaga() {
    yield all([
      watchSignup(),
      watchLogin(),
      watchForget()
    ])
  }