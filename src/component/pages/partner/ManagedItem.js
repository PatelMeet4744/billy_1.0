import React, { useState, useEffect, version } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import { Restaurant } from '@material-ui/icons';
import { getSingleItems } from '../../../actions/ItemAction';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ManagedItem = () => {
    const [itemName, setItemName] = useState("");
    const [category, setCategory] = useState("");
    const [itemType, setItemType] = useState("veg");
    const [itemDescription, setItemDescription] = useState("");
    const [itemAddon, setItemAddon] = useState("");
    const [itemAddExtra, setItemAddExtra] = useState("");
    const [itemImage, setItemImage] = useState("");
    const [variant, setVariant] = useState("");

    const [selectedvariant, setSelectedvariant] = useState("");

    const navigate = useNavigate();
    const [itemAddExtratitle, setItemAddExtratitle] = useState("");
    const [itemAddExtraType, setItemAddExtraType] = useState("optional");
    const [addextras, setAddExtras] = useState("");

    const dispatch = useDispatch();
    const [itemAddOntitle, setItemAddOntitle] = useState("");
    const [itemAddOnType, setItemAddOnType] = useState("optional");
    const [addons, setAddOns] = useState("");

    const [dropcategory_Data, setDropcategory_Data] = useState([]);
    const [dropaddon_Data, setDropaddon_Data] = useState([]);
    const [dropaddextra_Data, setDropaddextra_Data] = useState([]);
    const [dropvariant_Data, setDropvariant_Data] = useState([]);
    const restaurantId = sessionStorage.getItem('restaurantId');
    const [errors, setError] = useState("");
    const params = useParams();

    const {
        SingleItems,
        error,
        loading,
    } = useSelector((state) => state.singleItem);
    
    useEffect(() => {
        // alert(params.id)

        if(params.id){
            if(SingleItems && SingleItems.itemId !== params.id){
                dispatch(getSingleItems(params.id));
            }else
            {
                setItemName(SingleItems.itemName)
                setItemType(SingleItems.itemType)
                setItemDescription(SingleItems.itemDescription)
                setItemImage(SingleItems.itemImage)
                setCategory(SingleItems.category)
                // alert(JSON.stringify(category))
                setVariant(SingleItems.variant)            
                setAddOns(SingleItems.itemAddon.addon)
                setItemAddOntitle(SingleItems.itemAddon.title)
                setItemAddOnType(SingleItems.itemAddon.customerSelection)

                setAddExtras(SingleItems.itemAddExtra)
                setItemAddExtratitle(SingleItems.itemAddExtra.title)
                setItemAddExtraType(SingleItems.itemAddExtra.customerSelection)   
            }
        }

        // if (!SingleItems && SingleItems.itemId !== params.id) {
        //     dispatch(getSingleItems(params.id));
        // } else {
            
        // }

        fetchCategory()
        fetchAddons()
        fetchAddextra()
        fetchVariant()
        Selectedvariant()
    }, [SingleItems]);

    const Selectedvariant = async () => {
        // setSelectedvariant([{"variantId":"631df95d3e377fc32fa4c1be","variantName":"Regular(269)"},{"variantId":"631edb5df38953157155c88f","variantName":"Medium(529)"}]);
    }

    const fetchCategory = async () => {
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };
        const url = `http://${process.env.REACT_APP_IP}/api/category?restaurant=${restaurantId}`;
        try {
            const response = await fetch(url, config);
            const json = await response.json();
            let result_Output = json.data;
            
            var categoryList = [];
            result_Output.map(value => {
                if (value.approvalStatus == 3 && value.categoryStatus == true) {
                    categoryList.push({
                        "categoryId": value.categoryId,
                        "categoryName": value.categoryName
                    });
                    // alert(JSON.stringify(addextaList));
                }
            });
            setDropcategory_Data(categoryList.map(e => ({
                categoryId: e.categoryId,
                categoryName: e.categoryName
            })))
            console.log(dropcategory_Data);
        } catch (error) {
            console.log("error", error);
        }
    };

    const fetchAddons = async () => {
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };
        const url = `http://${process.env.REACT_APP_IP}/api/addon?restaurant=${restaurantId}`;
        try {
            const response = await fetch(url, config);
            const json = await response.json();
            let result_Output = json.data;
            var addonList = [];
            result_Output.map(value => {
                if (value.approvalStatus == 3 && value.addonStatus == true) {
                    addonList.push({
                        "addonId": value.addonId,
                        "addonName": value.addonName
                    });
                    // alert(JSON.stringify(addextaList));
                }
            });
            setDropaddon_Data(addonList.map(e => ({
                addonId: e.addonId,
                addonName: e.addonName
            })))
            console.log(dropaddon_Data);
        } catch (error) {
            console.log("error", error);
        }
    };

    const fetchAddextra = async () => {
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };
        const url = `http://${process.env.REACT_APP_IP}/api/addextra?restaurant=${restaurantId}`;
        try {
            const response = await fetch(url, config);
            const json = await response.json();
            let result_Output = json.data;
            // alert(JSON.stringify(result_Output.addextraId)); 
            var addextaList = [];
            result_Output.map(value => {
                if (value.approvalStatus == 3 && value.addextraStatus == true) {
                    addextaList.push({
                        "addextraId": value.addextraId,
                        "addextraName": value.addextraName
                    });
                    // alert(JSON.stringify(addextaList));
                }
            });
            setDropaddextra_Data(addextaList.map(e => ({
                addextraId: e.addextraId,
                addextraName: e.addextraName
            })))

            console.log(dropaddextra_Data);
        } catch (error) {
            console.log("error", error);
        }
    };

    const fetchVariant = async () => {
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };
        const url = `http://${process.env.REACT_APP_IP}/api/variant?restaurant=${restaurantId}`;
        try {
            const response = await fetch(url, config);
            const json = await response.json();
            let result_Output = json.data;
            // alert(result_Output);
            // result_Output.map(value => {
            //     if(value.approvalStatus == 3){
            setDropvariant_Data(result_Output.map(value => ({
                variantId: value.variantId,
                variantName: value.variantName + "(" + value.variantSalesPrice + ")"
            })))
            //     }
            // });
            console.log(dropaddextra_Data);
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleCuisines = (e) => {
        const setdddata = e;
        setCategory(setdddata.map(item => item.categoryId).join(', '));
        console.log(category)
        // alert(category);
    }

    const handleaddons = (e) => {
        const setdddata = e;
        setAddOns(setdddata.map(item => item.addonId).join(', '));
        console.log(addons)
        // alert(addons);
    }

    const handleaddextras = (e) => {
        const setdddata = e;
        setAddExtras(setdddata.map(item => item.addextraId).join(', '));
        console.log(addextras)
        // alert(addextras);
    }

    const handlevariant = (e) => {
        const setdddata = e;
        // alert(JSON.stringify(e));
        setVariant(setdddata.map(item => item.variantId).join(', '));
        console.log(variant)
        Selectedvariant()
        // alert(variant);
    }

    const handlephoto = (e) => {
        // if(e.target.files[0].name.split('.').pop() == "png")
        setItemImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!itemName || !itemDescription || !itemAddExtratitle || !itemAddOntitle) {
            setError(true);
            // alert("SomeField are required");
            return false;
        }

        if(params.id){
            // alert("Update")
        }else{
            
        // return alert(variant);
        const itemformData = new FormData();
        itemformData.append('restaurant', restaurantId);
        itemformData.append('itemImage', itemImage);
        itemformData.append('category', category);
        itemformData.append('itemName', itemName);
        itemformData.append('itemType', itemType);
        itemformData.append('itemDescription', itemDescription);


        itemformData.append('variant', variant);

        // alert(category)
        const addonformData = new FormData();
        addonformData.append('title', itemAddOntitle);
        addonformData.append('customerSelection', itemAddOnType);
        addonformData.append('addon', addons);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
            axios.defaults.headers.common["Authorization"] = token;
            const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/itemaddon`, addonformData, config);
            // alert(JSON.stringify(data.data.itemAddonId))
            itemformData.append('itemAddon', JSON.stringify(data.data.itemAddonId).split('"')[1]);
            // let itemAddonId = JSON.stringify(data.data.itemAddonId);
            // alert(itemAddonId[1])
            // setItemAddon(itemAddonId[1]);
            // alert("Addon Id is")
            // alert(itemAddon)
            if (data.message === "Success") {
            }
            else {

            }

        } catch (error) {
            alert(error)
        }

        const addextraformData = new FormData();
        addextraformData.append('title', itemAddExtratitle);
        addextraformData.append('customerSelection', itemAddExtraType);
        addextraformData.append('addextra', addextras);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
            axios.defaults.headers.common["Authorization"] = token;
            const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/itemaddextra`, addextraformData, config);
            //   alert(JSON.stringify(data))
            itemformData.append('itemAddExtra', JSON.stringify(data.data.itemAddExtraId).split('"')[1]);
            //   let itemAddextraId = JSON.stringify(data.data.itemAddExtraId).split('"');
            // //   // alert(itemAddonId[1])
            //   setItemAddExtra(itemAddextraId[1]);
            //   alert("Addextra Id is")
            //   alert(itemAddExtra)
            if (data.message === "Success") {
            }
            else {

            }

        } catch (error) {
            alert(error)
        }
        //   console.warn(itemImage);  
        //   return alert(itemImage);



        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            const result = await axios.post(
                `http://${process.env.REACT_APP_IP}/api/item`,
                itemformData, config
            );
            // alert(JSON.stringify(result.data))
            if (result.data.message === "Success") {
                swal({
                    position: 'top',
                    icon: 'success',
                    title: 'Item Added',
                    text: "Item Added Successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/Partner/item');
            } else {
                swal({
                    position: 'top',
                    icon: 'info',
                    title: 'Item Added Fail',
                    text: result.data.data.message,
                })
            }
            //       const config = {
            //         headers: {
            //           'Content-Type': 'application/json'
            //         }
            //       };

            //   const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
            //   axios.defaults.headers.common["Authorization"] = token;
            //   const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/item`, itemformData, config);
            //   alert(JSON.stringify(data.data))
            //   if(data.message === "Success")
            //   {
            //     alert("Data Inserted successfully");
            //   }
            //   else{

            //   }

        } catch (error) {
            alert(error)
        }
        // const restaurantId = sessionStorage.getItem('restaurantId');
        // const formData = new FormData();
        // if(params.id){
        // // formData.append('restaurant', restaurantId);
        // formData.append('categoryName', category.categoryName);
        // }else{
        // formData.append('restaurant', restaurantId);
        // formData.append('categoryName', category.categoryName);
        // }
        // if(params.id){
        //     dispatch(updatecategory(params.id,formData));
        //     // swal({
        //     //     title: "Question",
        //     //     text: "The Question Update",
        //     //     icon: "info"
        //     //   });
        //     // navigate('/admin/question');
        //     // dispatch({type: UPDATE_QUESTION_RESET});
        // }else{
        //     dispatch(createcategory(formData));
        // }

    }
    }
    return (
        <div class="row">
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <h4 class="grid_title ml10 ml15">Manage Item</h4>
                        <div class="col-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <form className="pt-3" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label for="exampleInputName1">Item Name</label>
                                            <input type="text" className="form-control form-control-lg" placeholder="Name" name="addonName" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                                            {errors && !itemName && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Name!</span>}
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleSelectGender">Item Type</label>
                                            <select class="form-control" id="exampleSelectGender" onChange={(e) => setItemType(e.target.value)}>
                                                <option selected={itemType == "veg" ? true : false}>veg</option>
                                                <option selected={itemType == "non-veg" ? true : false}>non-veg</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputName1">Item Description</label>
                                            <input type="text" className="form-control form-control-lg" placeholder="Name" name="addonName" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
                                            {errors && !itemDescription && <span className="invalid-input" style={{ color: 'red' }}>Please Enter Description!</span>}
                                        </div>

                                        <div className="file-card">
                                            <div className="file-inputs">
                                                {/* <input type="file" /> */}
                                                <input className="InputField form-control form-control-lg" type="file" placeholder="item Image" name="itemImage" onChange={(e) => handlephoto(e)} />
                                                <button className="dfds">

                                                    <i className="mdi mdi-plus menu-icon" />
                                                    {/* <FontAwesomeIcon icon={faPlus} /> */}
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                        {errors && !itemImage && <div><span className="invalid-input" style={{ color: 'red' }}>Please Select Image!</span><br></br></div>}
                                        {
                                            params.id ?
                                           <center><br></br><img src={`http://${process.env.REACT_APP_IP}${itemImage}`} alt="CuisinesImage" style={{ width: 400, height: 180 }} /></center> 
                                            : 
                                            itemImage &&
                                            <li className="file-item">
                                                <i className="mdi mdi-file" />
                                                {/* <FontAwesomeIcon className="iconcolor" icon={faFileAlt} /> */}
                                                <p className="ml-4">{itemImage.name}</p>
                                            </li>}
                                        
                                        

                                        <br /><br />
                                        <div class="accordion" id="accordionExample">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="headingFour">
                                                    <button class="accordion-button collapsed" style={{ backgroundColor: '#f6881f', color: 'white', height: '40px', borderRadius: '5px' }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                        Category
                                                    </button>
                                                </h2>
                                                <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body">
                                                        <div className="form-group">
                                                            <label for="exampleInputName1">Category</label>
                                                            <Multiselect
                                                                displayValue="categoryName"
                                                                onKeyPressFn={function noRefCheck() { }}
                                                                onRemove={(e) => handleCuisines(e)}
                                                                onSelect={(e) => handleCuisines(e)}
                                                                onSearch={function noRefCheck() { }}
                                                                options={dropcategory_Data}
                                                                // selectedValues={category}
                                                                showArrow
                                                                Multiselect={false}
                                                                allowSelectAll={true}
                                                                showCheckbox
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div><br /><br />
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="headingThree">
                                                    <button class="accordion-button collapsed" style={{ backgroundColor: '#f6881f', color: 'white', height: '40px', borderRadius: '5px' }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                        Variant
                                                    </button>
                                                </h2>
                                                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body">
                                                        <div className="form-group">
                                                            {/* <h6 for="exampleInputName1">Selected Varinat</h6> */}
                                                            {/* {
                                                                params.id && variant ?
                                                                    variant ?
                                                                    variant.map((item) => (
                                                                        <><label for="exampleInputName1">{item.variantName}</label></>
                                                                    ))
                                                                    : ""
                                                                : ""
                                                            }   */}
                                                            <br></br>
                                                            <label for="exampleInputName1">Varinat</label>
                                                            <Multiselect
                                                                displayValue="variantName"
                                                                onKeyPressFn={function noRefCheck() { }}
                                                                onRemove={(e) => handlevariant(e)}
                                                                onSelect={(e) => handlevariant(e)}
                                                                onSearch={function noRefCheck() { }}
                                                                options={dropvariant_Data}
                                                                // selectedValues={variant}
                                                                // selectedValues={selectedvariant}
                                                                showArrow
                                                                Multiselect={true}
                                                                allowSelectAll={true}
                                                                showCheckbox
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <br /><br />                                    
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="headingTwo">
                                                    <button class="accordion-button collapsed" style={{ backgroundColor: '#f6881f', color: 'white', height: '40px', borderRadius: '5px' }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                        Addons
                                                    </button>
                                                </h2>
                                                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body">
                                                        <div className="form-group">
                                                            <label for="exampleInputName1">Title</label>
                                                            <input type="text" className="form-control form-control-lg" placeholder="title" name="title" value={itemAddOntitle} onChange={(e) => setItemAddOntitle(e.target.value)} />
                                                            {errors && !itemAddOntitle && <span className="invalid-input" style={{ color: 'red' }}>Please Enter title!</span>}
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="exampleSelectGender">Customer Selection</label>
                                                            <select class="form-control" id="exampleSelectGender" onChange={(e) => setItemAddOnType(e.target.value)}>
                                                                <option selected={itemAddOnType == "optional" ? true : false}>optional</option>
                                                                <option selected={itemAddOnType == "compulsory" ? true : false}>compulsory</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="exampleInputName1">Addons</label>
                                                            <Multiselect
                                                                displayValue="addonName"
                                                                onKeyPressFn={function noRefCheck() { }}
                                                                onRemove={(e) => handleaddons(e)}
                                                                onSelect={(e) => handleaddons(e)}
                                                                onSearch={function noRefCheck() { }}
                                                                options={dropaddon_Data}
                                                                // selectedValues={addons}
                                                                showArrow
                                                                Multiselect={false}
                                                                allowSelectAll={true}
                                                                showCheckbox
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br /><br />
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="headingOne">
                                                    <button class="accordion-button" type="button" style={{ backgroundColor: '#f6881f', color: 'white', height: '40px', borderRadius: '5px' }} data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        Add Extra
                                                    </button>
                                                </h2>
                                                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body">
                                                        <div className="form-group">
                                                            <label for="exampleInputName1">Title</label>
                                                            <input type="text" className="form-control form-control-lg" placeholder="title" name="title" value={itemAddExtratitle} onChange={(e) => setItemAddExtratitle(e.target.value)} />
                                                            {errors && !itemAddExtratitle && <span className="invalid-input" style={{ color: 'red' }}>Please Enter title!</span>}
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="exampleSelectGender">Customer Selection</label>
                                                            <select class="form-control" id="exampleSelectGender" onChange={(e) => setItemAddExtraType(e.target.value)}>
                                                                <option selected={itemAddExtraType == "optional" ? true : false}>optional</option>
                                                                <option selected={itemAddExtraType == "compulsory" ? true : false}>compulsory</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="exampleInputName1">Add Extras</label>
                                                            <Multiselect
                                                                displayValue="addextraName"
                                                                onKeyPressFn={function noRefCheck() { }}
                                                                onRemove={(e) => handleaddextras(e)}
                                                                onSelect={(e) => handleaddextras(e)}
                                                                onSearch={function noRefCheck() { }}
                                                                options={dropaddextra_Data}
                                                                // value = {}
                                                                showArrow
                                                                Multiselect={false}
                                                                allowSelectAll={true}
                                                                showCheckbox
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            
                                        </div>
                                        <br />
                                        <div className="mt-3">
                                            {/* <a type="submit" style={{color:'white'}} class="btn btn-primary mr-2" name="submit">Submit</a> */}
                                            <button type="submit" style={{ height: '40px' }} class="btn btn-primary mr-2" name="submit">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ManagedItem;