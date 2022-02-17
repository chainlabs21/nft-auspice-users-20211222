import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: null,
  loggedin: false
};
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    SET_ADDRESS(state, action) {
      state.address = action.payload;
    },
    SET_LOGIN(state, action){
      state.loggedin = true;
    },
    SET_LOGOUT(state, action){
      state.loggedin = false;
    }
  },
});

const { reducer, actions } = walletSlice;
export const { SET_ADDRESS, SET_LOGIN } = actions;
export default reducer;
