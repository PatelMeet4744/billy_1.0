import React from "react";
import Header from './layout/Header';
import Sidebar from './layout/Sidebar1';
import Footer from './layout/Footer';
import User from "./pages/admin/user";
import DeliveryBoy from './pages/admin/DeliveryBoy';
import Table from './pages/admin/Table';
import Cuisines from './pages/admin/Cuisines';
import GetTouch from "./pages/admin/GetTouch";
import ManageDeliveryBoy from "./pages/admin/ManageDeliveryBoy";
import Dashboard from "./pages/admin/Dashbord";
import Question from "./pages/admin/Question";
import Restaurant from "./pages/admin/Restaurant";
import ManageQuestion from "./pages/admin/ManageQuestion";
import ManageCuisines from "./pages/admin/ManageCuisines";
import ReferralAmount from "./pages/admin/ReferralAmount";
import Complain from "./pages/admin/Complain";
import ManageRestaurant from "./pages/admin/ManageRestaurant";
import Orders from "./pages/admin/Orders";
import Item from "./pages/admin/Item";
import ItemDetail from "./pages/admin/ItemDetial";
import Addon from "./pages/admin/AddedOn";
import Addextra from "./pages/admin/AddExtra";
import Variant from "./pages/admin/Variant";
import Banner from "./pages/admin/Banner";
import Category from "./pages/admin/Category";
import Couponcode from "./pages/admin/Couponcode";
import ManageCouponcode from "./pages/admin/ManageCouponcode";
import SendCouponCode from "./pages/admin/SendCouponCode";
import SendMail from "./pages/admin/SendMail";
import OrderDetail from "./pages/admin/Ordersdetail";
import '../App.css';

const AdminMaster = (props) => {
    const urlname = props.name;
    const getstat = () =>{
    if (urlname === "dashboard") {
        return <Dashboard/>
    }
    if (urlname === "user"){
        return <User/>
    }
    if (urlname === "deliveryBoy"){
        return <DeliveryBoy/>
    }
    if (urlname === "managedeliveryBoy")
    {
        return <ManageDeliveryBoy/>
    }
    if (urlname === "managequestion")
    {
        return <ManageQuestion/>
    }
    if (urlname === "cuisines"){
        return <Cuisines/>
    }
    if (urlname === "getTocuh"){
        return <GetTouch/>
    }
    if (urlname === "table"){
        return <Table/>
    }
    if (urlname === "question")
    {
        return <Question/>
    }
    if (urlname === "restaurant")
    {
        return  <Restaurant/>
    }
    if (urlname === "managecuisines"){
        return <ManageCuisines/>
    }
    if (urlname === "referralamount"){
        return <ReferralAmount/>
    }
    if (urlname === "complain"){
        return <Complain/>
    }
    if (urlname === "managerestaurant"){
        return <ManageRestaurant/>
    }
    if (urlname === "order") return <Orders/>
    if (urlname === "item") return <Item/>
    if (urlname === "itemdetail") return <ItemDetail/>
    if (urlname === "managerestaurantAddon") return <Addon/>
    if (urlname === "managerestaurantAddextra") return <Addextra/>
    if (urlname === "managerestaurantVariant") return <Variant/>
    if (urlname === "managerestaurantBanner") return <Banner/>
    if (urlname === "managerestaurantCatrgory") return <Category/>
    if (urlname === "couponcode") return <Couponcode/>
    if (urlname === "managecoupon") return <ManageCouponcode/>
    if (urlname === "sendcouponcode") return <SendCouponCode/>
    if (urlname === "managerestaurantsendmail") return <SendMail/>
    if (urlname === "orderdetail") return <OrderDetail/>
}
return (
        <>
            <div className="container-scroller">
                <Header />
                <div className="container-fluid page-body-wrapper">
                    {<Sidebar />}
                    <div class="main-panel">
                        <div class="content-wrapper">
                            {/* <Sidebar> */}
                            {getstat()}
                            {/* </Sidebar> */}
                            {/* <Customer />                            
                            <AdminLogin/> */}
                            {/* <Routes>
                                <Route path={"/dashboard"} element={<Customer/>} />
                                <Route path={"/user"} element={<AdminLogin/>}/>
                             </Routes> */}
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminMaster;
