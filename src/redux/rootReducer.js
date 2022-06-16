import { combineReducers } from "redux";
import blogReducer from "./reducers";

const rootReducer = combineReducers({
  info: blogReducer,
});

export default rootReducer;
