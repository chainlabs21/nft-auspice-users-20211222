import { configureStore, createSlice } from "@reduxjs/toolkit";

const store = createSlice({
  name: "storeReducer",
  initialState: {
    walletAddress: "",
  },
  reducers: {
    setAllPopupOff: (state, action) => {
      return {
        ...state,
        headerPopup: false,
      };
    },

    setConnect: (state, action) => {
      return {
        ...state,
        walletAddress: action.payload,
      };
    },
  },
});

export const { setAllPopupOff, setConnect } = store.actions;
export default configureStore({ reducer: store.reducer });
