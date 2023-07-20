import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getaddon, deleteaddon } from '../../../actions/addonAction'
import swal from 'sweetalert';
import { DELETE_ADDON_RESET } from "../../../constants/addOnConstants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from "react-router-dom";

const ItemAddedOn = ({ history }) => {

  const params = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { addOn, error, loading } = useSelector((state) => state.addon);

  const ApproveStatusaddonapprovalStatus = async (id,status) => {
    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/addon/approval/${id}/${status}`, '', '');
    // // // return alert(JSON.stringify(result));
    if (result.data.message === "Success") {
      swal({
        title: "Addon",
        text: "The Addon Approval Status Update",
        icon: "info",
        // dangerMode: true
      });
      dispatch(getaddon(params.id));
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
    dispatch(getaddon(params.id));
    
  }, [dispatch, alert, error, history]);

  const defaultMaterialTheme = createTheme();
  return (
    <div>
      
      <div className="card">
        <div className="card-body">

          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
              title="Addon"
              columns={[
                { title: 'S.No #', render: rowData => rowData.tableData.id + 1 },
                // { title: 'Restaurant', field: 'restaurant[restaurantName]' },
                { title: 'Addon Name', field: 'addonName' },
                { title: 'Addon Type', field: 'addonType' },
                { title: 'Addon Price', field: 'addonPrice' },
                { title: 'Addon Additional Price', field: 'addonAdditionalPrice' },
                { title: 'Addon Final Price', field: 'addonFinalPrice' },
                { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0] },
                {
                  title: 'Approval Status', render: rowData =>
                    <div style={{ display: 'flex' }}>

                      <select name="cars" disabled={rowData.approvalStatus == 3 ? true : false} onChange={(e) => ApproveStatusaddonapprovalStatus(rowData.addonId,e.target.value)}>
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