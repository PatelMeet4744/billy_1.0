import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getbanner,deletebanner } from '../../../actions/bannerAction';
import { DELETE_BANNER_RESET } from '../../../constants/bannerConstants';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useParams } from "react-router-dom";

const Banner = ({history}) => {

    const params = useParams();
    const dispatch = useDispatch();
    const {
      banner,
      error,
      loading,
    } = useSelector((state) => state.banner);

    const ApproveStatusbannerapprovalStatus = async (id,status) => {
     
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/banner/approval/${id}/${status}`, '', '');
      // return alert(JSON.stringify(result));
      if (result.data.message === "Success") {
        swal({
          title: "Banner",
          text: "The Banner Approval Status Update",
          icon: "info",
          // dangerMode: true
        });
        dispatch(getbanner(params.id));
        // getScopes();
      } else {
        swal({
          title: "Banner",
          text: result.errors[0].msg,
          icon: "warning",
          dangerMode: true
        });
      }
    }

    useEffect(() => {
      dispatch(getbanner(params.id));
      
          
    }, [dispatch, alert, error, history]);

    const defaultMaterialTheme = createTheme();
    return (
        <div>
      <div className="card">
        <div className="card-body">
        
            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
                title="Banner"
                columns={[
                  { title: 'S.No #', render: rowData => rowData.tableData.id+1, width: "2%" },
                  { title: 'BannerName', field: 'bannerName' },
                  { title: 'BannerImage', field: 'imageUrl', render: rowData => <a href={`http://${process.env.REACT_APP_IP}${rowData.bannerImage}`} target="_blank"><img src={`http://${process.env.REACT_APP_IP}${rowData.bannerImage}`} alt="CuisinesImage" style={{ width: 60, height: 30 }} /></a> },
                  {
                    title: 'Added On', render: rowData => 
                    <div>
                     2023-01-26
                    </div>
                  },
                  {
                    title: 'Approval Status', render: rowData => 
                    <div style={{ display: 'flex' }}>

                      <select name="cars" disabled={rowData.approvalStatus == 3 ? true : false} onChange={(e) => ApproveStatusbannerapprovalStatus(rowData.bannerId,e.target.value)}>
                        <option selected={rowData.approvalStatus == 1 ? true : false} value="1">Submission Pending</option>
                        <option selected={rowData.approvalStatus == 2 ? true : false} value="2">In Review</option>
                        <option selected={rowData.approvalStatus == 3 ? true : false} value="3">Approved</option>
                        <option selected={rowData.approvalStatus == 4 ? true : false} value="4">Rejected</option>
                      </select>

                    </div>
                  },
                ]}
                data={
                  banner
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

export default Banner;