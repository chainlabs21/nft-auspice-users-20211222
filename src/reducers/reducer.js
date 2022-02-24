import { combineReducers } from "redux";
import { createSelectorHook } from "react-redux";
import commonReducer from "./commonSlice"
import storeReducer from "./storeReducer"
import userReducer from "./userReducer"
import filterReducer from "./filterReducer"

const reducer = combineReducers({
    common: commonReducer
    , store: storeReducer
    , user: userReducer
    , filter: filterReducer
});
export const useSelector = createSelectorHook();
export default reducer;