import {
    All_BANNER_REQUEST,
    All_BANNER_SUCCESS,
    All_BANNER_FAIL,
    DELETE_BANNER_REQUEST,
    DELETE_BANNER_SUCCESS,
    DELETE_BANNER_FAIL,
    DELETE_BANNER_RESET,
    CLEAR_ERRORS
} from '../constants/bannerConstants.js';

export const bannerReducer = (state = { banner: []}, action) => {
    switch (action.type) {
         case All_BANNER_REQUEST:
             return {
                 loading: true,
                 banner: [],
         };
         case All_BANNER_SUCCESS:
             return {
                 loading: false,
                 banner: action.payload,
         };
         case All_BANNER_FAIL:
             return {
                 loading: false,
                 error: action.payload,
         };
         case CLEAR_ERRORS:
             return {
                 ...state,
                 error: null,
         };
         default:
             return state
    }
 };

 export const deletebannerReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_BANNER_REQUEST:
        return {
          ...state,
          loading: true,
          isDeleted:false
        };
      case DELETE_BANNER_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_BANNER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_BANNER_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };