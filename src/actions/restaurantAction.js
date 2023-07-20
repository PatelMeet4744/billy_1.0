import {
    All_RESTAURANT_REQUEST,
    All_RESTAURANT_SUCCESS,
    All_RESTAURANT_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    SINGLE_RESTAURANT_REQUEST,
    SINGLE_RESTAURANT_SUCCESS,
    SINGLE_RESTAURANT_FAIL,
    UPDATE_SINGLE_RESTAURANT_REQUEST,
    UPDATE_SINGLE_RESTAURANT_SUCCESS,
    UPDATE_SINGLE_RESTAURANT_FAIL,
    UPDATE_SINGLE_RESTAURANT_RESET,
    CLEAR_ERRORS
} from '../constants/restaurantConstants'
import axios from "axios"

export const getrestaurant = () => async (dispatch) => {
    try {
      dispatch({ type: All_RESTAURANT_REQUEST })
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/restaurant?page=1&pageSize=10`, '', '');
      // console.table(JSON.stringify(data))
      // return alert(JSON.stringify(data));
      dispatch({ type: All_RESTAURANT_SUCCESS, payload: data.data })
  
    } catch (error) {
      dispatch({ type: All_RESTAURANT_FAIL, payload: error.response.data.message })
    }
};

export const restaurantlogin = (ownerEmailID, ownerPassword) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/restaurant/login`, {ownerEmailID,ownerPassword}, config);

        // alert(JSON.stringify(data))
        
        if(data.data.message === "Invalid Email ID")
        {
            dispatch({ type: LOGIN_FAIL, payload: "Invalid Email Id"})
        }else{
          if(data.data.message === "The status is deactive"){
            dispatch({ type: LOGIN_FAIL, payload: "Your Account is Deactive"})
          }else{
            if(data.data.message === "Invalid Password"){
              dispatch({ type: LOGIN_FAIL, payload: "Invalid Password"})
          }
          else{
              const id = JSON.stringify(data.data.restaurant.restaurantId).split('"');
              sessionStorage.setItem("restaurantId",id[1]);
              sessionStorage.setItem("restaurant", JSON.stringify(data.data.restaurant));
              sessionStorage.setItem("x-auth-token", data.data.token);
              dispatch({ type: LOGIN_SUCCESS, payload: data.data})
          }
          }
        }

        
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message})
    }
};

// Update Password
export const updatePassword = (restaurantId,ownerPassword,newpassword,confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });

      const formData = new FormData();
        formData.append('restaurantId', restaurantId);
        formData.append('ownerPassword', ownerPassword);
        formData.append('newpassword', newpassword);
        formData.append('confirmPassword', confirmPassword);

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/changePassword`, formData, config);
      // alert(JSON.stringify(data));
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.message });
    } catch (error) {
      alert(error.response.data.message);
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Forgot Password
export const forgotPassword = (formData) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/restaurant/forgotpassword/forgotPassword/forgotpassword`, formData, config);
    // return alert(JSON.stringify(data))
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (formData) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/restaurant/password/reset`, formData, config);
    // return alert(JSON.stringify(data.message))
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getsinglerestaurant = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_RESTAURANT_REQUEST })
    
    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/restaurant/${id}`, '', '');
    // console.table(JSON.stringify(data))
    // alert(JSON.stringify(data));
    dispatch({ type: SINGLE_RESTAURANT_SUCCESS, payload: data.data })

  } catch (error) {
    dispatch({ type: SINGLE_RESTAURANT_FAIL, payload: error.response.data.message })
  }
};

// Update Question
export const updatesinglerestaurant = (id, restaurnatData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SINGLE_RESTAURANT_REQUEST });

    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    };

    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const {data} = await axios.put(`http://${process.env.REACT_APP_IP}/api/restaurant/${id}`, restaurnatData, config);
    // return alert(JSON.stringify(data));
    if(data.message === "Success")
    {
      dispatch({
        type: UPDATE_SINGLE_RESTAURANT_SUCCESS,
        payload: true,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_SINGLE_RESTAURANT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};