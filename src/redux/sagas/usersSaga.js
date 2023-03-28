import { takeEvery, put } from "redux-saga/effects";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LOGIN_SUCCESS, SHOW_NOTIFICATION } from "../actions/usersActions";
import { accountsRef, auth } from "../../firebase";
import { ref, onValue } from "firebase/database";

export function* userLogIn(action) {
  try {
    const userCredential = yield signInWithEmailAndPassword(
      auth,
      action.username,
      action.password
    );
    const accountRef = ref(accountsRef, userCredential.user.uid);
    const snapshot = yield onValue(accountRef);
    const account = snapshot.val();
    yield put(LOGIN_SUCCESS(account));
  } catch (error) {
    yield put(SHOW_NOTIFICATION(error.message));
  }
}

export const userLogOut = () => {
  return async () => {
    try {
      await auth.signOut();
      put({ type: "LOGOUT" });
    } catch (error) {
      put(SHOW_NOTIFICATION(error.message));
    }
  };
};

export function* watchUsersSaga() {
  yield takeEvery("LOGIN", userLogIn);
}
