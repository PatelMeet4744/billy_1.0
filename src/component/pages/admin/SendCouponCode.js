import React, { useState, useEffect, version } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";

const SendCouponCode = () => {

    const [dropcustomer_Data, setDropcustomer_Data] = useState([]);
    const [selectedcustomer_Data, setSelectedcustomer_Data] = useState([]);

    const dispatch = useDispatch();
    const {
      customer,
      error,
      loading,
    } = useSelector((state) => state.customer);
    let navigate = useNavigate();

    useEffect(() => {
        fetchCategory()
    }, []);

    const fetchCategory = async () => {
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          };
        const url = `http://${process.env.REACT_APP_IP}/api/customer`;
        try {
            const response = await fetch(url,config);
            const json = await response.json();
            let result_Output = json.data;
            setDropcustomer_Data(result_Output.map(value => ({
                customerEmailID: value.customerEmailID,
                customerName: value.customerName +" (" + value.customerEmailID +")"
            })))
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleCuisines = (e) => {
        const setdddata = e;
        setSelectedcustomer_Data("["+setdddata.map(item => "\""+item.customerEmailID+"\"").join(', ')+"]");
        // console.log(category)
        // alert(category);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(selectedcustomer_Data)

        const formData = new FormData()
        formData.append("CustomerEmailId",selectedcustomer_Data);
        
            const config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
        
            const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
            axios.defaults.headers.common["Authorization"] = token; swal({
                title: "Coupon Code",
                text: "Coupon Code Send Successfully",
                icon: "info",
              });
            
            const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/couponCode/SendCoupon`, formData, config);
           
            // return alert(JSON.stringify(data))
            // if(data.message === "Success")
            // {
            // }
    }
    return (
        <div>
            <div class="row">
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        {/* <h4 class="grid_title ml10 ml15">Send Coupon Code</h4> */}
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <form className="pt-3" onSubmit={handleSubmit}>
                                      
                                            <label for="exampleInputName1">Select User</label>
                                            <Multiselect
                                                displayValue="customerName"
                                                onKeyPressFn={function noRefCheck() { }}
                                                onRemove={(e) => handleCuisines(e)}
                                                onSelect={(e) => handleCuisines(e)}
                                                onSearch={function noRefCheck() { }}
                                                options={dropcustomer_Data}
                                                showArrow
                                                Multiselect={false}
                                                allowSelectAll={true}
                                                showCheckbox
                                            />
                                        
                                        <br />
                                        <div className="mt-3">
                                            {/* <a type="submit" style={{color:'white'}} class="btn btn-primary mr-2" name="submit">Submit</a> */}
                                            <button type="submit" style={{ height: '40px' }} class="btn btn-primary mr-2" name="submit">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        </div>
    );
};

export default SendCouponCode;