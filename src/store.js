import { combineReducers, applyMiddleware, legacy_createStore } from "redux";
// import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { legacy_createStore as createStore } from 'redux';

import { adminReducer } from "./reducers/adminReducer";
import { customerReducer } from "./reducers/customerReducer";
import { complainReducer } from "./reducers/complainReducer";
import { OrderReducer } from "./reducers/OrderReducer";
import { ItemReducer,SingleItemReducer } from "./reducers/ItemReducer";
import { deliveryboyReducer,newDeliveryBoyReducer,deleteReducer, singledeliveryboyReducer,u } from "./reducers/deliveryBoyReducer";
import { cuisinesReducer,deletecuisinesReducer,newCuisinesReducer } from "./reducers/cuisinesReducer";
import { getTouchReducer,newGetTouchReducer } from "./reducers/getTouchReducer";
import { questionReducer,newQuestionReducer, singlequestionReducer ,deleteQuesReducer, updatequestionReducer } from "./reducers/questionReducer";
import { restaurantReducer,restaurantLoginReducer, ProfileReducer, forgotPasswordReducer, singlerestaurantReducer, updatesinglerestaurantReducer} from "./reducers/restaurantReducer"
import { referralAmountReducer, updateReferralAmount } from "./reducers/referralAmountReducer";
import { categoryReducer,newcategoryReducer,singlecategoryReducer,deletecategory,updatecategoryReducer } from "./reducers/categoryReducer"
import { addOnReducer,newaddonReducer,singleaddonReducer,deleteaddon,updateaddonReducer } from "./reducers/addOnReducer";
import { addextraReducer,newaddextraReducer,singleaddextraReducer,deleteaddextra,updateaddextraReducer } from "./reducers/addextraReducer";
import { variantReducer,newvariantReducer,singlevariantReducer,deletevariant,updatevariantReducer } from "./reducers/variantReducer";
import { settingReducer,updateSetting } from "./reducers/settingReducer";
import { bannerReducer,deletebannerReducer } from "./reducers/bannerReducer";
import { couponcodeReducer,newcouponcodeReducer,singlecouponcodeReducer,deletecouponcode,updatecouponcodeReducer } from "./reducers/couponcodeReducer";

const reducer = combineReducers({
    //Admin
    admin:adminReducer,
    
    //Customer
    customer:customerReducer,
    
    //Cuisines
    cuisines:cuisinesReducer,
    deleteCuisines:deletecuisinesReducer,
    newCuisines:newCuisinesReducer,

    //Addon
    couponcode:couponcodeReducer,
    newcouponcode:newcouponcodeReducer,
    deletecouponcode:deletecouponcode,
    updatecouponcode:updatecouponcodeReducer,
    singlecouponcode:singlecouponcodeReducer,

    //GetTouch
    gettouch:getTouchReducer,
    newgettouch:newGetTouchReducer,

    //Delivery Boy
    deliveryboy:deliveryboyReducer,
    newDeliveryBoy:newDeliveryBoyReducer,
    deleteDeliveryBoy:deleteReducer,
    singleDeliveryBoy:singledeliveryboyReducer,
    
    //Question
    question:questionReducer,
    newquestion:newQuestionReducer,
    deletequestion:deleteQuesReducer,
    updatequestion:updatequestionReducer,
    singlequestion:singlequestionReducer,

    //Category
    category:categoryReducer,
    newcategory:newcategoryReducer,
    deletecategory:deletecategory,
    updatecategory:updatecategoryReducer,
    singlecategory:singlecategoryReducer,

    //Addon
    addon:addOnReducer,
    newaddon:newaddonReducer,
    deleteaddon:deleteaddon,
    updateaddon:updateaddonReducer,
    singleaddon:singleaddonReducer,

    //Addon
    addextra:addextraReducer,
    newaddextra:newaddextraReducer,
    deleteaddextra:deleteaddextra,
    updateaddextra:updateaddextraReducer,
    singleaddextra:singleaddextraReducer,

    //Variant
    variant:variantReducer,
    newvariant:newvariantReducer,
    deletevariant:deletevariant,
    updatevariant:updatevariantReducer,
    singlevariant:singlevariantReducer,

    //restaurant
    restaurant:restaurantReducer,
    restaurantDetail:restaurantLoginReducer,
    restaurantProfile:ProfileReducer,
    forgotPassword:forgotPasswordReducer,
    singelrestaurant:singlerestaurantReducer,
    updatesinglerestaurant:updatesinglerestaurantReducer,

    //referralAmount
    referralAmount:referralAmountReducer,
    updatereferralamount:updateReferralAmount,

    //setting
    setting:settingReducer,
    updatesetting:updateSetting,

    //Banner
    banner:bannerReducer,
    deleteBanner:deletebannerReducer,

    //Complain
    complain:complainReducer,

    //Orders
    Orders:OrderReducer,

    //Item
    Item:ItemReducer,
    singleItem:SingleItemReducer
});

let initialState = {

};

const middleware = [thunk];
const store = legacy_createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;