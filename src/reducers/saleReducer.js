import produce from "immer";

export const initialState = {
  saleInfo:{}
};

export const SET_SALE_INFO = "SET_SALE_INFO"
export const SET_LOGIN = "SET_LOGIN"
export const SET_ADDRESS = "SET_ADDRESS"

const userReducer = (state = initialState, action)=>{
  switch (action.type){
    case SET_SALE_INFO:
      return produce(state, (draft)=> {
        draft.saleInfo[action.payload.key] = action.payload.value
      })

    default:
      return state;
  }
};

export default userReducer;
