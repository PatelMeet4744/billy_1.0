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
import axios from 'axios';

export const getaddextra = (id) => async (dispatch) => {
    try {
        dispatch({ type: All_ADDEXTRA_REQUEST });
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/addextra?restaurant=${id}`, '', '');
        // alert(JSON.stringify(data.data))
        dispatch( { type: All_ADDEXTRA_SUCCESS, payload: data.data})

    } catch (error) {
        dispatch({ type: All_ADDEXTRA_FAIL, payload: error.response.data.message})
    }
};

// Create Category
export const createaddextra = (addextraData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_ADDEXTRA_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/addextra`, addextraData, config);
      // alert(JSON.stringify(data.message))
      if(data.message === "Success")
      {
        dispatch({
          type: NEW_ADDEXTRA_SUCCESS,
          payload: true,
        });
      }
      else{
        dispatch({
          type: NEW_ADDEXTRA_FAIL,
          payload: "Someting Went Wrong",
        });
      }
      
    } catch (error) {
      dispatch({
        type: NEW_ADDEXTRA_FAIL,
        payload: error.response.data.message,
      });
    }
};


// Delete Category
export const deleteaddextra = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_ADDEXTRA_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.delete(`http://${process.env.REACT_APP_IP}/api/addextra/${id}`, '', config);
      if(data.message === "Success")
      {
        dispatch({
          type: DELETE_ADDEXTRA_SUCCESS,
          payload: true,
        });
      }
      
    } catch (error) {
      dispatch({
        type: DELETE_ADDEXTRA_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Update Category
export const updateaddextra = (id, addextraData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ADDEXTRA_REQUEST });
  
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const {data} = await axios.put(`http://${process.env.REACT_APP_IP}/api/addextra/${id}`, addextraData, config);
  
      if(data.message === "Success")
      {
        dispatch({
          type: UPDATE_ADDEXTRA_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_ADDEXTRA_FAIL,
        payload: error.response.data.message,
      });
    }
};

//Single Category
export const getsingleaddextra = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_ADDEXTRA_REQUEST });
  
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/addextra/${id}`, '', config);
        
      if(data.message === "Success")
      {
        dispatch({
          type: SINGLE_ADDEXTRA_SUCCESS,
          payload: data.data,
        });
      }
    } catch (error) {
        dispatch({ type: SINGLE_ADDEXTRA_FAIL, payload: error.response.data.message})
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
      dispatch({ type: CLEAR_ERRORS });
  };