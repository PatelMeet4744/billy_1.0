import React, { useState, useEffect, version } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NEW_ADDON_RESET,UPDATE_ADDON_RESET } from "../../../constants/addOnConstants"
import { clearErrors, createaddon, getsingleaddon, updateaddon} from "../../../actions/addonAction"
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import Multiselect from 'multiselect-react-dropdown';

const ManageAddons = ({history}) => {

    const [addonname, setAddonname] = useState("");
    const [addontype, setAddontype] = useState("veg");
    const [addonprice, setAddonprice] = useState("");
    const [addonadditionalprice, setAddonadditionalprice] = useState("");
    const [addonfinalprice, setAddonfinalprice] = useState("");

    const [errors, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { newaddon, loading, error, success } = useSelector((state) => state.newaddon);
    const { singleaddon } = useSelector((state) => state.singleaddon);
    const { isUpdated } = useSelector((state) => state.updateaddon);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };

        if (singleaddon && singleaddon.addonId !== params.id) {
            dispatch(getsingleaddon(params.id));
          } else {
            setAddonname(singleaddon.addonName)
            setAddonprice(singleaddon.addonPrice)
            setAddontype(singleaddon.addonType)
            setAddonadditionalprice(singleaddon.addonAdditionalPrice)
            setAddonfinalprice(singleaddon.addonFinalPrice)
          }

        // if (id) {
        //     dispatch(getsingleaddon(params.id));
        //     // alert(JSON.stringify(singleaddon.addonPrice));
        //     setAddonname(singleaddon.addonName)
        //     setAddonprice(singleaddon.addonPrice)
        //     setAddontype(singleaddon.addonType)
        //     setAddonadditionalprice(singleaddon.addonAdditionalPrice)
        //     setAddonfinalprice(singleaddon.addonFinalPrice)
        //     // setAddon({ ...addon, addonType: singleaddon.addonType });
        //     // setAddon({ ...addon, addonPrice: singleaddon.addonPrice });
        //     // setAddon({ ...addon, addonAdditionalPrice: singleaddon.addonAdditionalPrice });
        //     // setAddon({ ...addon, addonFinalPrice: singleaddon.addonFinalPrice });
        // };

        if(isUpdated){
            swal({
                title: "Addon",
                text: "The Addon Update",
                icon: "info"
              });
            navigate('/partner/Addons');
            dispatch({type: UPDATE_ADDON_RESET});
        };
       
        if (success) {
            swal({
                title: "Addon",
                text: "The Addon Created Successfully",
                icon: "info"
              });
          navigate('/partner/Addons')
          dispatch({ type: NEW_ADDON_RESET });
        };
      }, [dispatch, alert, error, history, success,isUpdated,id,singleaddon]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!addonname || !addonprice || !addonadditionalprice || !addonfinalprice) {
            setError(true);
            return false;
        }
        
        const restaurantId = sessionStorage.getItem('restaurantId');
        const formData = new FormData();
        if(params.id){
        // formData.append('restaurant', restaurantId);
        formData.append('addonName', addonname);
        formData.append('addonType', addontype);
        formData.append('addonPrice', addonprice);
        formData.append('addonAdditionalPrice', addonadditionalprice);
        formData.append('addonFinalPrice', addonfinalprice);
        }else{
        formData.append('restaurant', restaurantId);
        formData.append('addonName', addonname);
        formData.append('addonType', addontype);
        formData.append('addonPrice', addonprice);
        formData.append('addonAdditionalPrice', addonadditionalprice);
        formData.append('addonFinalPrice', addonfinalprice);
        }
        if(params.id){
            dispatch(updateaddon(params.id,formData));
            // swal({
            //     title: "Question",
            //     text: "The Question Update",
            //     icon: "info"
            //   });
            // navigate('/admin/question');
            // dispatch({type: UPDATE_QUESTION_RESET});
        }else{
            dispatch(createaddon(formData));
        }
        
    }
    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Manage Addons</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                    <form className="pt-3" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="exampleInputName1">Name</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Name" name="addonName" value={addonname} onChange={(e) => setAddonname(e.target.value)} />
                                {errors && !addonname && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Name!</span>}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Addons Type</label>
                                <select class="form-control" name="addonType" id="exampleSelectGender" onChange={(e) => setAddontype(e.target.value )}>
                                   
                                {params.id ? <>{addontype == "veg" ? <option selected>veg</option>  :
                                   <option selected>non-veg</option>
                                   }
                                   {addontype == "veg" ? <></> : <option>veg</option>}
                                   {addontype == "non-veg" ? <></> : <option>non-veg</option>}</> : <><option>veg</option><option>non-veg</option></>}
                                   
                                    
                                    
                                </select>                            
                                {/* <input type="text" className="form-control form-control-lg" placeholder="Addons Type" value={""} name="questionName"/> */}
                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Addon Price</label>
                                <input type="number" min={0} className="form-control form-control-lg" placeholder="Addon Price" name="addonPrice" value={addonprice} onChange={(e) => setAddonprice(e.target.value)} />
                                {errors && !addonprice && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Price!</span>}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Addon Additional Price</label>
                                <input type="number" min={0} className="form-control form-control-lg" placeholder="Addon Additional Price" name="addonAdditionalPrice" value={addonadditionalprice} onChange={(e) => setAddonadditionalprice(e.target.value)} />
                                {errors && !addonadditionalprice && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Additional Price!</span>}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Addon Final Price</label>
                                <input type="number" min={0} className="form-control form-control-lg" placeholder="Addon Final Price" name="addonFinalPrice" value={addonfinalprice} onChange={(e) => setAddonfinalprice(e.target.value)} />
                                {errors && !addonfinalprice && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Final Price!</span>}
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

export default ManageAddons;