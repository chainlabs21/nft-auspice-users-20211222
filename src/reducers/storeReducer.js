/*import { createSlice } from "@reduxjs/toolkit";

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

*/


import produce from "immer";

export const initialState = {
  mHeaderPopup: false
};

export const SET_ALL_POPUP_OFF = "SET_ALL_POPUP_OFF"
export const SET_MHEADER_POPUP = "SET_MHEADER_POPUP"

const storeReducer = (state = initialState, action)=>{
  switch (action.type){
    case SET_ALL_POPUP_OFF:
      return produce(state, (draft)=> {
        draft.mHeaderPopup = action.payload.value;
      })
    case SET_MHEADER_POPUP:
      return produce(state, (draft)=>{
        draft.mHeaderPopup = action.payload.value;
      })
    default:
      return state;
  }
};

export default storeReducer;
