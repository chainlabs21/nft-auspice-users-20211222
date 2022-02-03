import { combineReducers, configureStore } from "@reduxjs/toolkit";

//reducers
import commonSlice from "./commonSlice";
import userSlice from "./userSlice";
import storeSlice from "./storeReducer";
import walletSlice from "./walletSlice";

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
