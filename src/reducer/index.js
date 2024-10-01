import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";
import { jobReducer } from "./jobReducer";
import { reloadReducer } from "./reloadReducer";

const allReducer = combineReducers({
  searchReducer,
  jobReducer,
  reloadReducer,
  // other reducers
});

export default allReducer;
