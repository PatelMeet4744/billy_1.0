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
import axios from "axios";

//Retrive Setting Amount By Restaurant
export const getsetting = (id) => async (dispatch) => {
    try {
      dispatch({ type: All_SETTING_REQUEST })
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/setting?page=1&pageSize=10&restaurant=${id}`, '', '');

      dispatch({ type: All_SETTING_SUCCESS, payload: data.data[0] })
  
    } catch (error) {
      dispatch({ type: All_SETTING_FAIL, payload: error.response.data.message })
    }
};

// Update Setting
export const updatesetting = (settingId, settingData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SETTING_REQUEST });
  
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const {data} = await axios.put(`http://${process.env.REACT_APP_IP}/api/setting/${settingId}`, settingData, config);

      if(data.message === "Success")
      {
        dispatch({
          type: UPDATE_SETTING_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_SETTING_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};