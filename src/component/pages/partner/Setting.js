import React, { useState, useEffect } from 'react';
import { json, useNavigate } from "react-router-dom";
import { clearErrors,getsetting,updatesetting  } from "../../../actions/settingAction";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_SETTING_RESET } from "../../../constants/settingConstants";
import swal from 'sweetalert';

const Setting = ({ history }) => {

    const [errors, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setting,error } = useSelector((state) => state.setting);
    const { isUpdated } = useSelector((state) => state.updatesetting);
    const restaurantId = sessionStorage.getItem('restaurantId');

    const [cartMinPrice, setCartMinPrice] = useState(setting.settingCartMinPrice || '');
    const [cartMinPriceMessage, setCartMinPriceMessage] = useState(setting.settingCartMinPriceMessage || '');
    const [deliveryCharge, setDeliveryCharge] = useState(setting.settingDeliveryCharge || '');
    const [gst, setGst] = useState(setting.settingGst || '');

    useEffect(() => {
        dispatch(getsetting(restaurantId));
       
        if (isUpdated) {
            swal({
                title: "Setting",
                text: "Setting Data Updated Sucssessfully",
                icon: "info"
        });
        navigate('/partner/Setting');
        dispatch({ type: UPDATE_SETTING_RESET });
        }
        
      }, [dispatch, alert, error, history, isUpdated]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!cartMinPrice || !cartMinPriceMessage || !deliveryCharge || !gst) {
            setError(true);
            return false;
        }
        const formData = new FormData();
        formData.append('settingCartMinPrice', cartMinPrice);
        formData.append('settingCartMinPriceMessage', cartMinPriceMessage);
        formData.append('settingDeliveryCharge', deliveryCharge);
        formData.append('settingGst', gst);
        const id = setting.settingId;
        dispatch(updatesetting(id,formData));
    }
    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Setting</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <form className="pt-3" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="exampleInputName1">Cart Min Price</label>
                                <input type="text" className="form-control form-control-lg" placeholder="cart Min Price" name="cartMinPrice" value={cartMinPrice} onChange={(e) => setCartMinPrice(e.target.value)} />
                                {errors && !cartMinPrice && <span className="invalid-input" style={{ color: 'red' }}>Please Enter cart Min Price!</span>}
                            </div>

                            <div className="form-group">
                                <label for="exampleInputName1">Cart Min Price Message</label>
                                <input type="text" className="form-control form-control-lg" placeholder="cart Min Price Message" name="cartMinPriceMessage" value={cartMinPriceMessage} onChange={(e) => setCartMinPriceMessage(e.target.value)} />
                                {errors && !cartMinPriceMessage && <span className="invalid-input" style={{ color: 'red' }}>Please Enter cart Min Price Message!</span>}
                            </div>

                            <div className="form-group">
                                <label for="exampleInputName1">Delivery Charge</label>
                                <input type="text" className="form-control form-control-lg" placeholder="delivery Charge" name="deliveryCharge" value={deliveryCharge} onChange={(e) => setDeliveryCharge(e.target.value)} />
                                {errors && !deliveryCharge && <span className="invalid-input" style={{ color: 'red' }}>Please Enter delivery Charge!</span>}
                            </div>

                            <div className="form-group">
                                <label for="exampleInputName1">Gst</label>
                                <input type="text" className="form-control form-control-lg" placeholder="gst" name="gst" value={gst} onChange={(e) => setGst(e.target.value)} />
                                {errors && !gst && <span className="invalid-input" style={{ color: 'red' }}>Please Enter gst!</span>}
                            </div>
                            
                            <div className="mt-3">
                                <button type="submit" style={{height:'40px'}} class="btn btn-primary mr-2" name="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;