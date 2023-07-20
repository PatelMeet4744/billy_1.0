import {
    All_ADDEXTRA_REQUEST,
    All_ADDEXTRA_SUCCESS,
    All_ADDEXTRA_FAIL,
    UPDATE_ADDEXTRA_REQUEST,
    UPDATE_ADDEXTRA_SUCCESS,
    UPDATE_ADDEXTRA_FAIL,
    UPDATE_ADDEXTRA_RESET,
    NEW_ADDEXTRA_REQUEST,
    NEW_ADDEXTRA_SUCCESS,
    NEW_ADDEXTRA_RESET,
    NEW_ADDEXTRA_FAIL,
    DELETE_ADDEXTRA_REQUEST,
    DELETE_ADDEXTRA_SUCCESS,
    DELETE_ADDEXTRA_RESET,
    DELETE_ADDEXTRA_FAIL, 
    SINGLE_ADDEXTRA_REQUEST,
    SINGLE_ADDEXTRA_SUCCESS,
    SINGLE_ADDEXTRA_FAIL,
    CLEAR_ERRORS
} from '../constants/addextraConstants.js';

export const addextraReducer = (state = { addextra: [] }, action) => {
    switch (action.type) {
        case All_ADDEXTRA_REQUEST:
            return {
                loading: true,
                addextra: [],
        };
        case All_ADDEXTRA_SUCCESS:
            return {
                loading: false,
                addextra: action.payload,
        };
        case All_ADDEXTRA_FAIL:
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

export const newaddextraReducer = (state = { addextra: {} }, action) => {
    switch (action.type) {
        case NEW_ADDEXTRA_REQUEST:
            return {
                ...state,
                loading: true,
                success:false
            };
            case NEW_ADDEXTRA_SUCCESS:
                return {
                  loading: false,
                  success: action.payload
                };
              case NEW_ADDEXTRA_FAIL:
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
              case NEW_ADDEXTRA_RESET:
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

export const deleteaddextra = (state = {}, action) => {
    switch (action.type) {
      case DELETE_ADDEXTRA_REQUEST:
        return {
          ...state,
          loading: true,
          isDeleted: false
        };
      case DELETE_ADDEXTRA_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_ADDEXTRA_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_ADDEXTRA_RESET:
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

export const updateaddextraReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_ADDEXTRA_REQUEST:
        return {
          ...state,
          loading: true,
          isUpdated:false
        };
      case UPDATE_ADDEXTRA_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case UPDATE_ADDEXTRA_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_ADDEXTRA_RESET:
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

export const singleaddextraReducer = (state = { singleaddextra: [] }, action) => {
    switch (action.type) {
        case SINGLE_ADDEXTRA_REQUEST:
            return {
                loading: true,
                singleaddextra: [],
        };
        case SINGLE_ADDEXTRA_SUCCESS:
            return {
                loading: false,
                singleaddextra: action.payload,
        };
        case SINGLE_ADDEXTRA_FAIL:
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