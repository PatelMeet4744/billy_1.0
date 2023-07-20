import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getrestaurant } from '../../../actions/restaurantAction';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import '../partner/fileupload.css'

const ManageRestaurant = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [indexNumber, setIndexnumber] = useState("");

    let indexNO = 0;
    const {
        restaurant,
        error,
        loading,
    } = useSelector((state) => state.restaurant);

    useEffect(() => {

        //   alert(indexNO);
        // dispatch(getrestaurant());
        // alert(JSON.stringify(restaurant[0].restaurantImage));
    }, []);

    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Restaurant Details</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body"><h6 style={{fontSize: 15, fontWeight:"bold"}}>Restaurant Details</h6>
                        <form className="pt-3">
                            {restaurant.map((item, index) => {
                                if (item.restaurantId == params.id) {
                                    // alert(item.restaurantId);
                                    indexNO = index;
                                    // alert(index);
                                }
                            }
                            )}<div style={{ display: 'flex' }}>
                                <a href={`http://${process.env.REACT_APP_IP}${restaurant[`${indexNO}`].restaurantImage}`} target="_blank"><img src={`http://${process.env.REACT_APP_IP}${restaurant[`${indexNO}`].restaurantImage}`} alt="Cuisines Banner" style={{ width: 400, height: 200}} /></a>

                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-6">

                                            <div className="form-group">
                                                <label>Name</label><br></br>
                                                <label style={{fontSize: 20, fontWeight:"bold"}}>{restaurant[indexNO].restaurantName}</label>
                                                {/* <input type="text" className="form-control form-control-lg" placeholder="Name" name="deliveryBoyName" value={restaurant[indexNO].restaurantName} readOnly /> */}
                                            </div>
                                            <div className="form-group">
                                                <label>Mobile Number</label><br></br>
                                                <label style={{fontSize: 20, fontWeight:"bold"}}>{restaurant[indexNO].restaurantContact}</label>
                                                {/* <input type="tel" className="form-control form-control-lg" pattern="[1-9]{1}[0-9]{9}" placeholder="Mobile Number" name="deliveryBoyContact" value={restaurant[indexNO].restaurantContact} readOnly /> */}
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Address</label><br></br>
                                                <label style={{fontSize: 20, fontWeight:"bold"}}>{restaurant[indexNO].restaurantAddress}</label>
                                                {/* <input type="tel" className="form-control form-control-lg" pattern="[1-9]{1}[0-9]{9}" placeholder="Mobile Number" name="deliveryBoyContact" value={restaurant[indexNO].restaurantAddress} readOnly /> */}
                                            </div>
                                            <div className="form-group">
                                                <label>City</label><br></br>
                                                <label style={{fontSize: 20, fontWeight:"bold"}}>{restaurant[indexNO].restaurantCity}</label>
                                                {/* <input type="tel" className="form-control form-control-lg" pattern="[1-9]{1}[0-9]{9}" placeholder="Mobile Number" name="deliveryBoyContact" value={restaurant[indexNO].restaurantCity} readOnly /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>



                        </form>
                    </div>
                    <div class="card-body"><h6>Owner Details</h6>
                        <form className="pt-3">
                            {restaurant.map((item, index) => {
                                if (item.restaurantId == params.id) {
                                    // alert(item.restaurantId);
                                    indexNO = index;
                                    // alert(index);
                                }
                            }
                            )}<div style={{ display: 'flex' }}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-6">

                                            <div className="form-group">
                                                <label>Owner Name</label><br></br>
                                                <label style={{fontSize: 20, fontWeight:"bold"}}>{restaurant[indexNO].ownerName}</label>
                                                {/* <input type="text" className="form-control form-control-lg" placeholder="Name" name="deliveryBoyName" value={restaurant[indexNO].ownerName} readOnly /> */}
                                            </div>
                                            <div className="form-group">
                                                <label>Owner ContactNo.</label><br></br>
                                                <label style={{fontSize: 20, fontWeight:"bold"}}>{restaurant[indexNO].ownerContact}</label>
                                                {/* <input type="tel" className="form-control form-control-lg" pattern="[1-9]{1}[0-9]{9}" placeholder="Mobile Number" name="deliveryBoyContact" value={restaurant[indexNO].ownerContact} readOnly /> */}
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label for="exampleInputMobilel3" required>Email ID</label><br></br>
                                                <label style={{fontSize: 20, fontWeight:"bold"}}>{restaurant[indexNO].ownerEmailID}</label>
                                                {/* <input type="tel" className="form-control form-control-lg" pattern="[1-9]{1}[0-9]{9}" placeholder="Mobile Number" name="deliveryBoyContact" value={restaurant[indexNO].ownerEmailID} readOnly /> */}
                                            </div>
                                            <div className="form-group">
                                                <label for="exampleInputMobilel3" required>City</label><br></br>
                                                <label style={{fontSize: 20, fontWeight:"bold"}}>{restaurant[indexNO].restaurantCity}</label>
                                                {/* <input type="tel" className="form-control form-control-lg" pattern="[1-9]{1}[0-9]{9}" placeholder="Mobile Number" name="deliveryBoyContact" value={restaurant[indexNO].restaurantCity} readOnly /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>



                        </form>
                    </div>

                    <div class="card-body"><h6>Documnet Details</h6>
                        <form className="pt-3">
                            {restaurant.map((item, index) => {
                                if (item.restaurantId == params.id) {
                                    // alert(item.restaurantId);
                                    indexNO = index;
                                    // alert(index);
                                }
                            }
                            )}<div style={{ display: 'flex' }}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-6">

                                            {<a href={`http://${process.env.REACT_APP_IP}${restaurant[indexNO].documents['gstCertificate']}`} style={{ textDecoration: 'none' }} target="_blank">
                                                <li className="file-item">
                                                    <i className="mdi mdi-file" />
                                                    <p style={{ color: 'black' }} className="ml-4">Gst Certificate</p>
                                                </li></a>
                                            }
                                            {<a href={`http://${process.env.REACT_APP_IP}${restaurant[indexNO].documents['fssaiCertificate']}`} style={{ textDecoration: 'none' }} target="_blank">
                                                <li className="file-item">
                                                    <i className="mdi mdi-file" />
                                                    <p style={{ color: 'black' }} className="ml-4">Fssai Certificate</p>
                                                </li></a>
                                            }
                                            {<a href={`http://${process.env.REACT_APP_IP}${restaurant[indexNO].documents['sampleBill']}`} style={{ textDecoration: 'none' }} target="_blank">
                                                <li className="file-item">
                                                    <i className="mdi mdi-file" />
                                                    <p style={{ color: 'black' }} className="ml-4">Sample Bill</p>
                                                </li></a>
                                            }
                                        </div>
                                        <div className="col-sm-6">
                                            {<a href={`http://${process.env.REACT_APP_IP}${restaurant[indexNO].documents['sampleMenu']}`} style={{ textDecoration: 'none' }} target="_blank">
                                                <li className="file-item">
                                                    <i className="mdi mdi-file" />
                                                    <p style={{ color: 'black' }} className="ml-4">Sample Menu</p>
                                                </li></a>
                                            }
                                            {<a href={`http://${process.env.REACT_APP_IP}${restaurant[indexNO].documents['ownerPan']}`} style={{ textDecoration: 'none' }} target="_blank">
                                                <li className="file-item">
                                                    <i className="mdi mdi-file" />
                                                    <p style={{ color: 'black' }} className="ml-4">Owner </p>
                                                </li></a>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>



                        </form>
                    </div>

                    <div class="card-body"><h6>Time Details</h6>
                        <form className="pt-3">
                            {restaurant.map((item, index) => {
                                if (item.restaurantId == params.id) {
                                    // alert(item.restaurantId);
                                    indexNO = index;
                                    // alert(index);
                                }
                            }
                            )}<div style={{ display: 'flex' }}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            {restaurant[indexNO].restaurantTiming['monday'][0] && <>
                                                <p>Monday</p>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <li className="file-item" style={{ marginTop: '-5px' }}>
                                                            <p style={{ color: 'black' }} className="ml-4">{restaurant[indexNO].restaurantTiming['monday'][0]}</p>
                                                        </li></div>
                                                    <div className="col-sm-6">
                                                        <li className="file-item" style={{ marginTop: '-5px' }}>
                                                            <p style={{ color: 'black' }} className="ml-4">{restaurant[indexNO].restaurantTiming['monday'][1]}</p>
                                                        </li></div>
                                                </div>
                                            </>
                                            }

                                            {restaurant[indexNO].restaurantTiming['wednesday'][0] && <>
                                                <p>Wednesday</p>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <li className="file-item" style={{ marginTop: '-5px' }}>
                                                            <p style={{ color: 'black' }} className="ml-4">{restaurant[indexNO].restaurantTiming['wednesday'][0]}</p>
                                                        </li></div>
                                                    <div className="col-sm-6">
                                                        <li className="file-item" style={{ marginTop: '-5px' }}>
                                                            <p style={{ color: 'black' }} className="ml-4">{restaurant[indexNO].restaurantTiming['wednesday'][1]}</p>
                                                        </li></div>
                                                </div>
                                            </>
                                            }

                                            {restaurant[indexNO].restaurantTiming['friday'][0] && <>
                                                <p>Friday</p>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <li className="file-item" style={{ marginTop: '-5px' }}>
                                                            <p style={{ color: 'black' }} className="ml-4">{restaurant[indexNO].restaurantTiming['friday'][0]}</p>
                                                        </li></div>
                                                    <div className="col-sm-6">
                                                        <li className="file-item" style={{ marginTop: '-5px' }}>
                                                            <p style={{ color: 'black' }} className="ml-4">{restaurant[indexNO].restaurantTiming['friday'][1]}</p>
                                                        </li></div>
                                                </div>
                                            </>
                                            }
                                            {restaurant[indexNO].restaurantTiming['sunday'][0] && <>
                                                <p>Sunday</p>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <li className="file-item" style={{ marginTop: '-5px' }}>
                                                            <p style={{ color: 'black' }} className="ml-4">{restaurant[indexNO].restaurantTiming['sunday'][0]}</p>
                                                        </li></div>
                                                    <div className="col-sm-6">
                                                        <li className="file-item" style={{ marginTop: '-5px' }}>
                                                            <p style={{ color: 'black' }} className="ml-4">{restaurant[indexNO].restaurantTiming['sunday'][1]}</p>
                                                        </li></div>
                                                </div>
                                            </>
                                            }
                                        </div>
                                        <div className="col-sm-6">
                                            {restaurant[indexNO].restaurantTiming['tuesday'][0] && <>
                                                <p>Tuesday</p>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <li className="file-item" style={{ marginTop: '-5px' }}>
                                                            <p style={{ color: 'black' }} className="ml-4">{restaurant[indexNO].restaurantTiming['tuesday'][0]}</p>
                                                        </li></div>
                                                    <div className="col-sm-6">
                                                        <li className="file-item" style={{ marginTop: '-5px' }}>
                                                            <p style={{ color: 'black' }} className="ml-4">{restaurant[indexNO].restaurantTiming['tuesday'][1]}</p>
                                                        </li></div>
                                                </div>
                                            </>
                                            }
                                            {restaurant[indexNO].restaurantTiming['thursday'][0] && <>
                                                <p>Thursday</p>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <li className="file-item" style={{ marginTop: '-5px' }}>
                                                            <p style={{ color: 'black' }} className="ml-4">{restaurant[indexNO].restaurantTiming['thursday'][0]}</p>
                                                        </li></div>
                                                    <div className="col-sm-6">
                                                        <li className="file-item" style={{ marginTop: '-5px' }}>
                                                            <p style={{ color: 'black' }} className="ml-4">{restaurant[indexNO].restaurantTiming['thursday'][1]}</p>
                                                        </li></div>
                                                </div>
                                            </>
                                            }
                                            {restaurant[indexNO].restaurantTiming['saturday'][0] && <>
                                                <p>Saturday</p>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <li className="file-item" style={{ marginTop: '-5px' }}>
                                                            <p style={{ color: 'black' }} className="ml-4">{restaurant[indexNO].restaurantTiming['saturday'][0]}</p>
                                                        </li></div>
                                                    <div className="col-sm-6">
                                                        <li className="file-item" style={{ marginTop: '-5px' }}>
                                                            <p style={{ color: 'black' }} className="ml-4">{restaurant[indexNO].restaurantTiming['saturday'][1]}</p>
                                                        </li></div>
                                                </div>
                                            </>
                                            }
                                        </div>
                                    </div>
                                </div>

                            </div>



                        </form>
                    </div>

                    <div class="card-body"><h6>Show Restaurant (Addon,AddExtra,Variants) Details</h6>
                        <form className="pt-3">
                            {restaurant.map((item, index) => {
                                if (item.restaurantId == params.id) {
                                    // alert(item.restaurantId);
                                    indexNO = index;
                                    // alert(index);
                                }
                            }
                            )}<div style={{ display: 'flex' }}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <Link to={`/admin/restaurant/managerestaurant/Addon/${restaurant[indexNO].restaurantId}`} style={{textDecoration: "none"}}>
                                            <li className="file-item">
                                                        <p style={{ color: 'black' }} className="ml-4">Show Addon</p>
                                                    </li>
                                            </Link>
                                        </div>
                                        <div className="col-sm-4">
                                        <Link to={`/admin/restaurant/managerestaurant/Addextra/${restaurant[indexNO].restaurantId}`} style={{textDecoration: "none"}}>
                                        <li className="file-item">
                                                    <p style={{ color: 'black' }} className="ml-4">Show AddExtra</p>
                                                </li>
                                        </Link>
                                        </div>
                                        <div className="col-sm-4">
                                        <Link to={`/admin/restaurant/managerestaurant/Variant/${restaurant[indexNO].restaurantId}`} style={{textDecoration: "none"}}>
                                        <li className="file-item">
                                                    <p style={{ color: 'black' }} className="ml-4">Show Variants</p>
                                                </li>
                                        </Link>
                                        </div>
                                    </div>
                                </div>

                            </div>



                        </form>
                    </div>

                    <div class="card-body"><h6>Show Restaurant (Banner) Details</h6>
                        <form className="pt-3">
                            {restaurant.map((item, index) => {
                                if (item.restaurantId == params.id) {
                                    // alert(item.restaurantId);
                                    indexNO = index;
                                    // alert(index);
                                }
                            }
                            )}<div style={{ display: 'flex' }}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <Link to={`/admin/restaurant/managerestaurant/Banner/${restaurant[indexNO].restaurantId}`} style={{textDecoration: "none"}}>
                                            <li className="file-item">
                                                        <p style={{ color: 'black' }} className="ml-4">Show Banners</p>
                                                    </li>
                                            </Link>
                                        </div>
                                        <div className="col-sm-6">
                                        <Link to={`/admin/restaurant/managerestaurant/Category/${restaurant[indexNO].restaurantId}`} style={{textDecoration: "none"}}>
                                        <li className="file-item">
                                                    <p style={{ color: 'black' }} className="ml-4">Show Category</p>
                                                </li>
                                        </Link>
                                        </div>
                                        
                                    </div>
                                </div>

                            </div>



                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageRestaurant;