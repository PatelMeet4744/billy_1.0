import {
    All_COUPONCODE_REQUEST,
    All_COUPONCODE_SUCCESS,
    All_COUPONCODE_FAIL,
    UPDATE_COUPONCODE_REQUEST,
    UPDATE_COUPONCODE_SUCCESS,
    UPDATE_COUPONCODE_FAIL,
    UPDATE_COUPONCODE_RESET,
    NEW_COUPONCODE_REQUEST,
    NEW_COUPONCODE_SUCCESS,
    NEW_COUPONCODE_RESET,
    NEW_COUPONCODE_FAIL,
    DELETE_COUPONCODE_REQUEST,
    DELETE_COUPONCODE_SUCCESS,
    DELETE_COUPONCODE_RESET,
    DELETE_COUPONCODE_FAIL, 
    SINGLE_COUPONCODE_REQUEST,
    SINGLE_COUPONCODE_SUCCESS,
    SINGLE_COUPONCODE_FAIL,
    CLEAR_ERRORS
} from '../constants/couponcodeConstants.js';
import axios from 'axios';

export const getcouponcode = (id) => async (dispatch) => {
    try {
        dispatch({ type: All_COUPONCODE_REQUEST });
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/couponCode`, '', '');
        // alert(JSON.stringify(data.data))
        dispatch( { type: All_COUPONCODE_SUCCESS, payload: data.data})

    } catch (error) {
        dispatch({ type: All_COUPONCODE_FAIL, payload: error.response.data.message})
    }
};

// Create Category
export const createcouponcode = (couponcodeData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_COUPONCODE_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/couponCode`, couponcodeData, config);
      // alert(JSON.stringify(data.message))
      if(data.message === "Success")
      {
        dispatch({
          type: NEW_COUPONCODE_SUCCESS,
          payload: true,
        });
      }
      else{
        dispatch({
          type: NEW_COUPONCODE_FAIL,
          payload: "Someting Went Wrong",
        });
      }
      
    } catch (error) {
      dispatch({
        type: NEW_COUPONCODE_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Delete Category
export const deletecouponcode = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_COUPONCODE_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.delete(`http://${process.env.REACT_APP_IP}/api/couponCode/${id}`, '', config);
      if(data.message === "Success")
      {
        dispatch({
          type: DELETE_COUPONCODE_SUCCESS,
          payload: true,
        });
      }
      
    } catch (error) {
      dispatch({
        type: DELETE_COUPONCODE_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Update Category
export const updatecouponcode = (id, couponcodeData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_COUPONCODE_REQUEST });
  
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const {data} = await axios.put(`http://${process.env.REACT_APP_IP}/api/couponCode/${id}`, couponcodeData, config);
  
      if(data.message === "Success")
      {
        dispatch({
          type: UPDATE_COUPONCODE_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_COUPONCODE_FAIL,
        payload: error.response.data.message,
      });
    }
};

//Single Category
export const getsinglecouponcode = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_COUPONCODE_REQUEST });
  
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/couponCode/${id}`, '', config);
        
      if(data.message === "Success")
      {
        dispatch({
          type: SINGLE_COUPONCODE_SUCCESS,
          payload: data.data,
        });
      }
    } catch (error) {
        dispatch({ type: SINGLE_COUPONCODE_FAIL, payload: error.response.data.message})
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERRORS });
  };