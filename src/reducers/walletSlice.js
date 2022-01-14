import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: null,
};
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    SET_ADDRESS(state, action) {
      state.address = action.payload;
    },
  },
});

const { reducer, actions } = walletSlice;
export const { SET_ADDRESS } = actions;
export default reducer;
