import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    GET_USER_DATA(state, action) {
      state.userData = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { GET_USER_DATA } = actions;
export default reducer;
