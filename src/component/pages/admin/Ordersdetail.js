import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getorders } from '../../../actions/orderAction';
import Loader from '../../layout/Loader/Loader';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Ordersdetail = ({ history }) => {
    const dispatch = useDispatch();
    
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAddress, setrestaurantAddress] = useState("");
    const [restaurantContact, setrestaurantContact] = useState("");
    const [restaurantCity, setrestaurantCity] = useState("");

    const [itemName, setitemName] = useState("");
    const [itemType, setitemType] = useState("");
    const [itemDescription, setitemDescription] = useState("");
    const [itemImage, setitemImage] = useState("");

    const [variantName, setvariantName] = useState("");
    const [variantPrice, setvariantPrice] = useState("");
    const [addon, setaddon] = useState("");
    const [addextra, setaddextra] = useState("");

    const [category, setcategory] = useState("");
    
    const [customerName, setCustomerName] = useState("");
    const [customerEmailID, setCustomerEmailID] = useState("");
    const [customerContact, setCustomerContact] = useState("");
    
    const [itemcategoyname, setItemcategoyname] = useState("");

    const [itemAddontitle, setItemAddontitle] = useState("");
    const [itemAddonaddon, setItemAddonaddon] = useState("");

    const [orderFinalPrice, setOrderFinalPrice] = useState("");

    const [itemAddextratitle, setItemAddextratitle] = useState("");
    const [itemAddextraaddextra, setItemAddextraaddextra] = useState("");
    const [orderQty, setorderQty] = useState("");


    let indexNO = 0;
    const params = useParams();
    const {
        Orders,
        error,
        loading,
      } = useSelector((state) => state.Orders);

      useEffect(() => {
        
        dispatch(getorders());
        // alert(indexNO)

        setitemName(Orders[indexNO].item.itemName)
        setitemType(Orders[indexNO].item.itemType)
        setitemDescription(Orders[indexNO].item.itemDescription)
        setitemImage(Orders[indexNO].item.itemImage)

        setorderQty(Orders[indexNO].orderQty)

        setCustomerName(Orders[indexNO].orderMaster.customer.customerName)
        setCustomerEmailID(Orders[indexNO].orderMaster.customer.customerEmailID)
        setCustomerContact(Orders[indexNO].orderMaster.customer.customerContact)

        setvariantName(Orders[indexNO].variant.variantName + "(" + Orders[indexNO].variant.variantuom + ")")
        setvariantPrice(Orders[indexNO].variant.variantSalesPrice)

        setRestaurantName(Orders[indexNO].item.restaurant.restaurantName)
        setrestaurantContact(Orders[indexNO].item.restaurant.restaurantContact)

        setOrderFinalPrice(Orders[indexNO].orderMaster.orderTotalPrice)

        setaddon(Orders[indexNO].addon)
        setaddextra(Orders[indexNO].addextra)

        // return alert(JSON.stringify(Orders[indexNO].variant.variantName))
      }, [dispatch, alert, error, , history]);

    return (
      <div>
  <span className="preheader">This is an invoice for your purchase on {'{'}{'{'} purchase_date {'}'}{'}'}. Please submit payment by {'{'}{'{'} due_date {'}'}{'}'}</span>
  {
    Orders.map((item,index) => {
          if (item._id == params.id) {
            indexNO = index;
            {/* alert(index); */}
        }
        })
  }
  <table className="email-wrapper" width="100%" cellPadding={0} cellSpacing={0} role="presentation">
    <tbody><tr>
        <td align="center">
          <table className="email-content" width="100%" cellPadding={0} cellSpacing={0} role="presentation">
            <tbody><tr>
                {/* <td className="email-masthead">
                  <a href="https://example.com" className="f-fallback email-masthead_name">
                    {itemName}
                  </a>
                </td> */}
              </tr>
              {/* Email Body */}
              <tr>
                <td className="email-body" width="100%" cellPadding={0} cellSpacing={0}>
                  <table className="email-body_inner" align="center" width={570} cellPadding={0} cellSpacing={0} role="presentation">
                    {/* Body content */}
                    <tbody><tr>
                        <td className="content-cell">
                          <div className="f-fallback">
                            <center><h1>{customerName}</h1></center>
                            {/* <p>This is an invoice for your recent purchase.</p> */}
                            <table className="attributes" width="100%" cellPadding={0} cellSpacing={0} role="presentation">
                              <tbody><tr>
                                  <td className="attributes_content">
                                    <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
                                      <tbody><tr>
                                          <td className="attributes_item">
                                            <span className="f-fallback">
                                              <strong>Restaurant Name:</strong> {restaurantName}
                                            </span>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className="attributes_item">
                                            <span className="f-fallback">
                                              <strong>Restaurant ContactNo:</strong> {restaurantContact}
                                            </span>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                  </td>
                                </tr>
                              </tbody></table>
                            {/* Action */}
                            <table className="purchase" width="100%" cellPadding={0} cellSpacing={0}>
                              <tbody><tr>
                                  <td colSpan={2}>
                                    <table className="purchase_content" width="100%" cellPadding={0} cellSpacing={0}>
                                      <tbody><tr>
                                          <th className="purchase_heading" align="left">
                                            <p className="f-fallback">Item</p>
                                          </th>
                                          <th className="purchase_heading" align="right">
                                            <p className="f-fallback">Amount</p>
                                          </th>
                                        </tr>
                                        <tr>
                                          <td width="80%" className="purchase_item"><span className="f-fallback">{itemName}</span></td>
                                          <td className="align-right" width="20%"><span className="f-fallback">QTY : {orderQty}</span></td>
                                        </tr>
                                        <tr>
                                          <td width="80%" className="purchase_item"><span className="f-fallback">&emsp;{variantName}</span></td>
                                          <td className="align-right" width="20%"><span className="f-fallback">{variantPrice}</span></td>
                                        </tr>
                                        {addon ?
                                                                                addon.map((element) => (
                                                                                    <tr>
                                                                                        <td width="80%" className="purchase_item"><span className="f-fallback">&emsp;{element.addonName}</span></td>
                                                                                        <td className="align-right" width="20%"><span className="f-fallback">{element.addonFinalPrice}</span></td>
                                                                                    </tr>
                                                                                ))
                                                                                : ""}
                                                                                {addextra ?
                                                                                addextra.map((element) => (
                                                                                    <tr>
                                                                                        <td width="80%" className="purchase_item"><span className="f-fallback">&emsp;{element.addextraName}</span></td>
                                                                                        <td className="align-right" width="20%"><span className="f-fallback">{element.addextraFinalPrice}</span></td>
                                                                                    </tr>
                                                                                ))
                                                                                : ""}
                                                                                <tr><td width="80%" style={{borderTop:'0px solid #EAEAEC'}} className="purchase_footer" valign="middle">
                                            <p className="f-fallback purchase_total purchase_total--label"></p>
                                          </td>
                                          {/* <td width="30%" style={{borderTop:'0px solid #EAEAEC'}} className="purchase_footer" valign="middle">
                                            <p className="f-fallback purchase_total">{orderFinalPrice/orderQty}</p>
                                          </td> */}
                                        </tr>                                   
                                        <tr><td width="80%" style={{borderTop:'0px solid #EAEAEC'}} className="purchase_footer" valign="middle">
                                            <p className="f-fallback purchase_total purchase_total--label">Total</p>
                                          </td>
                                          <td width="0%" style={{borderTop:'0px solid #EAEAEC'}} className="purchase_footer" valign="middle">
                                            <p className="f-fallback purchase_total">{orderQty} x {orderFinalPrice/orderQty} = {orderFinalPrice}</p>
                                          </td>
                                        </tr>
                                      </tbody></table>
                                  </td>
                                </tr>
                              </tbody></table>
                            <p>If you have any questions about this invoice, simply reply to this email or reach out to our <a href="{{support_url}}">support team</a> for help.</p>
                            <p>Cheers,
                              <br />The [Product Name] Team</p>
                            {/* Sub copy */}
                          </div>
                        </td>
                      </tr>
                    </tbody></table>
                </td>
              </tr>
            </tbody></table>
        </td>
      </tr>
    </tbody></table>
</div>

    );
};

export default Ordersdetail;