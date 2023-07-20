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
import { useParams } from "react-router-dom";

const Category = ({history}) => {

  const params = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const {category,error,loading} = useSelector((state) => state.category);
  
  const ApproveStatuscategoryapprovalStatus = async (id,status) => {

    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/category/approval/${id}/${status}`, '', '');
    // // // return alert(JSON.stringify(result));
    if (result.data.message === "Success") {
      swal({
        title: "Category",
        text: "The Category Approval Status Update",
        icon: "info"
      });
      dispatch(getcategory(params.id));
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
      dispatch(getcategory(params.id));
    }, [dispatch, alert, error, history]);
    
    const defaultMaterialTheme = createTheme();
    return (
        <div>
      
      <div className="card">
        <div className="card-body">
            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
                title="Category"
                columns={[
                  { title: 'S.No #', render: rowData => rowData.tableData.id + 1 },
                  { title: 'Category', field: 'categoryName' },
                  { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0] },
                  {
                    title: 'Approval Status', render: rowData => 
                    <div style={{ display: 'flex' }}>

                      <select name="cars" disabled={rowData.approvalStatus == 3 ? true : false} onChange={(e) => ApproveStatuscategoryapprovalStatus(rowData.categoryId,e.target.value)}>
                        <option selected={rowData.approvalStatus == 1 ? true : false} value="1">Submission Pending</option>
                        <option selected={rowData.approvalStatus == 2 ? true : false} value="2">In Review</option>
                        <option selected={rowData.approvalStatus == 3 ? true : false} value="3">Approved</option>
                        <option selected={rowData.approvalStatus == 4 ? true : false} value="4">Rejected</option>
                      </select>
                    </div>
                  }
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