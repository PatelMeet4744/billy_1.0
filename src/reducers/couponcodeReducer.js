import {
    All_COUPONCODE_REQUEST,
    All_COUPONCODE_SUCCESS,
    All_COUPONCODE_FAIL,
    UPDATE_COUPONCODE_REQUEST,
    UPDATE_COUPONCODE_SUCCESS,
    UPDATE_COUPONCODE_FAIL,
    UPDATE_COUPONCODE_RESET,
    NEW_COUPONCODE_REQUEST,
    NEW_COUPONCODE_SUCCESS,
    NEW_COUPONCODE_RESET,
    NEW_COUPONCODE_FAIL,
    DELETE_COUPONCODE_REQUEST,
    DELETE_COUPONCODE_SUCCESS,
    DELETE_COUPONCODE_RESET,
    DELETE_COUPONCODE_FAIL, 
    SINGLE_COUPONCODE_REQUEST,
    SINGLE_COUPONCODE_SUCCESS,
    SINGLE_COUPONCODE_FAIL,
    CLEAR_ERRORS
} from '../constants/couponcodeConstants.js';

export const couponcodeReducer = (state = { couponcode: [] }, action) => {
    switch (action.type) {
        case All_COUPONCODE_REQUEST:
            return {
                loading: true,
                couponcode: [],
        };
        case All_COUPONCODE_SUCCESS:
            return {
                loading: false,
                couponcode: action.payload,
        };
        case All_COUPONCODE_FAIL:
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

export const newcouponcodeReducer = (state = { couponcode: {} }, action) => {
    switch (action.type) {
        case NEW_COUPONCODE_REQUEST:
            return {
                ...state,
                loading: true,
                success:false
            };
            case NEW_COUPONCODE_SUCCESS:
                return {
                  loading: false,
                  success: action.payload
                };
              case NEW_COUPONCODE_FAIL:
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
              case NEW_COUPONCODE_RESET:
                return {
                  ...state,
                  success: false,
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

export const deletecouponcode = (state = {}, action) => {
    switch (action.type) {
      case DELETE_COUPONCODE_REQUEST:
        return {
          ...state,
          loading: true,
          isDeleted: false
        };
      case DELETE_COUPONCODE_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_COUPONCODE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_COUPONCODE_RESET:
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

export const updatecouponcodeReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_COUPONCODE_REQUEST:
        return {
          ...state,
          loading: true,
          isUpdated:false
        };
      case UPDATE_COUPONCODE_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case UPDATE_COUPONCODE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_COUPONCODE_RESET:
        return {
          ...state,
          isUpdated: false,
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

export const singlecouponcodeReducer = (state = { singlecouponcode: [] }, action) => {
    switch (action.type) {
        case SINGLE_COUPONCODE_REQUEST:
            return {
                loading: true,
                singlecouponcode: [],
        };
        case SINGLE_COUPONCODE_SUCCESS:
            return {
                loading: false,
                singlecouponcode: action.payload,
        };
        case SINGLE_COUPONCODE_FAIL:
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