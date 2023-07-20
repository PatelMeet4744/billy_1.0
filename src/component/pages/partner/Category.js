import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getcategory,deletecategory } from '../../../actions/categoryAction'
import swal from 'sweetalert';
import { DELETE_CATEGORY_RESET } from "../../../constants/categoryConstants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Category = ({history}) => {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const {category,error,loading} = useSelector((state) => state.category);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deletecategory);  
  const restaurantId = sessionStorage.getItem('restaurantId');

  const deletecategoryHandler = async (id) => {
    dispatch(deletecategory(id));
    dispatch(getcategory(restaurantId));
    swal({
      title: "category Deleted Successfully",
      text: error,
      icon: "info",
     });
    navigate("/partner/Category");
  }

  const activedeactivecategoryStatus = async (id, status) => {
    const newstatus = (status === true ? "false" : "true");

    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/category/${id}/${newstatus}`, '', '');
    // return alert(JSON.stringify(result));
    if (result.data.message === "Success") {
      swal({
        title: "Category",
        text: "The Category Status Update",
        icon: "info",
        // dangerMode: true
      });
      dispatch(getcategory(restaurantId));
      // getScopes();
    } else {
      swal({
        title: "Category",
        text: result.errors[0].msg,
        icon: "warning",
        dangerMode: true
      });
    }
  }

  const activedeactivecategoryapprovalStatus = async (id, status) => {
    const newstatus = (status === 1 ? "0" : "1");

    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/category/approval/${id}/${newstatus}`, '', '');
    // return alert(JSON.stringify(result));
    if (result.data.message === "Success") {
      swal({
        title: "Category",
        text: "The Category Approval Status Update",
        icon: "info",
        // dangerMode: true
      });
      dispatch(getcategory(restaurantId));
      // getScopes();
    } else {
      swal({
        title: "Category",
        text: result.errors[0].msg,
        icon: "warning",
        dangerMode: true
      });
    }
  }
  useEffect(() => {
      dispatch(getcategory(restaurantId));
      if (isDeleted) {
        swal({
          title: "category Deleted Successfully",
          text: error,
          icon: "info",
      });
        dispatch({ type: DELETE_CATEGORY_RESET });
      }
    }, [dispatch, alert, error, deleteError, history, isDeleted]);
    
    const defaultMaterialTheme = createTheme();
    return (
        <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Category</a>
        </div>
      </div><br />
      <div className="card">
        <div className="card-body">
        <div style={{ display: 'flex' }}>
          <Link to="ManageCategory"  className='add_link'>
          <button style={{backgroundColor:'white',border:'none',color:'blue'}}>Add Category</button>
          {/* <a href='deliveryBoy/managedeliveryBoy'>Add Delivery Boy</a> */}
              </Link>
            </div><br />
          <div style={{ display: 'flex' }}>
       </div>

            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
                title="Category"
                columns={[
                  { title: 'S.No #', render: rowData => rowData.tableData.id + 1 },
                  { title: 'Restaurant', field : 'restaurant[restaurantName]'},
                  { title: 'Category', field: 'categoryName' },
                  { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0] },
                  {
                    title: 'Category Status', render: rowData => 
                    <div style={{ display: 'flex' }}>
                     <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.categoryStatus === true ? "true" : ""} onClick={() => activedeactivecategoryStatus(rowData.categoryId, rowData.categoryStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
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
                    
                  },
                  {
                      title: 'Actions', render: rowData => 
                      <div style={{ display: 'flex' }}>
                        {rowData.approvalStatus == 3 ? <Link to={"/partner/Category/ManageCategory/" + rowData.categoryId}><a><label style={{marginRight:"5px"}} class="badge badge-success hand_cursor">Edit</label></a></Link> : ""}
                        {rowData.approvalStatus != 3 ? <a onClick={()=>deletecategoryHandler(rowData.categoryId)}><label style={{cursor:'pointer'}} class="badge badge-danger delete_red hand_cursor">Delete</label></a> : ""}
                      </div>
                    },
                  
                ]}
                data={
                  category
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

export default Category;