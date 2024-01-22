import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { signupAPI } from '../../common/api/auth.api'
import { SIGNUP_REQUEST } from '../ActionType';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* signup(action) {
    console.log('hi');
  try {
    const user = yield call(signupAPI, action.payload)
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* watchSignup() {
  yield takeEvery(SIGNUP_REQUEST, signup)
}

export default function* rootSaga() {
    yield all([
      watchSignup()
    ])
  }