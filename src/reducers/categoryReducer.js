import {
    All_CATEGORY_REQUEST,
    All_CATEGORY_SUCCESS,
    All_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_RESET,
    NEW_CATEGORY_REQUEST,
    NEW_CATEGORY_SUCCESS,
    NEW_CATEGORY_RESET,
    NEW_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_RESET,
    DELETE_CATEGORY_FAIL, 
    SINGLE_CATEGORY_REQUEST,
    SINGLE_CATEGORY_SUCCESS,
    SINGLE_CATEGORY_FAIL,
    CLEAR_ERRORS
} from '../constants/categoryConstants.js';

export const categoryReducer = (state = { category: [] }, action) => {
    switch (action.type) {
        case All_CATEGORY_REQUEST:
            return {
                loading: true,
                category: [],
        };
        case All_CATEGORY_SUCCESS:
            return {
                loading: false,
                category: action.payload,
        };
        case All_CATEGORY_FAIL:
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

export const newcategoryReducer = (state = { category: {} }, action) => {
    switch (action.type) {
        case NEW_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                success:false
            };
            case NEW_CATEGORY_SUCCESS:
                return {
                  loading: false,
                  success: action.payload
                };
              case NEW_CATEGORY_FAIL:
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
              case NEW_CATEGORY_RESET:
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

export const deletecategory = (state = {}, action) => {
    switch (action.type) {
      case DELETE_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
          isDeleted: false
        };
      case DELETE_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_CATEGORY_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_CATEGORY_RESET:
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

export const updatecategoryReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
          isUpdated:false
        };
      case UPDATE_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case UPDATE_CATEGORY_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_CATEGORY_RESET:
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

export const singlecategoryReducer = (state = { singlecategory: [] }, action) => {
    switch (action.type) {
        case SINGLE_CATEGORY_REQUEST:
            return {
                loading: true,
                singlecategory: [],
        };
        case SINGLE_CATEGORY_SUCCESS:
            return {
                loading: false,
                singlecategory: action.payload,
        };
        case SINGLE_CATEGORY_FAIL:
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