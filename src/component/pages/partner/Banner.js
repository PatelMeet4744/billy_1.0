import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getbanner,deletebanner } from '../../../actions/bannerAction';
import { DELETE_BANNER_RESET } from '../../../constants/bannerConstants';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import axios from 'axios';

const Banner = ({history}) => {
    const dispatch = useDispatch();
    const {
      banner,
      error,
      loading,
    } = useSelector((state) => state.banner);
    const {
      error: deleteError,
      isDeleted
    } = useSelector((state) => state.deleteBanner);
    const restaurantId = sessionStorage.getItem('restaurantId');

    const activedeactivebannerStatus = async (id, status) => {
      const newstatus = (status === true ? "false" : "true");
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/banner/${id}/${newstatus}`, '', '');
      // return alert(JSON.stringify(result));
      if (result.data.message === "Success") {
        swal({
          title: "Banner",
          text: "The Banner Status Update",
          icon: "info"
        });
        dispatch(getbanner(restaurantId));
      } else {
        swal({
          title: "Banner",
          text: result.errors[0].msg,
          icon: "warning",
          dangerMode: true
        });
      }
    }
    // const {
    //  restaurantDetail
    // } = useSelector((state) => state.restaurantDetail);
  
    const deleteBannerHandler = async (bannerId,bannerImage) => {
    
      // return alert(bannerImage);
      const formData = new FormData();
      formData.append('bannerImage', bannerImage);
      dispatch(deletebanner(bannerId, formData));
      // alert(deleteError);
    }

    useEffect(() => {
      dispatch(getbanner(restaurantId));
      
      if (deleteError) {
        alert(deleteError);
      }
  
      if (isDeleted) {
        swal({
          title: "Banner Deleted",
          text: "Banner Deleted Successfully",
          icon: "info",
      });
        dispatch({ type: DELETE_BANNER_RESET });
      }
    }, [dispatch, alert, error, deleteError, history, isDeleted]);


    const defaultMaterialTheme = createTheme();
    return (
        <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Banner</a>
        </div>
      </div><br />
      <div className="card">
        <div className="card-body">
        <div style={{ display: 'flex' }}>
          <Link to="managebanner"  className='add_link'>
          <button style={{backgroundColor:'white',border:'none',color:'blue'}}>Add Banner</button>
          {/* <a href='deliveryBoy/managedeliveryBoy'>Add Delivery Boy</a> */}
              </Link>
            </div><br />
          <div style={{ display: 'flex' }}>
       </div>

            <ThemeProvider theme={defaultMaterialTheme}>
              <MaterialTable
                // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
                title="Banner"
                columns={[
                  { title: 'S.No #', render: rowData => rowData.tableData.id+1, width: "2%", width: "2%" },
                  { title: 'Restaurant', field : 'restaurant[restaurantName]'},
                  { title: 'BannerName', field: 'bannerName' },
                  { title: 'BannerImage', field: 'imageUrl', render: rowData => <a href={`http://${process.env.REACT_APP_IP}${rowData.bannerImage}`} target="_blank"><img src={`http://${process.env.REACT_APP_IP}${rowData.bannerImage}`} alt="CuisinesImage" style={{ width: 60, height: 30 }} /></a> },
                  {
                    title: 'Added On', render: rowData => 
                    <div>
                     2023-01-26
                    </div>
                  },
                  {
                    title: 'Banner Status', render: rowData => 
                    <div style={{ display: 'flex' }}>
                    <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.bannerStatus === true ? "true" : ""} onClick={() => activedeactivebannerStatus(rowData.bannerId, rowData.bannerStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
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
                        {rowData.approvalStatus == 3 ? <Link to={"/Partner/Banner/ManageBanner/" + rowData.bannerId}><a><label style={{marginRight:"5px"}} class="badge badge-success hand_cursor">Edit</label></a></Link> : ""}
                        {rowData.approvalStatus != 3 ?  <a onClick={()=>deleteBannerHandler(rowData.bannerId,rowData.bannerImage)}><label style={{cursor:'pointer'}} class="badge badge-danger delete_red hand_cursor">Delete</label></a> : ""}
                         </div>
                      // <div style={{ display: 'flex' }}>
                      //     <Link to={"/Partner/Addons/ManageAddons/" + rowData.addonId}><a><label class="badge badge-success hand_cursor">Edit</label></a></Link>&nbsp;
                      //     <a onClick={()=>deleteaddonHandler(rowData.addonId)}><label style={{cursor:'pointer'}} class="badge badge-danger delete_red hand_cursor">Delete</label></a>
                      // </div>
                    },
                  
                ]}
                data={
                  banner
                  // [
                    
                  //   { restaurant: 'Dominos', bannerName: 'FirstBanner', bannerImage: '/uploads/banner/images/1670600202838-slider_2.jpg',bannerStatus:true,approvalStatus: 0},
                  //   { restaurant: 'Dominos', bannerName: 'SecondBanner', bannerImage: '/uploads/banner/images/1670600202838-slider_2.jpg',bannerStatus:false,approvalStatus: 1},
                    
                  //   // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                  //   // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                  //   // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                  //   // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                  //   // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                  //   // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                  //   // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },
                  //   // { Banner: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4', gender: 'male' },

                  //   // { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34, imageUrl: 'https://avatars0.githubusercontent.com/u/7895451?s=460&v=4' },
                  // ]
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