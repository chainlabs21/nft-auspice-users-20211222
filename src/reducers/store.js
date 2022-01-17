import { combineReducers, configureStore } from "@reduxjs/toolkit";

//reducers
import userSlice from "./userSlice";
import storeSlice from "./storeReducer";
import walletSlice from "./walletSlice";

const slices = { user: userSlice, store: storeSlice, wallet: walletSlice };
const reducers = combineReducers(slices);

const createStore = () => {
  const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== "production",
  });
  return store;
};
export default createStore;