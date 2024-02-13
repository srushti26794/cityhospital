import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducer";
import { thunk } from "redux-thunk";
import createSagaMiddleware from 'redux-saga'
import { signupAPI } from "../common/api/auth.api";
import rootSaga from "./saga/auth.saga";
import { allSaga } from "./saga";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { auth } from "../firebase";

const persistConfig = {
    key: 'root',
    storage,
    whitelist : ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const saga = createSagaMiddleware()

const allMiddleware = [thunk, saga]

export const store = createStore(persistedReducer, applyMiddleware(...allMiddleware));

export const persistor = persistStore(store)

saga.run(allSaga)