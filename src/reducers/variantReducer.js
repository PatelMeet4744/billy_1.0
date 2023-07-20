import {
    All_VARIANT_REQUEST,
    All_VARIANT_SUCCESS,
    All_VARIANT_FAIL,
    UPDATE_VARIANT_REQUEST,
    UPDATE_VARIANT_SUCCESS,
    UPDATE_VARIANT_FAIL,
    UPDATE_VARIANT_RESET,
    NEW_VARIANT_REQUEST,
    NEW_VARIANT_SUCCESS,
    NEW_VARIANT_RESET,
    NEW_VARIANT_FAIL,
    DELETE_VARIANT_REQUEST,
    DELETE_VARIANT_SUCCESS,
    DELETE_VARIANT_RESET,
    DELETE_VARIANT_FAIL, 
    SINGLE_VARIANT_REQUEST,
    SINGLE_VARIANT_SUCCESS,
    SINGLE_VARIANT_FAIL,
    CLEAR_ERRORS
} from '../constants/variantConstants.js';

export const variantReducer = (state = { variant: [] }, action) => {
    switch (action.type) {
        case All_VARIANT_REQUEST:
            return {
                loading: true,
                variant: [],
        };
        case All_VARIANT_SUCCESS:
            return {
                loading: false,
                variant: action.payload,
        };
        case All_VARIANT_FAIL:
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

export const newvariantReducer = (state = { variant: {} }, action) => {
    switch (action.type) {
        case NEW_VARIANT_REQUEST:
            return {
                ...state,
                loading: true,
                success:false
            };
            case NEW_VARIANT_SUCCESS:
                return {
                  loading: false,
                  success: action.payload
                };
              case NEW_VARIANT_FAIL:
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
              case NEW_VARIANT_RESET:
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

export const deletevariant = (state = {}, action) => {
    switch (action.type) {
      case DELETE_VARIANT_REQUEST:
        return {
          ...state,
          loading: true,
          isDeleted: false
        };
      case DELETE_VARIANT_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_VARIANT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_VARIANT_RESET:
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

export const updatevariantReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_VARIANT_REQUEST:
        return {
          ...state,
          loading: true,
          isUpdated:false
        };
      case UPDATE_VARIANT_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case UPDATE_VARIANT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_VARIANT_RESET:
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

export const singlevariantReducer = (state = { singlevariant: [] }, action) => {
    switch (action.type) {
        case SINGLE_VARIANT_REQUEST:
            return {
                loading: true,
                singlevariant: [],
        };
        case SINGLE_VARIANT_SUCCESS:
            return {
                loading: false,
                singlevariant: action.payload,
        };
        case SINGLE_VARIANT_FAIL:
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