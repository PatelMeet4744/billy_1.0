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
import axios from 'axios';


export const getcategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: All_CATEGORY_REQUEST });
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/category?restaurant=${id}`, '', '');
        
        dispatch( { type: All_CATEGORY_SUCCESS, payload: data.data})

    } catch (error) {
        dispatch({ type: All_CATEGORY_FAIL, payload: error.response.data.message})
    }
};

// Create Category
export const createcategory = (categoryData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_CATEGORY_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/category`, categoryData, config);
      // alert(JSON.stringify(data.message))
      if(data.message === "Success")
      {
        dispatch({
          type: NEW_CATEGORY_SUCCESS,
          payload: true,
        });
      }
      else{
        dispatch({
          type: NEW_CATEGORY_FAIL,
          payload: "Someting Went Wrong",
        });
      }
      
    } catch (error) {
      dispatch({
        type: NEW_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Delete Category
export const deletecategory = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_CATEGORY_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.delete(`http://${process.env.REACT_APP_IP}/api/category/${id}`, '', config);
      if(data.message === "Success")
      {
        dispatch({
          type: DELETE_CATEGORY_SUCCESS,
          payload: true,
        });
      }
      
    } catch (error) {
      dispatch({
        type: DELETE_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Update Category
export const updatecategory = (id, categoryData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_CATEGORY_REQUEST });
  
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const {data} = await axios.put(`http://${process.env.REACT_APP_IP}/api/category/${id}`, categoryData, config);
  
      if(data.message === "Success")
      {
        dispatch({
          type: UPDATE_CATEGORY_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_CATEGORY_FAIL,
        payload: error.response.data.message,
      });
    }
};

//Single Category
export const getsinglecategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_CATEGORY_REQUEST });
  
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/category/${id}`, '', config);
        
      if(data.message === "Success")
      {
        dispatch({
          type: SINGLE_CATEGORY_SUCCESS,
          payload: data.data,
        });
      }
    } catch (error) {
        dispatch({ type: SINGLE_CATEGORY_FAIL, payload: error.response.data.message})
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERRORS });
  };