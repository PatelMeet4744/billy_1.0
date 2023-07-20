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
import axios from 'axios';

export const getaddon = (id) => async (dispatch) => {
    try {
        dispatch({ type: All_ADDON_REQUEST });
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/addon?restaurant=${id}`, '', '');
        // alert(JSON.stringify(data.data))
        dispatch( { type: All_ADDON_SUCCESS, payload: data.data})

    } catch (error) {
        dispatch({ type: All_ADDON_FAIL, payload: error.response.data.message})
    }
};

// Create Category
export const createaddon = (addonData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_ADDON_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/addon`, addonData, config);
      // alert(JSON.stringify(data.message))
      if(data.message === "Success")
      {
        dispatch({
          type: NEW_ADDON_SUCCESS,
          payload: true,
        });
      }
      else{
        dispatch({
          type: NEW_ADDON_FAIL,
          payload: "Someting Went Wrong",
        });
      }
      
    } catch (error) {
      dispatch({
        type: NEW_ADDON_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Delete Category
export const deleteaddon = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_ADDON_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.delete(`http://${process.env.REACT_APP_IP}/api/addon/${id}`, '', config);
      if(data.message === "Success")
      {
        dispatch({
          type: DELETE_ADDON_SUCCESS,
          payload: true,
        });
      }
      
    } catch (error) {
      dispatch({
        type: DELETE_ADDON_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Update Category
export const updateaddon = (id, addonData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ADDON_REQUEST });
  
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const {data} = await axios.put(`http://${process.env.REACT_APP_IP}/api/addon/${id}`, addonData, config);
  
      if(data.message === "Success")
      {
        dispatch({
          type: UPDATE_ADDON_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_ADDON_FAIL,
        payload: error.response.data.message,
      });
    }
};

//Single Category
export const getsingleaddon = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_ADDON_REQUEST });
  
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/addon/${id}`, '', config);
        
      if(data.message === "Success")
      {
        dispatch({
          type: SINGLE_ADDON_SUCCESS,
          payload: data.data,
        });
      }
    } catch (error) {
        dispatch({ type: SINGLE_ADDON_FAIL, payload: error.response.data.message})
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERRORS });
  };