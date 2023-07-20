import React, { useState, useEffect, version } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NEW_ADDEXTRA_RESET,UPDATE_ADDEXTRA_RESET } from "../../../constants/addextraConstants"
import { clearErrors, createaddextra, getsingleaddextra, updateaddextra} from "../../../actions/addextraAction"
import { useParams } from "react-router-dom";
import swal from 'sweetalert';

const ManageAddExtras = ({history}) => {
    const [addextraName, setAddextraName] = useState("");
    const [addextraType, setAddextraType] = useState("veg");
    const [addextraPrice, setAddextraPrice] = useState("");
    const [addextraAdditionalPrice, setAddextraAdditionalPrice] = useState("");
    const [addextraFinalPrice, setAddextraFinalPrice] = useState("");

    const [errors, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { newaddextra, loading, error, success } = useSelector((state) => state.newaddextra);
    const { singleaddextra } = useSelector((state) => state.singleaddextra);
    const { isUpdated } = useSelector((state) => state.updateaddextra);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };

        if (singleaddextra && singleaddextra.addextraId !== params.id) {
            dispatch(getsingleaddextra(params.id));
          } else {
            setAddextraName(singleaddextra.addextraName)
            setAddextraPrice(singleaddextra.addextraPrice)
            setAddextraType(singleaddextra.addextraType)
            setAddextraAdditionalPrice(singleaddextra.addextraAdditionalPrice)
            setAddextraFinalPrice(singleaddextra.addextraFinalPrice)
          }

        // if (id) {
        //     dispatch(getsingleaddextra(params.id));
        //     // alert(JSON.stringify(singleaddextra.addextraName));
        //     setAddextraName(singleaddextra.addextraName)
        //     setAddextraPrice(singleaddextra.addextraPrice)
        //     setAddextraType(singleaddextra.addextraType)
        //     setAddextraAdditionalPrice(singleaddextra.addextraAdditionalPrice)
        //     setAddextraFinalPrice(singleaddextra.addextraFinalPrice)
        //     // setAddon({ ...addon, addonType: singleaddon.addonType });
        //     // setAddon({ ...addon, addonPrice: singleaddon.addonPrice });
        //     // setAddon({ ...addon, addonAdditionalPrice: singleaddon.addonAdditionalPrice });
        //     // setAddon({ ...addon, addonFinalPrice: singleaddon.addonFinalPrice });
        // };

        if(isUpdated){
            swal({
                title: "Add Extra",
                text: "The Add Extra Update",
                icon: "info"
              });
            navigate('/partner/AddExtras');
            dispatch({type: UPDATE_ADDEXTRA_RESET});
        };
       
        if (success) {
            swal({
                title: "Add Extra",
                text: "The Add Extra Created Successfully",
                icon: "info"
              });
          navigate('/partner/AddExtras')
          dispatch({ type: NEW_ADDEXTRA_RESET });
        };
      }, [dispatch, alert, error, history, success,isUpdated,id,singleaddextra]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!addextraName || !addextraPrice || !addextraAdditionalPrice || !addextraFinalPrice) {
            setError(true);
            return false;
        }
        
        const restaurantId = sessionStorage.getItem('restaurantId');
        const formData = new FormData();
        if(params.id){
        // formData.append('restaurant', restaurantId);
        formData.append('addextraName', addextraName);
        formData.append('addextraType', addextraType);
        formData.append('addextraPrice', addextraPrice);
        formData.append('addextraAdditionalPrice', addextraAdditionalPrice);
        formData.append('addextraFinalPrice', addextraFinalPrice);
        }else{
        formData.append('restaurant', restaurantId);
        formData.append('addextraName', addextraName);
        formData.append('addextraType', addextraType);
        formData.append('addextraPrice', addextraPrice);
        formData.append('addextraAdditionalPrice', addextraAdditionalPrice);
        formData.append('addextraFinalPrice', addextraFinalPrice);
        }
        if(params.id){
            dispatch(updateaddextra(params.id,formData));
        }else{
            dispatch(createaddextra(formData));
        }
        
    }
    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Manage Add Extra</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                    <form className="pt-3" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="exampleInputName1">Name</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Name" name="addextraName" value={addextraName} onChange={(e) => setAddextraName(e.target.value)} />
                                {errors && !addextraName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Name!</span>}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Add Extra Type</label>
                                <select class="form-control" name="addextraType" id="exampleSelectGender" onChange={(e) => setAddextraType(e.target.value )}>
                                   
                                {params.id ? <>{addextraType == "veg" ? <option selected>veg</option>  :
                                   <option selected>non-veg</option>
                                   }
                                   {addextraType == "veg" ? <></> : <option>veg</option>}
                                   {addextraType == "non-veg" ? <></> : <option>non-veg</option>}</> : <><option>veg</option><option>non-veg</option></>}
                                   
                                    
                                    
                                </select>                            
                                {/* <input type="text" className="form-control form-control-lg" placeholder="Addons Type" value={""} name="questionName"/> */}
                                {/* {errors && !question.questionName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Question!</span>} */}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Add Extra Price</label>
                                <input type="number" min={0} className="form-control form-control-lg" placeholder="Add Extra Price" name="addextraPrice" value={addextraPrice} onChange={(e) => setAddextraPrice(e.target.value)} />
                                {errors && !addextraPrice && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Price!</span>}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Add Extra Additional Price</label>
                                <input type="number" min={0} className="form-control form-control-lg" placeholder="Add Extra Additional Price" name="addextraAdditionalPrice" value={addextraAdditionalPrice} onChange={(e) => setAddextraAdditionalPrice(e.target.value)} />
                                {errors && !addextraAdditionalPrice && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Additional Price!</span>}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Addon Final Price</label>
                                <input type="number" min={0} className="form-control form-control-lg" placeholder="Addon Final Price" name="addextraFinalPrice" value={addextraFinalPrice} onChange={(e) => setAddextraFinalPrice(e.target.value)} />
                                {errors && !addextraFinalPrice && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Final Price!</span>}
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

export default ManageAddExtras;