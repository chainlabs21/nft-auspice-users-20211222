/*import { combineReducers, configureStore } from "@reduxjs/toolkit";

//reducers
import userSlice from "./userSlice";
import storeSlice from "./storeReducer";
import walletSlice from "./walletSlice";
import commonSlice from "./commonSlice";

const slices = {
  common: commonSlice,
  user: userSlice,
  store: storeSlice,
  wallet: walletSlice,
};
const reducers = combineReducers(slices);

const createStore = () => {
  const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== "production",
  });
  return store;
};
export default createStore;
*/
import reducer from "./reducer";
import { createStore } from "redux";
export const store = createStore(reducer);