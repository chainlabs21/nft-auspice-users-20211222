import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  walletAddress: "",
  mHeaderPopup: false,
};

const storeSlice = createSlice({
  name: "storeReducer",
  initialState,
  reducers: {
    setAllPopupOff: (state, action) => {
      state.mHeaderPopup = false;
    },

    setMHeaderPopup: (state, action) => {
      state.mHeaderPopup = true;
    },

    setConnect: (state, action) => {
      state.walletAddress = action.payload;
    },
  },
});
const { reducer, actions } = storeSlice;

export const { setAllPopupOff, setMHeaderPopup, setConnect } = actions;
export default reducer;
