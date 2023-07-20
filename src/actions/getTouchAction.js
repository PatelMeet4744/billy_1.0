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
import axios from 'axios';

export const getgetTouch = () => async (dispatch) => {
    try{
        dispatch({ type: All_GETTOUCH_REQUEST });
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/getTouch`, '', '');

        dispatch( { type: All_GETTOUCH_SUCCESS, payload: data.data})
    }catch (error)
    {
        dispatch({type: All_GETTOUCH_FAIL,payload: error.response.data.message})
    }
};

// Create Question
export const createGetTocuh = (getTocuhData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_GETTOUCH_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/getTouch`, getTocuhData, config);
      // alert(JSON.stringify(data.message))
      if(data.message === "Success")
      {
        dispatch({
          type: NEW_GETTOUCH_SUCCESS,
          payload: true,
        });
      }
      else{
        dispatch({
          type: NEW_GETTOUCH_FAIL,
          payload: "Someting Went Wrong",
        });
      }
      
    } catch (error) {
      dispatch({
        type: NEW_GETTOUCH_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};