import React, { useState, useEffect, version } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NEW_VARIANT_RESET,UPDATE_VARIANT_RESET } from "../../../constants/variantConstants"
import { clearErrors, createvariant, getsinglevariant, updatevariant} from "../../../actions/variantAction"
import { useParams } from "react-router-dom";
import swal from 'sweetalert';

const ManageVariant = ({history}) => {

    const [variantName, setVariantName] = useState("");
    const [variantuom, setVariantuom] = useState("");
    const [variantPrice, setVariantPrice] = useState("");
    const [variantSalesPrice, setVariantSalesPrice] = useState("");

    const [errors, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { newvariant, loading, error, success } = useSelector((state) => state.newvariant);
    const { singlevariant } = useSelector((state) => state.singlevariant);
    const { isUpdated } = useSelector((state) => state.updatevariant);
    const params = useParams();
    const id = params.id;
    
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };

        if (singlevariant && singlevariant.variantId !== params.id) {
            dispatch(getsinglevariant(params.id));
          } else {
            setVariantName(singlevariant.variantName)
            setVariantuom(singlevariant.variantuom)
            setVariantPrice(singlevariant.variantPrice)
            setVariantSalesPrice(singlevariant.variantSalesPrice)
          }

        // if (id) {
        //     dispatch(getsinglevariant(params.id));
        //     // alert(JSON.stringify(singleaddon.addonPrice));
        //     setVariantName(singlevariant.variantName)
        //     setVariantuom(singlevariant.variantuom)
        //     setVariantPrice(singlevariant.variantPrice)
        //     setVariantSalesPrice(singlevariant.variantSalesPrice)
        // };

        if(isUpdated){
            swal({
                title: "Variant",
                text: "The Variant Update",
                icon: "info"
              });
            navigate('/partner/Variant');
            dispatch({type: UPDATE_VARIANT_RESET});
        };
       
        if (success) {
            swal({
                title: "Variant",
                text: "The Variant Created Successfully",
                icon: "info"
              });
          navigate('/partner/variant')
          dispatch({ type: NEW_VARIANT_RESET });
        };
      }, [dispatch, alert, error, history, success,isUpdated,id,singlevariant]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!variantName || !variantuom || !variantPrice || !variantSalesPrice) {
            setError(true);
            return false;
        }
        const restaurantId = sessionStorage.getItem('restaurantId');
        const formData = new FormData();
        if(params.id){
            // formData.append('restaurant', restaurantId);
            formData.append('variantName', variantName);
            formData.append('variantuom', variantuom);
            formData.append('variantPrice', variantPrice);
            formData.append('variantSalesPrice', variantSalesPrice);
            }else{
            formData.append('restaurant', restaurantId);
            formData.append('variantName', variantName);
            formData.append('variantuom', variantuom);
            formData.append('variantPrice', variantPrice);
            formData.append('variantSalesPrice', variantSalesPrice);
            }
        if(params.id){
            dispatch(updatevariant(params.id,formData));
        }else{
            dispatch(createvariant(formData));
        }
        
    }

    return (
        <div class="row">
        <h4 class="grid_title ml10 ml15">Manage Variant</h4>
        <div class="col-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                <form className="pt-3" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="exampleInputName1">Name</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Name" name="variantName" value={variantName} onChange={(e) => setVariantName(e.target.value)} />
                                {errors && !variantName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Name!</span>}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Variant UOM</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Variant UOM" name="variantuom" value={variantuom} onChange={(e) => setVariantuom(e.target.value)} />
                                {errors && !variantuom && <span className="invalid-input" style={{ color: 'red' }}>Please Enter UOM!</span>}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Variant Price</label>
                                <input type="number" min={0} className="form-control form-control-lg" placeholder="Variant Price" name="variantPrice" value={variantPrice} onChange={(e) => setVariantPrice(e.target.value)} />
                                {errors && !variantPrice && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Price!</span>}
                            </div>
                            <div className="form-group">
                                <label for="exampleInputName1">Variant Sales Price</label>
                                <input type="number" min={0} className="form-control form-control-lg" placeholder="Variant Sales Price" name="variantSalesPrice" value={variantSalesPrice} onChange={(e) => setVariantSalesPrice(e.target.value)} />
                                {errors && !variantSalesPrice && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Sales Price!</span>}
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

export default ManageVariant;