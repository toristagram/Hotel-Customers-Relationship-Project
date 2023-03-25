import { takeEvery, put } from "redux-saga/effects";
import { GET_ROOMS_SUCCESS, SHOW_NOTIFICATION } from "../actions/roomsActions";
import { roomsRef } from "../../firebase";

function* getRooms() {
  try {
    const snapshot = yield roomsRef.once("value");
    const rooms = snapshot.val();
    yield put(GET_ROOMS_SUCCESS(rooms));
  } catch (error) {
    yield put(SHOW_NOTIFICATION(error.message));
  }
}

export function* watchRoomsSaga() {
  yield takeEvery("GET_ROOMS", getRooms);
}
