import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getaddon,deleteaddon } from '../../../actions/addonAction'
import swal from 'sweetalert';
import { DELETE_ADDON_RESET } from "../../../constants/addOnConstants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ItemAddedOn = ({history}) => {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const {addOn,error,loading} = useSelector((state) => state.addon);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteaddon);
    const restaurantId = sessionStorage.getItem('restaurantId');
    
    const deleteaddonHandler = async (id) => {
      dispatch(deleteaddon(id));
      dispatch(getaddon(restaurantId));
      swal({
        title: "AddOn Deleted Successfully",
        text: error,
        icon: "info",
       });
      navigate("/partner/Addons");
    }

    const activedeactiveaddonStatus = async (id, status) => {
      const newstatus = (status === true ? "false" : "true");
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/addon/${id}/${newstatus}`, '', '');
      // return alert(JSON.stringify(result));
      if (result.data.message === "Success") {
        swal({
          title: "Addon",
          text: "The Addon Status Update",
          icon: "info",
          // dangerMode: true
        });
        dispatch(getaddon(restaurantId));
        // getScopes();
      } else {
        swal({
          title: "Addon",
          text: result.errors[0].msg,
          icon: "warning",
          dangerMode: true
        });
      }
    }

    const activedeactiveaddonapprovalStatus = async (id, status) => {
      const newstatus = (status === 1 ? "0" : "1");
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/addon/approval/${id}/${newstatus}`, '', '');
      // return alert(JSON.stringify(result));
      if (result.data.message === "Success") {
        swal({
          title: "Addon",
          text: "The Addon Approval Status Update",
          icon: "info",
          // dangerMode: true
        });
        dispatch(getaddon(restaurantId));
        // getScopes();
      } else {
        swal({
          title: "Addon",
          text: result.errors[0].msg,
          icon: "warning",
          dangerMode: true
        });
      }
    }

    useEffect(() => {
      dispatch(getaddon(restaurantId));
      if (isDeleted) {
        swal({
          title: "Addon Deleted Successfully",
          text: error,
          icon: "info",
      });
        dispatch({ type: DELETE_ADDON_RESET });
      }
    }, [dispatch, alert, error, deleteError, history, isDeleted]);

    const defaultMaterialTheme = createTheme();
    return (
        <div>
        <div className="card">
          <div className='p-3' style={{ cursor: 'pointer' }}>
            <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Addons</a>
          </div>
        </div><br />
        <div className="card">
          <div className="card-body">
          <div style={{ display: 'flex' }}>
            <Link to="ManageAddons"  className='add_link'>
            <button style={{backgroundColor:'white',border:'none',color:'blue'}}>Add Addons</button>
            {/* <a href='deliveryBoy/managedeliveryBoy'>Add Delivery Boy</a> */}
                </Link>
              </div><br />
            <div style={{ display: 'flex' }}>
         </div>
  
              <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                  // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
                  title="Addon"
                  columns={[
                    { title: 'S.No #', render: rowData => rowData.tableData.id + 1 },
                    { title: 'Restaurant', field : 'restaurant[restaurantName]'},
                    { title: 'Addon Name', field: 'addonName' },
                    { title: 'Addon Type', field: 'addonType' },
                    // { title: 'Addon Price', field: 'addonPrice' },
                    // { title: 'Addon Additional Price', field: 'addonAdditionalPrice' },
                    { title: 'Addon Final Price', field: 'addonFinalPrice' },
                    { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0] },
                    {
                    title: 'Addon Status', render: rowData => 
                    <div style={{ display: 'flex' }}>
                     <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.addonStatus === true ? "true" : ""} onClick={() => activedeactiveaddonStatus(rowData.addonId, rowData.addonStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
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
                    // <label style={{backgroundColor:"red"}} class="badge badge-danger hand_cursor">Rejected</label>
                     /* <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.approvalStatus === 1 ? "true" : ""} onClick={() => activedeactiveaddonapprovalStatus(rowData.addonId, rowData.approvalStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div> */
                  },
                  {
                      title: 'Actions', render: rowData =>  
                        <div style={{ display: 'flex' }}>
                        {rowData.approvalStatus == 3 ? <Link to={"/Partner/Addons/ManageAddons/" + rowData.addonId}><a><label style={{marginRight:"5px"}} class="badge badge-success hand_cursor">Edit</label></a></Link> : ""}
                        {rowData.approvalStatus != 3 ?  <a onClick={()=>deleteaddonHandler(rowData.addonId)}><label style={{cursor:'pointer'}} class="badge badge-danger delete_red hand_cursor">Delete</label></a> : ""}
                      </div>
                      // <div style={{ display: 'flex' }}>
                      //     <Link to={"/Partner/Addons/ManageAddons/" + rowData.addonId}><a><label class="badge badge-success hand_cursor">Edit</label></a></Link>&nbsp;
                      //     <a onClick={()=>deleteaddonHandler(rowData.addonId)}><label style={{cursor:'pointer'}} class="badge badge-danger delete_red hand_cursor">Delete</label></a>
                      // </div>
                    },
                    
                  ]}
                  data={
                    addOn
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

export default ItemAddedOn;