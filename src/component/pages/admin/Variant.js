import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { getvariant,deletevariant } from '../../../actions/variantAction'
import swal from 'sweetalert';
import { DELETE_VARIANT_RESET } from "../../../constants/variantConstants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useParams } from "react-router-dom";

const Variant = ({history}) => {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const params = useParams();
  const {variant,error,loading} = useSelector((state) => state.variant);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deletevariant);
    const deletevariantHandler = async (id) => {
      dispatch(deletevariant(id));
      dispatch(getvariant());
      swal({
        title: "Variant Deleted Successfully",
        text: error,
        icon: "info",
       });
      navigate("/partner/Variant");
    }

    const activedeactivevariantStatus = async (id, status) => {
      const newstatus = (status === true ? "false" : "true");
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const result = await axios.put(`http://${process.env.REACT_APP_IP}/api/variant/${id}/${newstatus}`, '', '');
      // return alert(JSON.stringify(result));
      if (result.data.message === "Success") {
        swal({
          title: "Variant",
          text: "The Variant Status Update",
          icon: "info",
          // dangerMode: true
        });
        dispatch(getvariant(params.id));
        // getScopes();
      } else {
        swal({
          title: "Variant",
          text: result.errors[0].msg,
          icon: "warning",
          dangerMode: true
        });
      }
    }

    useEffect(() => {
      dispatch(getvariant(params.id));
      if (isDeleted) {
        swal({
          title: "Variant Deleted Successfully",
          text: error,
          icon: "info",
      });
        dispatch({ type: DELETE_VARIANT_RESET });
      }
    }, [dispatch, alert, error, deleteError, history, isDeleted]);

    const defaultMaterialTheme = createTheme();
    return (
        <div>
        <div className="card">
          <div className='p-3' style={{ cursor: 'pointer' }}>
            <a className="card-title" style={{ textDecoration: 'None' }} href='/admin/dashboard'>Dashbord/</a><a className="card-title" style={{ fontWeight: 'bold', color: 'grey' }}>Variant</a>
          </div>
        </div><br />
        <div className="card">
          <div className="card-body">
          <div style={{ display: 'flex' }}>
            <Link to="ManageVariant"  className='add_link'>
            <button style={{backgroundColor:'white',border:'none',color:'blue'}}>Add Variant</button>
            {/* <a href='deliveryBoy/managedeliveryBoy'>Add Delivery Boy</a> */}
                </Link>
              </div><br />
            <div style={{ display: 'flex' }}>
         </div>
  
              <ThemeProvider theme={defaultMaterialTheme}>
                <MaterialTable
                  // style={{ border: '2px solid lightgray', boxShadow: 'none' }}
                  title="Variant"
                  columns={[
                    { title: 'S.No #', render: rowData => rowData.tableData.id + 1 },
                    { title: 'Variant Name', field: 'variantName' },
                    { title: 'Variant UOM', field: 'variantuom' },
                    { title: 'Variant Price', field: 'variantPrice' },
                    { title: 'Variant Sales Price', field: 'variantSalesPrice' },
                    { title: 'Added On', render: rowData => rowData.createdAt.split('T')[0] },
                    {
                    title: 'Variant Status', render: rowData => 
                    <div style={{ display: 'flex' }}>
                     <div class="form-check form-switch ml-5 mt-0"><input style={{ backgroundColor: 'orange' }} class="form-check-input" checked={rowData.variantStatus === true ? "true" : ""} onClick={() => activedeactivevariantStatus(rowData.variantId, rowData.variantStatus)} type="checkbox" role="switch" id="flexSwitchCheckChecked" /></div>
                    </div>
                  },
                  ]}
                  data={
                    variant
                  }
                  options={{
                    exportButton: true,
                    exportAllData:true,
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

export default Variant;