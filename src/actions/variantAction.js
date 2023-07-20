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

import axios from 'axios';

export const getvariant = (id) => async (dispatch) => {
    try {
        dispatch({ type: All_VARIANT_REQUEST });
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/variant?restaurant=${id}`, '', '');
        // alert(JSON.stringify(data.data))
        dispatch( { type: All_VARIANT_SUCCESS, payload: data.data})

    } catch (error) {
        dispatch({ type: All_VARIANT_FAIL, payload: error.response.data.message})
    }
};

// Create Category
export const createvariant = (variantData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_VARIANT_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/variant`, variantData, config);
      // alert(JSON.stringify(data.message))
      if(data.message === "Success")
      {
        dispatch({
          type: NEW_VARIANT_SUCCESS,
          payload: true,
        });
      }
      else{
        dispatch({
          type: NEW_VARIANT_FAIL,
          payload: "Someting Went Wrong",
        });
      }
      
    } catch (error) {
      dispatch({
        type: NEW_VARIANT_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Delete Category
export const deletevariant = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_VARIANT_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.delete(`http://${process.env.REACT_APP_IP}/api/variant/${id}`, '', config);
      if(data.message === "Success")
      {
        dispatch({
          type: DELETE_VARIANT_SUCCESS,
          payload: true,
        });
      }
      
    } catch (error) {
      dispatch({
        type: DELETE_VARIANT_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Update Category
export const updatevariant = (id, variantData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_VARIANT_REQUEST });
  
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const {data} = await axios.put(`http://${process.env.REACT_APP_IP}/api/variant/${id}`, variantData, config);
  
      if(data.message === "Success")
      {
        dispatch({
          type: UPDATE_VARIANT_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_VARIANT_FAIL,
        payload: error.response.data.message,
      });
    }
};

//Single Category
export const getsinglevariant = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_VARIANT_REQUEST });
  
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/variant/${id}`, '', config);
        
      if(data.message === "Success")
      {
        dispatch({
          type: SINGLE_VARIANT_SUCCESS,
          payload: data.data,
        });
      }
    } catch (error) {
        dispatch({ type: SINGLE_VARIANT_FAIL, payload: error.response.data.message})
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERRORS });
  };