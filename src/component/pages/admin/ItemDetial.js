import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleItems } from '../../../actions/ItemAction';
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import '../partner/fileupload.css';
import './itemdetail.css';

const ItemDetial = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAddress, setrestaurantAddress] = useState("");
    const [restaurantContact, setrestaurantContact] = useState("");
    const [restaurantCity, setrestaurantCity] = useState("");

    const [itemcategoyname, setItemcategoyname] = useState("");

    const [itemAddontitle, setItemAddontitle] = useState("");
    const [itemAddonaddon, setItemAddonaddon] = useState("");

    const [itemAddextratitle, setItemAddextratitle] = useState("");
    const [itemAddextraaddextra, setItemAddextraaddextra] = useState("");

    const [itemVariantvariant, setItemVariantvariant] = useState("");
    // alert(params.id)
    const {
        SingleItems,
        error,
        loading,
    } = useSelector((state) => state.singleItem);

    useEffect(() => {
        // alert(params.id)
        //   alert(indexNO);
        dispatch(getSingleItems(params.id));

        // alert(JSON.stringify(SingleItems.restaurant.restaurantImage));
        // alert(JSON.stringify(restaurant[0].restaurantImage));
        // alert(JSON.stringify(SingleItems.itemAddon.title));

        setItemcategoyname(SingleItems.category.categoryName)

        setItemAddontitle(SingleItems.itemAddon.title);
        setItemAddonaddon(SingleItems.itemAddon.addon);

        setItemAddextratitle(SingleItems.itemAddExtra.title);
        setItemAddextraaddextra(SingleItems.itemAddExtra.addextra);

        setItemVariantvariant(SingleItems.variant);

        setRestaurantName(SingleItems.restaurant.restaurantName);
        setrestaurantAddress(SingleItems.restaurant.restaurantAddress);
        setrestaurantCity(SingleItems.restaurant.restaurantCity);
        setrestaurantContact(SingleItems.restaurant.restaurantContact);
    }, []);

    return (
        <div>
            <table className="email-wrapper" width="50%" cellPadding={0} cellSpacing={0} role="presentation">
                <tbody><tr>
                    <td align="center">
                        <table className="email-content" width="50%" cellPadding={0} cellSpacing={0} role="presentation">
                            <tbody>
                                <tr>
                                    <td className="email-masthead">
                                        <a href="https://example.com" className="f-fallback email-masthead_name">
                                            {SingleItems.itemName}
                                        </a>
                                    </td>
                                </tr>
                                {/* Email Body */}
                                <tr>
                                    <td className="email-body" width="100%" cellPadding={0} cellSpacing={0}>
                                        <table className="email-body_inner" align="center" width={570} cellPadding={0} cellSpacing={0} role="presentation">
                                            {/* Body content */}
                                            <tbody><tr>
                                                <td className="content-cell">
                                                    <div className="f-fallback">
                                                        <center>
                                                            <img src={`http://${process.env.REACT_APP_IP}${SingleItems.itemImage}`} alt="Cuisines Banner" style={{ width: 200, height: 120 }} /><br></br>
                                                            </center>{/* <h1>Name {SingleItems.itemName}</h1> */}<br></br>
                                                            <div class="row">
                                                                <div class="col-sm">
                                                                <h2>Name</h2> <p>{SingleItems.itemName}</p>
                                                                <h2>Description</h2> <p>{SingleItems.itemDescription}</p>
                                                                <h2>Type</h2> <p>{SingleItems.itemType}</p>
                                                                </div>
                                                                <div class="col-sm" >
                                                                <h2>Category</h2> <p>{itemcategoyname}</p>
                                                                {/* <h2>Description</h2> <p>{SingleItems.itemDescription}</p>
                                                                <h2>Type</h2> <p>{SingleItems.itemType}</p> */}
                                                                </div>
                                                            </div>
                                                                
                                                        <table className="attributes" width="100%" cellPadding={0} cellSpacing={0} role="presentation">
                                                            <tbody><tr>
                                                                <td className="attributes_content">
                                                                    <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
                                                                        <tbody><tr>
                                                                            <td className="attributes_item">
                                                                                <span className="f-fallback">
                                                                                    <strong>Item Addons ({itemAddontitle})</strong>
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
                                                                <td colSpan={3}>
                                                                    <table className="purchase_content" width="100%" cellPadding={0} cellSpacing={0}>
                                                                        <tbody><tr>
                                                                            <th className="purchase_heading" align="left">
                                                                                <strong><p>Name</p></strong>
                                                                            </th>
                                                                            <th className="purchase_heading" align="right">
                                                                                <p className="f-fallback">Amount</p>
                                                                            </th>
                                                                        </tr>
                                                                            {itemAddonaddon ?
                                                                                itemAddonaddon.map((item) => (
                                                                                    <tr>
                                                                                        <td width="80%" className="purchase_item"><span className="f-fallback">{item.addonName}</span></td>
                                                                                        <td className="align-right" width="20%"><span className="f-fallback">{item.addonFinalPrice}</span></td>
                                                                                    </tr>
                                                                                ))
                                                                                : ""}
                                                                            <tr>
                                                                                {/* <td width="80%" className="purchase_footer" valign="middle">
                                            <p className="f-fallback purchase_total purchase_total--label">Total</p>
                                          </td>
                                          <td width="20%" className="purchase_footer" valign="middle">
                                            <p className="f-fallback purchase_total">{'{'}{'{'}total{'}'}{'}'}</p>
                                          </td> */}
                                                                            </tr>
                                                                        </tbody></table>
                                                                </td>
                                                            </tr>
                                                            </tbody></table>


                                                        <br></br>
                                                        <table className="attributes" width="100%" cellPadding={0} cellSpacing={0} role="presentation">
                                                            <tbody><tr>
                                                                <td className="attributes_content">
                                                                    <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
                                                                        <tbody><tr>
                                                                            <td className="attributes_item">
                                                                                <span className="f-fallback">
                                                                                    <strong>Item AddExtra ({itemAddextratitle})</strong>
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        </tbody></table>
                                                                </td>
                                                            </tr>
                                                            </tbody></table>
                                                        <table className="purchase" width="100%" cellPadding={0} cellSpacing={0}>
                                                            <tbody><tr>
                                                                <td colSpan={4}>
                                                                    <table width="100%" cellPadding={0} cellSpacing={0}>
                                                                        <tbody><tr>
                                                                            <th className="purchase_heading" align="left">
                                                                                <p className="f-fallback">Name</p>
                                                                            </th>
                                                                            <th className="purchase_heading" align="right">
                                                                                <p className="f-fallback">Amount</p>
                                                                            </th>
                                                                        </tr>
                                                                            {itemAddextraaddextra ?
                                                                                itemAddextraaddextra.map((item) => (
                                                                                    <tr>
                                                                                        <td width="80%" className="purchase_item"><span className="f-fallback">{item.addextraName}</span></td>
                                                                                        <td className="align-right" width="20%"><span className="f-fallback">{item.addextraFinalPrice}</span></td>

                                                                                    </tr>
                                                                                ))
                                                                                : ""}
                                                                            <tr>
                                                                            </tr>
                                                                        </tbody></table>


                                                                </td>
                                                            </tr>
                                                            </tbody></table>


                                                        <br></br>
                                                        <table className="attributes" width="100%" cellPadding={0} cellSpacing={0} role="presentation">
                                                            <tbody><tr>
                                                                <td className="attributes_content">
                                                                    <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
                                                                        <tbody><tr>
                                                                            <td className="attributes_item">
                                                                                <span className="f-fallback">
                                                                                    <strong>Item Variant ({itemAddextratitle})</strong>
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        </tbody></table>
                                                                </td>
                                                            </tr>
                                                            </tbody></table>
                                                        <table className="purchase" width="100%" cellPadding={0} cellSpacing={0}>
                                                            <tbody><tr>
                                                                <td colSpan={4}>
                                                                    <table width="100%" cellPadding={0} cellSpacing={0}>
                                                                        <tbody><tr>
                                                                            <th className="purchase_heading" align="left">
                                                                                <p className="f-fallback">Name</p>
                                                                            </th>
                                                                            <th className="purchase_heading" align="right">
                                                                                <p className="f-fallback">Amount</p>
                                                                            </th>
                                                                        </tr>
                                                                            {itemVariantvariant ?
                                                                                itemVariantvariant.map((item) => (
                                                                                    <tr>
                                                                                        <td width="80%" className="purchase_item"><span className="f-fallback">{item.variantName}</span></td>
                                                                                        <td className="align-right" width="20%"><span className="f-fallback">{item.variantSalesPrice}</span></td>

                                                                                    </tr>
                                                                                ))
                                                                                : ""}
                                                                            <tr>
                                                                            </tr>
                                                                        </tbody></table>


                                                                </td>
                                                            </tr>
                                                            </tbody></table>
                                                        {/* <p>If you have any questions about this invoice, simply reply to this email or reach out to our <a href="{{support_url}}">support team</a> for help.</p>
                            <p>Cheers,
                              <br />The [Product Name] Team</p> */}
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

        // <div class="row">
        // <h4 class="grid_title ml10 ml15">Restaurant Details</h4>
        // <div class="col-12 grid-margin stretch-card">
        //     <div class="card">
        //         <div class="card-body"><h6>Restaurant Details</h6>
        //             <form className="pt-3">
        //             <div style={{ display: 'flex' }}>
        //                         <div className="container">
        //                             <div className="row">
        //                                 <div className="col-sm-6">
        //                                 <div className="form-group">
        //                                         <label for="exampleInputName1">Name</label>
        //                                         <input type="text" className="form-control form-control-lg" placeholder="Name" name="deliveryBoyName" value={restaurantName} readOnly />
        //                                     </div>
        //                                     <div className="form-group">
        //                                         <label for="exampleInputMobilel3" required>Mobile Number</label>
        //                                         <input type="tel" className="form-control form-control-lg" pattern="[1-9]{1}[0-9]{9}" placeholder="Mobile Number" name="deliveryBoyContact" value={restaurantContact} readOnly />
        //                                     </div>
        //                                 </div>
        //                                 <div className="col-sm-6">
        //                                     <div className="form-group">
        //                                         <label for="exampleInputMobilel3" required>Address</label>
        //                                         <input type="tel" className="form-control form-control-lg" pattern="[1-9]{1}[0-9]{9}" placeholder="Mobile Number" name="deliveryBoyContact" value={restaurantAddress} readOnly />
        //                                     </div>
        //                                     <div className="form-group">
        //                                         <label for="exampleInputMobilel3" required>City</label>
        //                                         <input type="tel" className="form-control form-control-lg" pattern="[1-9]{1}[0-9]{9}" placeholder="Mobile Number" name="deliveryBoyContact" value={restaurantCity} readOnly />
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>

        //                     </div>



        //             </form>
        //         </div>
        /* <div class="card-body"><h6>Owner Details</h6>
            <form className="pt-3">
                {restaurant.map((item, index) => {
                    if (item.restaurantId == params.id) {
                        // alert(item.restaurantId);
                        indexNO = index;
                        // alert(index);
                    }
                }
                )}<div style={{ display: 'flex' }}>
                     <div className="container">
                        <div className="row">
                            <div className="col-sm-6">

                                <div className="form-group">
                                    <label for="exampleInputName1">Owner Name</label>
                                    <input type="text" className="form-control form-control-lg" placeholder="Name" name="deliveryBoyName" value={restaurant[indexNO].ownerName} readOnly />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputMobilel3" required>Owner ContactNo.</label>
                                    <input type="tel" className="form-control form-control-lg" pattern="[1-9]{1}[0-9]{9}" placeholder="Mobile Number" name="deliveryBoyContact" value={restaurant[indexNO].ownerContact} readOnly />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label for="exampleInputMobilel3" required>Email ID</label>
                                    <input type="tel" className="form-control form-control-lg" pattern="[1-9]{1}[0-9]{9}" placeholder="Mobile Number" name="deliveryBoyContact" value={restaurant[indexNO].ownerEmailID} readOnly />
                                </div>
                                <div className="form-group">
                                    <label for="exampleInputMobilel3" required>City</label>
                                    <input type="tel" className="form-control form-control-lg" pattern="[1-9]{1}[0-9]{9}" placeholder="Mobile Number" name="deliveryBoyContact" value={restaurant[indexNO].restaurantCity} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>



            </form>
        </div> */

        /* <div class="card-body"><h6>Documnet Details</h6>
            <form className="pt-3">
                {restaurant.map((item, index) => {
                    if (item.restaurantId == params.id) {
                        // alert(item.restaurantId);
                        indexNO = index;
                        // alert(index);
                    }
                }
                )}<div style={{ display: 'flex' }}>
                     <div className="container">
                        <div className="row">
                            <div className="col-sm-6">

                                {   <a href={`http://localhost:4000${restaurant[indexNO].documents['gstCertificate']}`} style={{textDecoration:'none'}} target="_blank">
                                 <li className="file-item">
                                    <i className="mdi mdi-file" />
                                    <p style={{color:'black'}} className="ml-4">Gst Certificate</p>
                                </li></a>
                                }
                                {   <a href={`http://localhost:4000${restaurant[indexNO].documents['fssaiCertificate']}`} style={{textDecoration:'none'}} target="_blank">
                                 <li className="file-item">
                                    <i className="mdi mdi-file" />
                                    <p style={{color:'black'}} className="ml-4">Fssai Certificate</p>
                                </li></a>
                                }
                                {   <a href={`http://localhost:4000${restaurant[indexNO].documents['sampleBill']}`} style={{textDecoration:'none'}} target="_blank">
                                 <li className="file-item">
                                    <i className="mdi mdi-file" />
                                    <p style={{color:'black'}} className="ml-4">Sample Bill</p>
                                </li></a>
                                }
                            </div>
                            <div className="col-sm-6">
                            {   <a href={`http://localhost:4000${restaurant[indexNO].documents['sampleMenu']}`} style={{textDecoration:'none'}} target="_blank">
                                 <li className="file-item">
                                    <i className="mdi mdi-file" />
                                    <p style={{color:'black'}} className="ml-4">Sample Menu</p>
                                </li></a>
                                }
                                {   <a href={`http://localhost:4000${restaurant[indexNO].documents['ownerPan']}`} style={{textDecoration:'none'}} target="_blank">
                                 <li className="file-item">
                                    <i className="mdi mdi-file" />
                                    <p style={{color:'black'}} className="ml-4">Owner </p>
                                </li></a>
                                }
                            </div>
                        </div>
                    </div>

                </div>



            </form>
        </div> */

        /* <div class="card-body"><h6>Documnet Details</h6>
            <form className="pt-3">
                {restaurant.map((item, index) => {
                    if (item.restaurantId == params.id) {
                        // alert(item.restaurantId);
                        indexNO = index;
                        // alert(index);
                    }
                }
                )}<div style={{ display: 'flex' }}>
                     <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                {restaurant[indexNO].restaurantTiming['monday'][0] &&<>
                                <p>Monday</p>
                                <div className="row">
                                 <div className="col-sm-6">
                                 <li className="file-item" style={{marginTop:'-5px'}}>
                                    <p style={{color:'black'}} className="ml-4">{restaurant[indexNO].restaurantTiming['monday'][0]}</p>
                                </li></div>
                                <div className="col-sm-6">
                                 <li className="file-item" style={{marginTop:'-5px'}}>
                                    <p style={{color:'black'}} className="ml-4">{restaurant[indexNO].restaurantTiming['monday'][1]}</p>
                                </li></div>
                                </div>
                                </>
                                }
                                
                                {restaurant[indexNO].restaurantTiming['wednesday'][0] &&<>
                                <p>Wednesday</p>
                                <div className="row">
                                 <div className="col-sm-6">
                                 <li className="file-item" style={{marginTop:'-5px'}}>
                                    <p style={{color:'black'}} className="ml-4">{restaurant[indexNO].restaurantTiming['wednesday'][0]}</p>
                                </li></div>
                                <div className="col-sm-6">
                                 <li className="file-item" style={{marginTop:'-5px'}}>
                                    <p style={{color:'black'}} className="ml-4">{restaurant[indexNO].restaurantTiming['wednesday'][1]}</p>
                                </li></div>
                                </div>
                                </>
                                }
                                
                                {restaurant[indexNO].restaurantTiming['friday'][0] &&<>
                                <p>Friday</p>
                                <div className="row">
                                 <div className="col-sm-6">
                                 <li className="file-item" style={{marginTop:'-5px'}}>
                                    <p style={{color:'black'}} className="ml-4">{restaurant[indexNO].restaurantTiming['friday'][0]}</p>
                                </li></div>
                                <div className="col-sm-6">
                                 <li className="file-item" style={{marginTop:'-5px'}}>
                                    <p style={{color:'black'}} className="ml-4">{restaurant[indexNO].restaurantTiming['friday'][1]}</p>
                                </li></div>
                                </div>
                                </>
                                }
                                {restaurant[indexNO].restaurantTiming['sunday'][0] &&<>
                                <p>Sunday</p>
                                <div className="row">
                                 <div className="col-sm-6">
                                 <li className="file-item" style={{marginTop:'-5px'}}>
                                    <p style={{color:'black'}} className="ml-4">{restaurant[indexNO].restaurantTiming['sunday'][0]}</p>
                                </li></div>
                                <div className="col-sm-6">
                                 <li className="file-item" style={{marginTop:'-5px'}}>
                                    <p style={{color:'black'}} className="ml-4">{restaurant[indexNO].restaurantTiming['sunday'][1]}</p>
                                </li></div>
                                </div>
                                </>
                                }
                            </div>
                            <div className="col-sm-6">
                            {restaurant[indexNO].restaurantTiming['tuesday'][0] &&<>
                                <p>Tuesday</p>
                                <div className="row">
                                 <div className="col-sm-6">
                                 <li className="file-item" style={{marginTop:'-5px'}}>
                                    <p style={{color:'black'}} className="ml-4">{restaurant[indexNO].restaurantTiming['tuesday'][0]}</p>
                                </li></div>
                                <div className="col-sm-6">
                                 <li className="file-item" style={{marginTop:'-5px'}}>
                                    <p style={{color:'black'}} className="ml-4">{restaurant[indexNO].restaurantTiming['tuesday'][1]}</p>
                                </li></div>
                                </div>
                                </>
                                }
                                {restaurant[indexNO].restaurantTiming['thursday'][0] &&<>
                                <p>Thursday</p>
                                <div className="row">
                                 <div className="col-sm-6">
                                 <li className="file-item" style={{marginTop:'-5px'}}>
                                    <p style={{color:'black'}} className="ml-4">{restaurant[indexNO].restaurantTiming['thursday'][0]}</p>
                                </li></div>
                                <div className="col-sm-6">
                                 <li className="file-item" style={{marginTop:'-5px'}}>
                                    <p style={{color:'black'}} className="ml-4">{restaurant[indexNO].restaurantTiming['thursday'][1]}</p>
                                </li></div>
                                </div>
                                </>
                                }
                                {restaurant[indexNO].restaurantTiming['saturday'][0] &&<>
                                <p>Saturday</p>
                                <div className="row">
                                 <div className="col-sm-6">
                                 <li className="file-item" style={{marginTop:'-5px'}}>
                                    <p style={{color:'black'}} className="ml-4">{restaurant[indexNO].restaurantTiming['saturday'][0]}</p>
                                </li></div>
                                <div className="col-sm-6">
                                 <li className="file-item" style={{marginTop:'-5px'}}>
                                    <p style={{color:'black'}} className="ml-4">{restaurant[indexNO].restaurantTiming['saturday'][1]}</p>
                                </li></div>
                                </div>
                                </>
                                }
                            </div>
                        </div>
                    </div>

                </div>



            </form>
        </div> */


        //         </div>
        //     </div>
        // </div>
    );
};

export default ItemDetial;