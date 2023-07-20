import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getcouponcode, deletecouponcode } from '../../../actions/couponcodeAction'
import swal from 'sweetalert';
import { DELETE_COUPONCODE_RESET } from "../../../constants/couponcodeConstants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Couponcode = ({ history }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { couponcode, error, loading } = useSelector((state) => state.couponcode);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deletecouponcode);

  const deletecouponcodeHandler = async (id) => {
    dispatch(deletecouponcode(id));
    dispatch(getcouponcode());
    swal({
      title: "Coupon Code Deleted Successfully",
      text: error,
      icon: "info",
    });
    navigate("/admin/couponcode");
  }

  const activedeactivecouponcodeStatus = async (id, status) => {
    const newstatus = (status === true ? "false" : "true");

    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/couponCode/${id}/${newstatus}`, '', '');
    // return alert(JSON.stringify(result));
    if (result.data.message === "Success") {
      swal({
        title: "Coupon Code",
        text: "The Coupon Code Status Update",
        icon: "info"
      });
      dispatch(getcouponcode());
    } else {
      swal({
        title: "Coupon Code",
        text: result.errors[0].msg,
        icon: "warning",
        dangerMode: true
      });
    }
  }

  const CouponCodeExipred = async (id, status) => {
    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const result = await axios.post(`http://${process.env.REACT_APP_IP}/api/couponCode/Expired`, '', '');
    // return alert(JSON.stringify(result));
    // if (result.data.message === "Success") {
    //   swal({
    //     title: "Coupon Code",
    //     text: "The Coupon Code Status Update",
    //     icon: "info"
    //   });
    //   dispatch(getcouponcode());
    // } else {
    //   swal({
    //     title: "Coupon Code",
    //     text: result.errors[0].msg,
    //     icon: "warning",
    //     dangerMode: true
    //   });
    // }
  }

  useEffect(() => {
    CouponCodeExipred();
    dispatch(getcouponcode());
    if (isDeleted) {
      swal({
        title: "Coupon Code Deleted Successfully",
        text: error,
        icon: "info",
      });
      dispatch({ type: DELETE_COUPONCODE_RESET });
    }
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const defaultMaterialTheme = createTheme();
  return (
    <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>CouponCode</a>
        </div>
      </div><br />
      <div className="card">
        <div className="card-body">
          <div class="row">
            <div class="col-sm">
              <div style={{ display: 'flex' }}>
                <Link to="managecouponcode" className='add_link'>
                  <button style={{ backgroundColor: 'white', border: 'none', color: 'blue' }}>Add Coupon Code</button>
                </Link>
              </div><br />
            </div>
            <div class="col-sm" style={{ textAlign: 'justify', textAlignLast: 'right' }}>
              <Link to={"/admin/sendcouponcode"}><a><label style={{ marginRight: "5px" }} class="badge badge-success hand_cursor">Send Coupon Code</label></a></Link>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
          </div>

          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
              title="Coupon Code"
              columns={[
                { title: 'S.No #', render: rowData => rowData.tableData.id + 1 },
                { title: 'Coupon Code Name', field: 'couponCodeName' },
                { title: 'Coupon Code Type', field: 'couponCodeType' },
                { title: 'Coupon Code Value', field: 'couponCodeValue' },
                { title: 'Coupon Code Cart Min Value', field: 'couponCodeCartMinValue' },
                { title: 'Coupon Code Expiredon', render: rowData => rowData.couponCodeExpiredon.split('T')[0] },
                { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0] },
                {
                  title: 'Addon Status', render: rowData =>
                    <div style={{ display: 'flex' }}>
                      <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.couponCodeStatus === true ? "true" : ""} onClick={() => activedeactivecouponcodeStatus(rowData.couponCodeId, rowData.couponCodeStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                    </div>
                },
                {
                  title: 'Actions', render: rowData =>
                    <div style={{ display: 'flex' }}>
                      <Link to={"/admin/couponcode/managecouponcode/" + rowData.couponCodeId}><a><label style={{ marginRight: "5px" }} class="badge badge-success hand_cursor">Edit</label></a></Link>
                      <a onClick={() => deletecouponcodeHandler(rowData.couponCodeId)}><label style={{ cursor: 'pointer' }} class="badge badge-danger delete_red hand_cursor">Delete</label></a>
                    </div>
                  // <div style={{ display: 'flex' }}>
                  //     <Link to={"/Partner/Addons/ManageAddons/" + rowData.addonId}><a><label class="badge badge-success hand_cursor">Edit</label></a></Link>&nbsp;
                  //     <a onClick={()=>deleteaddonHandler(rowData.addonId)}><label style={{cursor:'pointer'}} class="badge badge-danger delete_red hand_cursor">Delete</label></a>
                  // </div>
                },

              ]}
              data={
                couponcode
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

export default Couponcode;