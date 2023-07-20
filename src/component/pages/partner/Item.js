import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getItems, getSingleItems } from '../../../actions/ItemAction';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import axios from 'axios';

const Item = () => {
    const dispatch = useDispatch();
    const {
        Items,
        error,
        loading,
    } = useSelector((state) => state.Item);
    const restaurantId = sessionStorage.getItem('restaurantId');

    const deletecategoryHandler = async (id,itemImage) => {
      alert(itemImage)

      const formData = new FormData();
      formData.append('itemImage', itemImage);

      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const result = await axios.post(`http://${process.env.REACT_APP_IP}/api/item/${id}`, formData, '');
        // return alert(JSON.stringify(result));
        if (result.data.message === "Success") {
          swal({
            title: "Item",
            text: "The Item Status Update",
            icon: "info",
            // dangerMode: true
          });
          dispatch(getItems());
          // getScopes();
        } else {
          swal({
            title: "Scope",
            text: result.errors[0].msg,
            icon: "warning",
            dangerMode: true
          });
        }
        // dispatch(deletecategory(id));
        // dispatch(getcategory());
        // swal({
        //   title: "category Deleted Successfully",
        //   text: error,
        //   icon: "info",
        //  });
        // navigate("/partner/Category");
      }

    const activedeactive = async (id, status) => {
        const newstatus = (status === true ? "false" : "true");
    
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/item/${id}/${newstatus}`, '', '');
        // return alert(JSON.stringify(result));
        if (result.data.message === "Success") {
          swal({
            title: "Item",
            text: "The Item Status Update",
            icon: "info",
            // dangerMode: true
          });
          dispatch(getItems(restaurantId));
        } else {
          swal({
            title: "Scope",
            text: result.errors[0].msg,
            icon: "warning",
            dangerMode: true
          });
        }
      }
    
      const activedeactiveitemapprovalStatus = async (id, status) => {
        const newstatus = (status === 1 ? "0" : "1");
    
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/item/approval/${id}/${newstatus}`, '', '');
        // return alert(JSON.stringify(result));
        if (result.data.message === "Success") {
          swal({
            title: "Item",
            text: "The Item Approval Status Update",
            icon: "info",
            // dangerMode: true
          });
          dispatch(getItems(restaurantId));
          // getScopes();
        } else {
          swal({
            title: "Item",
            text: result.errors[0].msg,
            icon: "warning",
            dangerMode: true
          });
        }
      }
    useEffect(() => {
        dispatch(getItems(restaurantId));
        // alert(JSON.stringify(Items));
    }, []);

    // const id = "641c6e05c4494b1dd29e225f";
    // {Items.map((item, index) => {
    //     if (item.restaurant == id) {
    //         alert(item.itemName)
    //     }
    // }
    // )}      

    const defaultMaterialTheme = createTheme();
    return (
        <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/partner/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Item</a>
        </div>
      </div><br />
      <div className="card">
        <div className="card-body">
        <div style={{ display: 'flex' }}>
          <Link to="ManageItem"  className='add_link'>
          <button style={{backgroundColor:'white',border:'none',color:'blue'}}>Add Item</button>
          {/* <a href='deliveryBoy/managedeliveryBoy'>Add Delivery Boy</a> */}
              </Link>
            </div><br />
          <div style={{ display: 'flex' }}>
       </div>
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
              title="Item"
              
              columns={[
                { title: 'S.No #', render: rowData => <button style={{backgroundColor:'white',border:'none',color:'blue'}}>{rowData.tableData.id+1}</button> },
                  { title: 'Item Image', field: 'imageUrl', render: rowData => <a href={`http://${process.env.REACT_APP_IP}${rowData.itemImage}`} target="_blank"><img src={`http://${process.env.REACT_APP_IP}${rowData.itemImage}`} alt="CuisinesImage" style={{ width: 40, borderRadius: '50%' }} /></a> },
                { title: 'Item Name', render: rowData => rowData.itemName },
                { title: 'Item Description', render: rowData => rowData.itemDescription },
                // { title: 'Restaurant', render: rowData => <div><label>{rowData.restaurant.restaurantName}</label><br/><label>{rowData.restaurant.restaurantContact}</label><br/><label>{rowData.restaurant.ownerName}</label></div> },
                { title: 'Category', render: rowData => rowData.category.categoryName },
                // { title: 'Addons', render: rowData =>   rowData.itemAddon.addon.map((item, index) => { rowData.itemAddon.addon[item].add })},
                { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0] },
                {
                    title: 'Actions', render: rowData => 
                    <div style={{ display: 'flex' }}>
                        <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.itemStatus === true ? "true" : ""} onClick={() => activedeactive(rowData.itemId, rowData.itemStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                    </div>
                },
                {
                    title: 'Approval Status', render: rowData => 
                    <div>
                      {rowData.approvalStatus == 1 ? <label class="badge badge-info hand_cursor">Submited</label> : ""}
                      {rowData.approvalStatus == 2 ? <label class="badge badge-danger hand_cursor">In Review</label> : ""}
                      {rowData.approvalStatus == 3 ? <label class="badge badge-success hand_cursor">Approved</label> : ""}
                      {rowData.approvalStatus == 4 ? <label style={{backgroundColor:"red"}} class="badge badge-success hand_cursor">Rejected</label> : ""}
                      </div> 
                    // <div style={{ display: 'flex' }}>
                    //  <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.approvalStatus === 1 ? "true" : ""} onClick={() => activedeactiveitemapprovalStatus(rowData.itemId, rowData.approvalStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                    // </div>
                },
                {
                      title: 'Actions', render: rowData => 
                      <div style={{ display: 'flex' }}>
                        {rowData.approvalStatus == 3 ?  <Link to={"/Partner/item/ManageItem/" + rowData.itemId}><a><label style={{marginRight:"5px"}} class="badge badge-success hand_cursor">Edit</label></a></Link> : ""}
                        {rowData.approvalStatus != 3 ? 
                        /* <a onClick={() => deletecategoryHandler(rowData.itemId,rowData.itemImage)}><label style={{cursor:'pointer'}} class="badge badge-danger delete_red hand_cursor">Delete</label></a>  */
                        "No Action"
                        : ""}
                      </div>
                },
              ]}
              data={
                Items
              }
              options={{
                exportButton: true,
                headerStyle: {
                  borderBlockColor: 'orange',
                  // backgroundColor: 'lightgrey',
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

export default Item;