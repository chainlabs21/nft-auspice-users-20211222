import produce from "immer";

export const initialState = {
  marketFilter: {
    status :{
    }
    , price:{
      min: 0
      , max: 0
    }
    , category: 'all'
  }
};

export const SET_STATUS_FILTER = "SET_STATUS_FILTER"
export const SET_PRICE_FILTER = "SET_PRICE_FILTER"
export const SET_CATEGORY = "SET_CATEGORY"
export const RESET_FILTER = "RESET_FILTER"

const filterReducer = (state = initialState, action)=>{
  switch (action.type){
    case RESET_FILTER:
      return produce(state, (draft)=>{
        console.log('RESET')
        draft.marketFilter={status :{
          buyNow: false
          , onAuction: false
          , new: false
          , hasOffers: false
        }
        , price:{
          min: 0
          , max: 0
        }}
      })
    case SET_STATUS_FILTER:
      return produce(state, (draft)=> {
        draft.marketFilter.status[action.payload.key] = draft.marketFilter.status[action.payload.key]?false:true;
        //
      })
    case SET_PRICE_FILTER:
      return produce(state, (draft)=>{
        draft.marketFilter.price.min = action.payload.min;
        draft.marketFilter.price.max = action.payload.max;
      })
    case SET_CATEGORY:
      return produce(state,(draft)=>{
        draft.marketFilter.category = action.payload.value;
      })
    default:
      return state;
  }
};

export default filterReducer;

