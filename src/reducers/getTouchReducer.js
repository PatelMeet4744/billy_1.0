import {
   All_GETTOUCH_REQUEST,
   All_GETTOUCH_SUCCESS,
   All_GETTOUCH_FAIL,
   NEW_GETTOUCH_REQUEST,
   NEW_GETTOUCH_SUCCESS,
   NEW_GETTOUCH_FAIL,
   NEW_GETTOUCH_RESET,
   CLEAR_ERRORS
} from '../constants/getTouchConstants.js';

export const getTouchReducer = (state = { gettouch: [] }, action) => {
    switch (action.type) {
        case All_GETTOUCH_REQUEST:
            return {
                loading: true,
                gettouch: [],
        };
        case All_GETTOUCH_SUCCESS:
            return {
                loading: false,
                gettouch: action.payload,
        };
        case All_GETTOUCH_FAIL:
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

export const newGetTouchReducer = (state = { newgettouch: {} }, action) => {
    switch (action.type) {
        case NEW_GETTOUCH_REQUEST:
            return {
                ...state,
                loading: true,
                success:false
            };
            case NEW_GETTOUCH_SUCCESS:
                return {
                  loading: false,
                  success: action.payload
                };
              case NEW_GETTOUCH_FAIL:
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
              case NEW_GETTOUCH_RESET:
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