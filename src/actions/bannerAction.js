import {
    All_BANNER_REQUEST,
    All_BANNER_SUCCESS,
    All_BANNER_FAIL,
    DELETE_BANNER_REQUEST,
    DELETE_BANNER_SUCCESS,
    DELETE_BANNER_FAIL,
    DELETE_BANNER_RESET,
    CLEAR_ERRORS
} from '../constants/bannerConstants.js';
import axios from 'axios';

export const getbanner = (id) => async (dispatch) => {
    try{
        dispatch({ type: All_BANNER_REQUEST });

        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/banner?page=1&pageSize=10&restaurant=${id}`, '', '');
        
        dispatch( { type: All_BANNER_SUCCESS, payload: data.data})

    }catch (error){
        dispatch({ type: All_BANNER_FAIL, payload: error.response.data.message})
    }
};

// Delete Product
export const deletebanner = (id,bannerData) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_BANNER_REQUEST });
      
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/banner/${id}`, bannerData, config);
      // alert(JSON.stringify(data))
      if(data.message === "Success")
      {
        dispatch({
          type: DELETE_BANNER_SUCCESS,
          payload: true,
        });
      }
      
    } catch (error) {
      dispatch({
        type: DELETE_BANNER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};