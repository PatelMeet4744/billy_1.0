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
      }
    
      const ApproveStatusitemapprovalStatus = async (id,status) => {
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/item/approval/${id}/${status}`, '', '');
        // // // return alert(JSON.stringify(result));
        if (result.data.message === "Success") {
          swal({
            title: "Item",
            text: "The Addon Approval Status Update",
            icon: "info",
          });
          dispatch(getItems());
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
        dispatch(getItems());
    }, []);

    const id = "641c6e05c4494b1dd29e225f";
    // {Items.map((item, index) => {
    //     if (item.restaurant == id) {
    //         alert(item.itemName)
    //     }
    // }
    // )}      
    function Description(text){
      if (text.length > 20){
        return text.substring(0,20) + " ..."
      }
      return text
    }

    const defaultMaterialTheme = createTheme();
    return (
        <div>
      <div className="card">
        <div className='p-3' style={{ cursor: 'pointer' }}>
          <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Item</a>
        </div>
      </div><br />
      <div className="card">
        <div className="card-body">
   
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
              title="Item"
              
              columns={[
                { title: 'S.No #', render: rowData => <Link to={"itemDetail/" + rowData.itemId} className='add_link'><button style={{backgroundColor:'white',border:'none',color:'blue'}}>{rowData.tableData.id+1}</button></Link>,width:"2%" },
                  { title: 'Item Image', field: 'imageUrl', render: rowData => <a href={`http://${process.env.REACT_APP_IP}${rowData.itemImage}`} target="_blank"><img src={`http://${process.env.REACT_APP_IP}${rowData.itemImage}`} alt="CuisinesImage" style={{ width: 40, borderRadius: '50%' }} /></a> },
                { title: 'Item Name', render: rowData => rowData.itemName },
                { title: 'Item Description', render: rowData => Description(rowData.itemDescription) },
                { title: 'Restaurant', render: rowData => <div><label>{rowData.restaurant.restaurantName}</label><br/><label>{rowData.restaurant.restaurantContact}</label><br/><label>{rowData.restaurant.ownerName}</label></div> },
                { title: 'Category', render: rowData => rowData.category.categoryName },
                // { title: 'Addons', render: rowData =>   rowData.itemAddon.addon.map((item, index) => { rowData.itemAddon.addon[item].add })},
                { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0] },
                {
                    title: 'Approve Status', render: rowData => 
                      <select name="cars" disabled={rowData.approvalStatus == 3 ? true : false} onChange={(e) => ApproveStatusitemapprovalStatus(rowData.itemId,e.target.value)} >
                        <option selected={rowData.approvalStatus == 1 ? true : false} value="1">Submission Pending</option>
                        <option selected={rowData.approvalStatus == 2 ? true : false} value="2">In Review</option>
                        <option selected={rowData.approvalStatus == 3 ? true : false} value="3">Approved</option>
                        <option selected={rowData.approvalStatus == 4 ? true : false} value="4">Rejected</option>
                      </select>
                    // <div style={{ display: 'flex' }}>
                    //     <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.itemStatus === true ? "true" : ""} onClick={() => activedeactive(rowData.itemId, rowData.itemStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                    // </div>
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