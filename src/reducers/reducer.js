import { combineReducers } from "redux";
import { createSelectorHook } from "react-redux";
import commonReducer from "./commonSlice"
import storeReducer from "./storeReducer"
import userReducer from "./userReducer"
import filterReducer from "./filterReducer"
import saleReducer from "./saleReducer"

const reducer = combineReducers({
    common  : commonReducer
    , store : storeReducer
    , user  : userReducer
    , filter: filterReducer
    , sale  :  saleReducer
});
export const useSelector = createSelectorHook();
export default reducer;