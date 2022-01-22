import { configureStore, createSlice } from "@reduxjs/toolkit";

const store = createSlice({
  name: "storeReducer",
  initialState: {
    walletAddress: "",
		mHeaderPopup: false,
		myinfo : null
		, address : null
  },
  reducers: {
		setmyinfo : (state, action)=>{
			return {
				... state  
				, myinfo : action.payload
			}
		}
    , setAllPopupOff: (state, action) => {
      return {
        ...state,
        mHeaderPopup: false,
      };
    },
    setMHeaderPopup: (state, action) => {
      return {
        ...state,
        mHeaderPopup: true,
      };
    },
    setConnect: (state, action) => {
      return {
        ...state,
        walletAddress: action.payload,
      };
		},
		setaddress : ( state , action )=>{
			return {
				... state
				, address : action.payload
			}
		}
  },
});

export const { setAllPopupOff, setMHeaderPopup, setConnect 
	, setmyinfo
	, setaddress
} = store.actions;
export default configureStore({ reducer: store.reducer });
