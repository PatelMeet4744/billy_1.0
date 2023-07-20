import React, { useState, useEffect } from 'react';
import { json, useNavigate } from "react-router-dom";
import { clearErrors, getsinglerestaurant, updatesinglerestaurant } from "../../../actions/restaurantAction";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_SINGLE_RESTAURANT_RESET } from "../../../constants/restaurantConstants";
import swal from 'sweetalert';

const Profile = ({ history }) => {

    const [errors, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { singlerestaurant, error } = useSelector((state) => state.singelrestaurant);
    const { isUpdated } = useSelector((state) => state.updatesinglerestaurant);
    const [restaurant, setRestaurant] = useState({
        restaurantName: singlerestaurant.restaurantName || '',
        restaurantContact: singlerestaurant.restaurantContact || '',
        restaurantImage: singlerestaurant.restaurantImage || '',
    });
    // alert(JSON.stringify(singlerestaurant));

    useEffect(() => {
        const restaurantId = sessionStorage.getItem('restaurantId');

        // setRAmount(referralamount.referralAmount);    
        dispatch(getsinglerestaurant(restaurantId));

        if (isUpdated) {
            swal({
                title: "Restaurant",
                text: "Restaurant Profile Updated Sucssessfully",
                icon: "info"
            });
            dispatch({ type: UPDATE_SINGLE_RESTAURANT_RESET });
        }
        // setRAmount(referralamount);
        // alert(referralamounts);

    }, [dispatch, alert, error, history, isUpdated]);

    const handleChange = (e) => {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
    }

    const handlephoto = (e) => {
        // if(e.target.files[0].name.split('.').pop() == "png")
        setRestaurant({ ...restaurant, restaurantImage: e.target.files[0] })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const restaurantId = sessionStorage.getItem('restaurantId');
        // return console.warn(restaurant.restaurantImage);
        if (!restaurant.restaurantName || !restaurant.restaurantContact || !restaurant.restaurantImage) {
            setError(true);
            return false;
        }
        const formData = new FormData();
        formData.append('restaurantName', restaurant.restaurantName);
        formData.append('restaurantContact', restaurant.restaurantContact);
        formData.append('restaurantImage', restaurant.restaurantImage);
        dispatch(updatesinglerestaurant(restaurantId, formData));
    }
    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Profile</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <form className="pt-3" onSubmit={handleSubmit}>

                        <div class="row">
                            <div class="col-6">
                            <img src={`http://${process.env.REACT_APP_IP}${restaurant.restaurantImage}`} alt="CuisinesImage" style={{ width: 400, height: 180 }} />
                            </div>
                            <div class="col-6"><div className="form-group">
                                <label for="exampleInputName1">Restaurant Name</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Name" name="restaurantName" value={restaurant.restaurantName} onChange={(e) => handleChange(e)} />
                                {errors && !restaurant.restaurantName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Name!</span>}
                            </div>

                            <div className="form-group">
                                <label for="exampleInputName1">Restaurant Contact</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Name" name="restaurantContact" value={restaurant.restaurantContact} onChange={(e) => handleChange(e)} />
                                {errors && !restaurant.restaurantContact && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Contact!</span>}
                            </div></div>
                        </div>
                            

                            <div className="file-card">
                                <div className="file-inputs">
                                    {/* <input type="file" /> */}
                                    <input className="InputField form-control form-control-lg" type="file" placeholder="gstCertificate" name="gstCertificate" onChange={(e) => handlephoto(e)} />
                                    <button className="dfds">

                                        <i className="mdi mdi-plus menu-icon" />
                                        {/* <FontAwesomeIcon icon={faPlus} /> */}
                                        Upload
                                    </button>
                                </div>
                            </div>{errors && !restaurant.restaurantImage && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Restaurant Image!</span>}
                            
                            <div className="mt-3">
                                {/* <a type="submit" style={{color:'white'}} class="btn btn-primary mr-2" name="submit">Submit</a> */}
                                <button type="submit" style={{ height: '40px' }} class="btn btn-primary mr-2" name="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;