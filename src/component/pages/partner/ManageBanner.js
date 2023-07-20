import React, { useState, useEffect } from 'react';
import { json, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import axios from 'axios';

const ManageBanner = ({history}) => {

    const [bannerName, setBannerName] = useState("");
    const [bannerImage, setBannerImage] = useState("");
    const [old_bannerImage, setOld_bannerImage] = useState("");
   
    const [errors, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const getsingleBanner = async () => {
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/banner/${id}`, '', '');
        setBannerName(data.data.bannerName);
        setBannerImage(data.data.bannerImage);
        setOld_bannerImage(data.data.bannerImage);
    }

    useEffect(() => {
        if(params.id){
            getsingleBanner(id);   
        }
    }, [dispatch, alert, errors, history]);

    const handlephoto = (e) => {
        // if(e.target.files[0].name.split('.').pop() == "png")
        setBannerImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bannerName || !bannerImage) {
            setError(true);
            return false;
        }
        const restaurantId = sessionStorage.getItem('restaurantId');
        const formData = new FormData();
        formData.append('restaurant', restaurantId);
        formData.append('bannerName', bannerName);
        formData.append('bannerImage', bannerImage);
        if(params.id){
            formData.append('old_bannerImage', old_bannerImage);
        }

        if (params.id){
            const bannerId = params.id
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };
                const result = await axios.put(
                    `http://${process.env.REACT_APP_IP}/api/banner/${bannerId}`,
                    formData, config
                );
                // return alert(JSON.stringify(result.data.message));
                if(result.data.message === "Success")
                {
                    swal({
                        position: 'top',
                        icon: 'success',
                        title: 'Banner Update',
                        text: "Banner Updated Successfully",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    navigate('/partner/Banner');
                }else{
                    swal({
                        position: 'top',
                        icon: 'info',
                        title: 'Banner Update Fail',
                        text: result.data.data.message,
                    })
                }
            } catch (error) {
                swal({
                    position: 'top',
                    icon: 'info',
                    title: 'Banner Added Fail',
                    text: error.message,
                })
            }
        }else{
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            const result = await axios.post(
                `http://${process.env.REACT_APP_IP}/api/banner`,
                formData, config
            );
            // alert(JSON.stringify(result.data.status));
            if(result.data.status === true)
            {
                swal({
                    position: 'top',
                    icon: 'success',
                    title: 'Banner Added',
                    text: "Banner Added Successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/partner/Banner');
            }else{
                swal({
                    position: 'top',
                    icon: 'info',
                    title: 'Banner Added Fail',
                    text: result.data.data.message,
                })
            }
        } catch (error) {
            swal({
                position: 'top',
                icon: 'info',
                title: 'Banner insert Fail',
                text: error.message,
            })
        }
    }
        // dispatch(createcuisines(formData));
        // // }   
    }
    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Manage Banner</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                    <form className="pt-3" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="exampleInputName1">Name</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Banner Name" name="bannerName" value={bannerName} onChange={(e) => setBannerName(e.target.value)} />
                                {errors && !bannerName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Name!</span>}
                            </div>  
                            <label for="exampleInputName1">Banner Image</label>
                            <div className="file-card">
                                <div className="file-inputs">
                                    {/* <input type="file" /> */}
                                    <input className="InputField form-control form-control-lg" type="file" placeholder="Banner Image" name="bannerImage" onChange={(e) => handlephoto(e)} />
                                    <button className="dfds">

                                        <i className="mdi mdi-plus menu-icon" />
                                        {/* <FontAwesomeIcon icon={faPlus} /> */}
                                        Upload
                                    </button>
                                </div>
                            </div>
                            {errors && !bannerImage && <div><span className="invalid-input" style={{ color: 'red' }}>Please Select Image!</span><br></br></div>}
                            {bannerImage &&
                                <li className="file-item">
                                    <i className="mdi mdi-file" />
                                    {/* <FontAwesomeIcon className="iconcolor" icon={faFileAlt} /> */}
                                    <p className="ml-4">{params.id ? old_bannerImage : bannerImage.name}</p>
                                </li>}

                            <div className="mt-3">
                            <button type="submit" style={{ height: '40px' }} class="btn btn-primary mr-2" name="submit">Submit</button>
                                 </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageBanner;