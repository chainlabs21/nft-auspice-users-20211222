import produce from "immer";

export const initialState = {
  userData: null
  , isloggedin: false
  , walletAddress: null
  , walletType: null
};

export const SET_USER_DATA = "SET_USER_DATA"
export const SET_LOGIN = "SET_LOGIN"
export const SET_ADDRESS = "SET_ADDRESS"
export const SET_WALLET_TYPE = "SET_WALLET_TYPE"

const userReducer = (state = initialState, action)=>{
  switch (action.type){
    case SET_USER_DATA:
      return produce(state, (draft)=> {
        draft.userData = action.payload.value;
      })
    case SET_LOGIN:
      return produce(state, (draft)=>{
        draft.isloggedin = action.payload.value;
      })
    case SET_ADDRESS:
      return produce(state, (draft)=>{
        draft.walletAddress = action.payload.value;
      })
      case SET_WALLET_TYPE:
        return produce(state, (draft)=>{
          draft.walletType = action.payload.value;
        })
    default:
      return state;
  }
};

export default userReducer;
