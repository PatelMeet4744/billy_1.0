import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NEW_CATEGORY_RESET,UPDATE_CATEGORY_RESET } from "../../../constants/categoryConstants"
import { clearErrors, createcategory, getsinglecategory, updatecategory} from "../../../actions/categoryAction"
import { useParams } from "react-router-dom";
import swal from 'sweetalert';

const ManageCategory = ({ history }) => {

    const [category, setCategory] = useState({
        categoryName: ""
    });
    const [errors, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { newcategory, loading, error, success } = useSelector((state) => state.newcategory);
    const { singlecategory } = useSelector((state) => state.singlecategory);
    const { isUpdated } = useSelector((state) => state.updatecategory);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };

        if (singlecategory && singlecategory.categoryId !== params.id) {
            dispatch(getsinglecategory(params.id));
          } else {
            setCategory({ ...category, categoryName: singlecategory.categoryName });
          }

        // if (id) {
        //     dispatch(getsinglecategory(params.id));
        //     // alert(JSON.stringify(singlecategory.categoryName));
        //     setCategory({ ...category, categoryName: singlecategory.categoryName });
        // };

        if(isUpdated){
            swal({
                title: "Category",
                text: "The Category Update",
                icon: "info"
              });
            navigate('/partner/Category');
            dispatch({type: UPDATE_CATEGORY_RESET});
        };
       
        if (success) {
            swal({
                title: "Category",
                text: "The Category Created Successfully",
                icon: "info"
              });
          navigate('/partner/Category')
          dispatch({ type: NEW_CATEGORY_RESET });
        };
      }, [dispatch, alert, error, history, success,isUpdated,id,singlecategory]);

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category.categoryName) {
            setError(true);
            return false;
        }
        const restaurantId = sessionStorage.getItem('restaurantId');
        const formData = new FormData();
        if(params.id){
        // formData.append('restaurant', restaurantId);
        formData.append('categoryName', category.categoryName);
        }else{
        formData.append('restaurant', restaurantId);
        formData.append('categoryName', category.categoryName);
        }
        if(params.id){
            dispatch(updatecategory(params.id,formData));
            // swal({
            //     title: "Question",
            //     text: "The Question Update",
            //     icon: "info"
            //   });
            // navigate('/admin/question');
            // dispatch({type: UPDATE_QUESTION_RESET});
        }else{
            dispatch(createcategory(formData));
        }
        
    }
    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Manage Category</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                    <form className="pt-3" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="exampleInputName1">Name</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Name" name="categoryName" value={category.categoryName} onChange={(e) => handleChange(e)} />
                                {errors && !category.categoryName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter category!</span>}
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


export default ManageCategory;