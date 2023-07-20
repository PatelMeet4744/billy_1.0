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
import { useParams } from "react-router-dom";

const ItemAddExtra = ({history}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const params = useParams();
  const {addextra,error,loading} = useSelector((state) => state.addextra);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteaddextra);
    const deleteaddextraHandler = async (id) => {
      dispatch(deleteaddextra(id));
      dispatch(getaddextra(params.id));
      swal({
        title: "Add Extra Deleted Successfully",
        text: error,
        icon: "info",
       });
      navigate("/partner/AddExtras");
    }


    const ApproveStatusaddonapprovalStatus = async (id,status) => {
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/addextra/approval/${id}/${status}`, '', '');
      // // // return alert(JSON.stringify(result));
      if (result.data.message === "Success") {
        swal({
          title: "Addon",
          text: "The Addon Approval Status Update",
          icon: "info",
          // dangerMode: true
        });
        dispatch(getaddextra(params.id));
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
      dispatch(getaddextra(params.id));
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
          <div className="card-body">  
              <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                  // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
                  title="Add Extra"
                  columns={[
                    { title: 'S.No #', render: rowData => rowData.tableData.id + 1 },
                    { title: 'Addon Name', field: 'addextraName' },
                    { title: 'Addon Type', field: 'addextraType' },
                    { title: 'Addon Price', field: 'addextraPrice' },
                    { title: 'Addon Additional Price', field: 'addextraAdditionalPrice' },
                    { title: 'Addon Final Price', field: 'addextraFinalPrice' },
                    { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0] },
                  //   {
                  //   title: 'Addon Status', render: rowData => 
                  //   <div style={{ display: 'flex' }}>
                  //    <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.addextraStatus === true ? "true" : ""} onClick={() => activedeactiveaddextraStatus(rowData.addextraId, rowData.addextraStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                  //   </div>
                  // },
                  // {
                  //   title: 'Approval Status', render: rowData => 
                  //   <div style={{ display: 'flex' }}>
                  //    <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.approvalStatus === 1 ? "true" : ""} onClick={() => activedeactiveaddextraapprovalStatus(rowData.addextraId, rowData.approvalStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                  //   </div>
                  // },
                  {
                  title: 'Approval Status', render: rowData =>
                    <div style={{ display: 'flex' }}>

                      <select name="cars" disabled={rowData.approvalStatus == 3 ? true : false} onChange={(e) => ApproveStatusaddonapprovalStatus(rowData.addextraId,e.target.value)}>
                        <option selected={rowData.approvalStatus == 1 ? true : false} value="1">Submission Pending</option>
                        <option selected={rowData.approvalStatus == 2 ? true : false} value="2">In Review</option>
                        <option selected={rowData.approvalStatus == 3 ? true : false} value="3">Approved</option>
                        <option selected={rowData.approvalStatus == 4 ? true : false} value="4">Rejected</option>
                      </select>

                      {/* <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.approvalStatus === 1 ? "true" : ""} onClick={() => activedeactiveaddonapprovalStatus(rowData.addonId, rowData.approvalStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div> */}
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