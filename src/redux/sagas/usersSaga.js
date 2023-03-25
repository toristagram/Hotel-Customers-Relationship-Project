import { takeEvery, call, put } from "redux-saga/effects";
import {
  GET_ACCOUNTS_SUCCESS,
  SHOW_NOTIFICATION,
} from "../actions/usersActions";
import { accountsRef } from "../../firebase";

export function* getAccounts() {
  try {
    const snapshot = yield call(accountsRef.once, "value");
    const data = snapshot.val();
    const accounts = Object.keys(data).map((id) => ({ id, ...data[id] }));
    yield put(GET_ACCOUNTS_SUCCESS(accounts));
  } catch (error) {
    yield put(SHOW_NOTIFICATION(error.message));
  }
}

export function* watchUsersSaga() {
  yield takeEvery("GET_ACCOUNTS", getAccounts);
}
