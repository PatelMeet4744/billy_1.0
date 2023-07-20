import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NEW_GETTOUCH_RESET } from "../../../constants/getTouchConstants"
import { clearErrors,createGetTocuh} from "../../../actions/getTouchAction"
import { useParams } from "react-router-dom";
import swal from 'sweetalert';

const GetTocuh = ({ history }) => {
   
    const [gettouch, setGettocuh] = useState({
        getTouchSubject: "",
        getTouchMessage: ""
    });
    const [errors, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector((state) => state.newgettouch);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        };
       
        if (success) {
            swal({
                title: "Get Touch",
                text: "The Message send",
                icon: "info"
            });
            setGettocuh({getTouchSubject: '',getTouchMessage:''});
            navigate("/Partner/Gettouch");
          dispatch({ type: NEW_GETTOUCH_RESET });
        };
      }, [dispatch, alert, error, history, success]);

      const handleChange = (e) => {
        setGettocuh({ ...gettouch, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const restaurantId = sessionStorage.getItem('restaurantId');

        if (!gettouch.getTouchSubject || !gettouch.getTouchMessage) {
            setError(true);
            return false;
        }
        const formData = new FormData();
        formData.append('restaurant', restaurantId);
        formData.append('getTouchSubject', gettouch.getTouchSubject);
        formData.append('getTouchMessage', gettouch.getTouchMessage);
        dispatch(createGetTocuh(formData));
        
    }

    return (
        <div class="row">
            <h4 class="grid_title ml10 ml15">Get Touch</h4>
            <div class="col-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                    <form className="pt-3" onSubmit={handleSubmit}>
                        <div className="form-group">
                                <label for="exampleInputName1">Subject</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Subject" name="getTouchSubject" value={gettouch.getTouchSubject} onChange={(e) => handleChange(e)} />
                                {errors && !gettouch.getTouchSubject && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Subject!</span>}
                            </div>

                            <div className="form-group">
                                <label for="exampleInputName1">Message</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Message" name="getTouchMessage" value={gettouch.getTouchMessage} onChange={(e) => handleChange(e)} />
                                {errors && !gettouch.getTouchMessage && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Message!</span>}
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

export default GetTocuh;