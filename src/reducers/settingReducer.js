import {
    All_SETTING_REQUEST,
    All_SETTING_SUCCESS,
    All_SETTING_FAIL,
    UPDATE_SETTING_REQUEST,
    UPDATE_SETTING_SUCCESS,
    UPDATE_SETTING_FAIL,
    UPDATE_SETTING_RESET,
    CLEAR_ERRORS
} from '../constants/settingConstants.js';

export const settingReducer = (state = { setting: [] }, action) => {
    switch (action.type) {
        case All_SETTING_REQUEST:
            return {
                loading: true,
                setting: [],
            };
        case All_SETTING_SUCCESS:
            return {
                loading: false,
                setting: action.payload,
            };
        case All_SETTING_FAIL:
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

export const updateSetting = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_SETTING_REQUEST:
        return {
          ...state,
          loading: true,
          isUpdated: false,
        };
      case UPDATE_SETTING_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case UPDATE_SETTING_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_SETTING_RESET:
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