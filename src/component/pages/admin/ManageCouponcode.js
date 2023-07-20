import React, { useState, useEffect, version } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NEW_COUPONCODE_RESET,UPDATE_COUPONCODE_RESET } from "../../../constants/couponcodeConstants"
import { clearErrors, createcouponcode, getsinglecouponcode, updatecouponcode} from "../../../actions/couponcodeAction"
import { useParams } from "react-router-dom";
import swal from 'sweetalert';

const ManageCouponcode = ({history}) => {
    const [couponCodeName, setCouponCodeName] = useState("");
    const [couponCodeType, setCouponCodeType] = useState("p");
    const [couponCodeValue, setCouponCodeValue] = useState("");
    const [couponCodeCartMinValue, setCouponCodeCartMinValue] = useState("");
    const [couponCodeExpiredon, setCouponCodeExpiredon] = useState("");

    const [errors, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { newcouponcode, loading, error, success } = useSelector((state) => state.newcouponcode);
    const { singlecouponcode } = useSelector((state) => state.singlecouponcode);
    const { isUpdated } = useSelector((state) => state.updatecouponcode);
    const params = useParams();
    const id = params.id;

    // function formatDate(date = new Date()) {
    //     var day, month, year;
      
    //     year = date.getFullYear();
    //     month = date.getMonth() + 1;
    //     day = date.getDate();
        
    //     if (month < 10) {
    //       month = '0' + month;
    //     }
      
    //     if (day < 10) {
    //       day = '0' + day;
    //     }
        
    //     return day + '/' + month + '/' + year;
    //   }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };

        if(!isUpdated){
            if (singlecouponcode && singlecouponcode.couponCodeId !== params.id) {
                dispatch(getsinglecouponcode(params.id));
              } else {
                setCouponCodeName(singlecouponcode.couponCodeName)
                setCouponCodeType(singlecouponcode.couponCodeType)
                setCouponCodeValue(singlecouponcode.couponCodeValue)
                setCouponCodeCartMinValue(singlecouponcode.couponCodeCartMinValue)
                setCouponCodeExpiredon(singlecouponcode.couponCodeExpiredon.slice(0,10))
              }

        // if (id) {
        //     dispatch(getsinglecouponcode(params.id));
        //     setCouponCodeName(singlecouponcode.couponCodeName)
        //     setCouponCodeType(singlecouponcode.couponCodeType)
        //     setCouponCodeValue(singlecouponcode.couponCodeValue)
        //     setCouponCodeCartMinValue(singlecouponcode.couponCodeCartMinValue)
        //     setCouponCodeExpiredon(singlecouponcode.couponCodeExpiredon.slice(0,10))
        // };
        }

        if (isUpdated) {
            swal({
                title: "Coupon Code",
                text: "The Coupon Code Update",
                icon: "info"
            });
            navigate('/admin/couponcode');
            dispatch({ type: UPDATE_COUPONCODE_RESET });
        };

        if (success) {
            swal({
                title: "Coupon Code",
                text: "The Coupon Code Created Successfully",
                icon: "info"
            });
            navigate('/admin/couponcode')
            dispatch({ type: NEW_COUPONCODE_RESET });
        };
        // const myDate = new Date(couponCodeExpiredon);
        // // var ddmmyyyy = formatDate(couponCodeExpiredon);
        // alert(myDate.toLocaleDateString('en-GB')); 
        // setCouponCodeExpiredon(myDate.toLocaleDateString('en-GB')); 
        // alert(couponCodeExpiredon)
    }, [dispatch, alert, error, history, success, isUpdated, id,singlecouponcode]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!couponCodeName || !couponCodeType || !couponCodeValue || !couponCodeCartMinValue || !couponCodeExpiredon) {
            setError(true);
            return false;
        }

        const formData = new FormData();
        if (params.id) {
            formData.append('couponCodeName', couponCodeName);
            formData.append('couponCodeType', couponCodeType);
            formData.append('couponCodeValue', couponCodeValue);
            formData.append('couponCodeCartMinValue', couponCodeCartMinValue);
            formData.append('couponCodeExpiredon', couponCodeExpiredon);
        } else {
            formData.append('couponCodeName', couponCodeName);
            formData.append('couponCodeType', couponCodeType);
            formData.append('couponCodeValue', couponCodeValue);
            formData.append('couponCodeCartMinValue', couponCodeCartMinValue);
            formData.append('couponCodeExpiredon', couponCodeExpiredon);
        }

        // return alert(formData.get("couponCodeExpiredon"))

        if (params.id) {
            dispatch(updatecouponcode(params.id, formData));
        } else {
            dispatch(createcouponcode(formData));
        }

    }

    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Manage Coupon Code</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                    <form className="pt-3" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="exampleInputName1">Name</label>
                                <input type="text" className="form-control form-control-lg" placeholder="couponCodeName" name="couponCodeName" value={couponCodeName} onChange={(e) => setCouponCodeName(e.target.value)} />
                                {errors && !couponCodeName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Name!</span>}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Coupon Code Type</label>

                                <select class="form-control" onChange={(e) => setCouponCodeType(e.target.value)}>
                                    <option selected={couponCodeType == "p" ? true : false} value="p">Percentage</option>
                                    <option selected={couponCodeType == "f" ? true : false} value="f">fixed</option>
                                   </select>

                                {/* <select class="form-control" name="couponCodeType" id="exampleSelectGender" onChange={(e) => setAddextraType(e.target.value )}>
                                   
                                {params.id ? <>{addextraType == "veg" ? <option selected>veg</option>  :
                                   <option selected>non-veg</option>
                                   }
                                   {addextraType == "veg" ? <></> : <option>veg</option>}
                                   {addextraType == "non-veg" ? <></> : <option>non-veg</option>}</> : <><option>veg</option><option>non-veg</option></>}
                                   
                                    
                                    
                                </select>                             */}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">couponCodeValue</label>
                                <input type="number" min={0} className="form-control form-control-lg" placeholder="couponCodeValue" name="couponCodeValue" value={couponCodeValue} onChange={(e) => setCouponCodeValue(e.target.value)} />
                                {errors && !couponCodeValue && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Price!</span>}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Coupon Code Cart Min Value</label>
                                <input type="number" min={0} className="form-control form-control-lg" placeholder="couponCodeCartMinValue" name="couponCodeCartMinValue" value={couponCodeCartMinValue} onChange={(e) => setCouponCodeCartMinValue(e.target.value)} />
                                {errors && !couponCodeCartMinValue && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Coupon Code Cart Min Value!</span>}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Coupon Code Expiredon</label>
                                <input type="Date" className="form-control form-control-lg" placeholder="couponCodeExpiredon" name="couponCodeExpiredon" value={couponCodeExpiredon} onChange={(e) => setCouponCodeExpiredon(e.target.value)} />
                                {errors && !couponCodeExpiredon && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Coupon Code Expiredon!</span>}
                            </div>
                            <div className="mt-3">
                                {/* <a type="submit" style={{color:'white'}} class="btn btn-primary mr-2" name="submit">Submit</a> */}
                                <button type="submit" style={{height:'40px'}} class="btn btn-primary mr-2" name="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageCouponcode;