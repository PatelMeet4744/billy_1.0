import {
    All_ADDON_REQUEST,
    All_ADDON_SUCCESS,
    All_ADDON_FAIL,
    UPDATE_ADDON_REQUEST,
    UPDATE_ADDON_SUCCESS,
    UPDATE_ADDON_FAIL,
    UPDATE_ADDON_RESET,
    NEW_ADDON_REQUEST,
    NEW_ADDON_SUCCESS,
    NEW_ADDON_RESET,
    NEW_ADDON_FAIL,
    DELETE_ADDON_REQUEST,
    DELETE_ADDON_SUCCESS,
    DELETE_ADDON_RESET,
    DELETE_ADDON_FAIL, 
    SINGLE_ADDON_REQUEST,
    SINGLE_ADDON_SUCCESS,
    SINGLE_ADDON_FAIL,
    CLEAR_ERRORS
} from '../constants/addOnConstants.js';

export const addOnReducer = (state = { addOn: [] }, action) => {
    switch (action.type) {
        case All_ADDON_REQUEST:
            return {
                loading: true,
                addOn: [],
        };
        case All_ADDON_SUCCESS:
            return {
                loading: false,
                addOn: action.payload,
        };
        case All_ADDON_FAIL:
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

export const newaddonReducer = (state = { addOn: {} }, action) => {
    switch (action.type) {
        case NEW_ADDON_REQUEST:
            return {
                ...state,
                loading: true,
                success:false
            };
            case NEW_ADDON_SUCCESS:
                return {
                  loading: false,
                  success: action.payload
                };
              case NEW_ADDON_FAIL:
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
              case NEW_ADDON_RESET:
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

export const deleteaddon = (state = {}, action) => {
    switch (action.type) {
      case DELETE_ADDON_REQUEST:
        return {
          ...state,
          loading: true,
          isDeleted: false
        };
      case DELETE_ADDON_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_ADDON_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_ADDON_RESET:
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

export const updateaddonReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_ADDON_REQUEST:
        return {
          ...state,
          loading: true,
          isUpdated:false
        };
      case UPDATE_ADDON_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case UPDATE_ADDON_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_ADDON_RESET:
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

export const singleaddonReducer = (state = { singleaddon: [] }, action) => {
    switch (action.type) {
        case SINGLE_ADDON_REQUEST:
            return {
                loading: true,
                singleaddon: [],
        };
        case SINGLE_ADDON_SUCCESS:
            return {
                loading: false,
                singleaddon: action.payload,
        };
        case SINGLE_ADDON_FAIL:
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