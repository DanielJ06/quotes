import { combineReducers } from "redux";

import bookmarkReducer from "./bookmark/reducer";

export default combineReducers({
	bookmark: bookmarkReducer,
});
