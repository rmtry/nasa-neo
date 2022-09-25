import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";
import Thunk from "redux-thunk";
import rootReducer from "./reducers/root-reducer";

const middleware = applyMiddleware(Thunk);

export const store = createStore(rootReducer, compose(middleware)) as any;
export const persistor = persistStore(store);
