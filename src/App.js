import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/Layout/LandingPage/LandingPage.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails";
import Product from "./components/Product/Product";
import Login from "./components/User/Login";
import { Toaster } from "react-hot-toast";
import Register from "./components/User/Register";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import { useEffect } from "react";
import { loadUser } from "./actions/userAction";
import store from "./store";
import Profile from "./components/User/Profile";
import UpdatePassword from "./components/User/UpdatePassword";
import UpdateProfile from "./components/User/UpdateProfile";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import { useSelector } from "react-redux";
import PaymentSuccess from "./components/Cart/PaymentSuccess";
import MyOrder from "./components/Order/MyOrder";
import MyOrderDetails from "./components/Order/MyOrderDetails";
import About from "./components/Layout/About/About";
import Contact from "./components/Layout/Contact/Contact";
import Dashboard from "./components/Admin/Dashboard";
import Banner from "./components/Admin/Banner";
import BannerCreate from "./components/Admin/BannerCreate";
import BannerUpdate from "./components/Admin/BannerUpdate";
import AdminProduct from "./components/Admin/AdminProduct";
import AdminProductView from "./components/Admin/AdminProductView";
import ProductCreate from "./components/Admin/ProductCreate";
import ProductUpdate from "./components/Admin/ProductUpdate";
import AdminOrders from "./components/Admin/AdminOrders";
import AdminOrdersUpdate from "./components/Admin/AdminOrdersUpdate";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminUsersUpdate from "./components/Admin/AdminUsersUpdate";
import AdminReviews from "./components/Admin/AdminReviews";
import NotFound from "./components/Layout/NotFound/NotFound";

function App() {

  const { key } = useSelector((state) => state.payment);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Routes That All Can View */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/password/reset/:resetToken" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/profile/update" element={<UpdateProfile />} />

          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />

          {key !== undefined && <Route path="/payment" element={<Payment ApiKey={key} />} />}

          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          
          <Route path="/orders" element={<MyOrder />} />
          <Route path="/order/:orderId" element={<MyOrderDetails />} />

        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute isAdmin={true} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />

            <Route path="/admin/dashboard/banner" element={<Banner />} />
            <Route path="/admin/dashboard/banner/create" element={<BannerCreate />} />
            <Route path="/admin/dashboard/banner/update" element={<BannerUpdate />} />

            <Route path="/admin/dashboard/product" element={<AdminProduct />} />
            <Route path="/admin/dashboard/product/products" element={<AdminProductView />} />
            <Route path="/admin/dashboard/product/create" element={<ProductCreate />} />
            <Route path="/admin/dashboard/product/update/:updateProductId" element={<ProductUpdate />} />

            <Route path="/admin/dashboard/orders" element={<AdminOrders />} />
            <Route path="/admin/dashboard/order/update/:adminOrderId" element={<AdminOrdersUpdate />} />

            <Route path="/admin/dashboard/users" element={<AdminUsers />} />
            <Route path="/admin/dashboard/user/update/:updateUserId" element={<AdminUsersUpdate />} />

            <Route path="/admin/dashboard/reviews" element={<AdminReviews />} />
        </Route>

        <Route path="*" element={<NotFound />} />

        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
