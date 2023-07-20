import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getaddextra,deleteaddextra } from '../../../actions/addextraAction'
import swal from 'sweetalert';
import { DELETE_ADDEXTRA_RESET } from "../../../constants/addextraConstants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ItemAddExtra = ({history}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const {addextra,error,loading} = useSelector((state) => state.addextra);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteaddextra);
    const restaurantId = sessionStorage.getItem('restaurantId');
    const deleteaddextraHandler = async (id) => {
      dispatch(deleteaddextra(id));
      dispatch(getaddextra(restaurantId));
      swal({
        title: "Add Extra Deleted Successfully",
        text: error,
        icon: "info",
       });
      navigate("/partner/AddExtras");
    }

    const activedeactiveaddextraStatus = async (id, status) => {
      const newstatus = (status === true ? "false" : "true");
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/addextra/${id}/${newstatus}`, '', '');
      // return alert(JSON.stringify(result));
      if (result.data.message === "Success") {
        swal({
          title: "Add Extra",
          text: "The Add Extra Status Update",
          icon: "info",
          // dangerMode: true
        });
        dispatch(getaddextra(restaurantId));
        // getScopes();
      } else {
        swal({
          title: "Add Extra",
          text: result.errors[0].msg,
          icon: "warning",
          dangerMode: true
        });
      }
    }

    const activedeactiveaddextraapprovalStatus = async (id, status) => {
      const newstatus = (status === 1 ? "0" : "1");
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/addextra/approval/${id}/${newstatus}`, '', '');
      // return alert(JSON.stringify(result));
      if (result.data.message === "Success") {
        swal({
          title: "Add Extra",
          text: "The Add Extra Approval Status Update",
          icon: "info",
          // dangerMode: true
        });
        dispatch(getaddextra(restaurantId));
        // getScopes();
      } else {
        swal({
          title: "Add Extra",
          text: result.errors[0].msg,
          icon: "warning",
          dangerMode: true
        });
      }
    }
    useEffect(() => {
      dispatch(getaddextra(restaurantId));
      if (isDeleted) {
        swal({
          title: "Add Extra Deleted Successfully",
          text: error,
          icon: "info",
      });
        dispatch({ type: DELETE_ADDEXTRA_RESET });
      }
    }, [dispatch, alert, error, deleteError, history, isDeleted]);
    const defaultMaterialTheme = createTheme();
    return (
        <div>
        <div className="card">
          <div className='p-3' style={{ cursor: 'pointer' }}>
            <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Add Extra</a>
          </div>
        </div><br />
        <div className="card">
          <div className="card-body">
          <div style={{ display: 'flex' }}>
            <Link to="ManageAddExtra"  className='add_link'>
            <button style={{backgroundColor:'white',border:'none',color:'blue'}}>Add Extra</button>
            {/* <a href='deliveryBoy/managedeliveryBoy'>Add Delivery Boy</a> */}
                </Link>
              </div><br />
            <div style={{ display: 'flex' }}>
         </div>
  
              <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                  // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
                  title="Add Extra"
                  columns={[
                    { title: 'S.No #', render: rowData => rowData.tableData.id + 1 },
                    { title: 'Restaurant', field : 'restaurant[restaurantName]'},
                    { title: 'Add Extra Name', field: 'addextraName' },
                    { title: 'Add Extra Type', field: 'addextraType' },
                    // { title: 'Addon Price', field: 'addonPrice' },
                    // { title: 'Addon Additional Price', field: 'addonAdditionalPrice' },
                    { title: 'Add Extra Final Price', field: 'addextraFinalPrice' },
                    { title: 'Add Extra', render: rowData => rowData.createdAt.split('T')[0] },
                    {
                    title: 'Add Extra Status', render: rowData => 
                    <div style={{ display: 'flex' }}>
                     <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.addextraStatus === true ? "true" : ""} onClick={() => activedeactiveaddextraStatus(rowData.addextraId, rowData.addextraStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                    </div>
                  },
                  {
                    title: 'Approval Status', render: rowData => 
                    <div>
                      {rowData.approvalStatus == 1 ? <label class="badge badge-info hand_cursor">Submited Pending</label> : ""}
                      {rowData.approvalStatus == 2 ? <label class="badge badge-danger hand_cursor">In Review</label> : ""}
                      {rowData.approvalStatus == 3 ? <label class="badge badge-success hand_cursor">Approved</label> : ""}
                      {rowData.approvalStatus == 4 ? <label style={{backgroundColor:"red"}} class="badge badge-success hand_cursor">Rejected</label> : ""}
                      </div>   
                    // <div style={{ display: 'flex' }}>
                    //  <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.approvalStatus === 1 ? "true" : ""} onClick={() => activedeactiveaddextraapprovalStatus(rowData.addextraId, rowData.approvalStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                    // </div>
                  },
                  {
                      title: 'Actions', render: rowData => 
                      <div>
                      
                      <div style={{ display: 'flex' }}>
                      {rowData.approvalStatus == 3 ? <Link to={"/Partner/AddExtras/ManageAddExtra/" + rowData.addextraId}><a><label class="badge badge-success hand_cursor" style={{marginRight:"5px"}}>Edit</label></a></Link> : ""}
                        
                      {rowData.approvalStatus != 3 ?  <a onClick={()=>deleteaddextraHandler(rowData.addextraId)}><label style={{cursor:'pointer'}} class="badge badge-danger delete_red hand_cursor">Delete</label></a> : ""}
                      </div>
                      </div>
                    },
                    
                    
                  ]}
                  data={
                    addextra
                  }
                  options={{
                    exportButton: true,
                    headerStyle: {
                      borderBlockColor: 'orange',
                      // backgroundColor:'orange',
                      // color:'#fff'
                    },
                    rowStyle: {
                      fontSize: '14px'
                    },
                  }}
                />
              </ThemeProvider>
            </div>
          </div>
        </div>
    );
};

export default ItemAddExtra;