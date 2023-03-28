import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./actions/reducers/rootReducer";
import { watchUsersSaga } from "./sagas/usersSaga";
import { watchRoomsSaga } from "./sagas/roomsSaga";
import thunk from "redux-thunk";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));

sagaMiddleware.run(watchUsersSaga);
sagaMiddleware.run(watchRoomsSaga);

export default store;
