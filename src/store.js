import { configureStore } from "@reduxjs/toolkit";
import {
  adminProductReducer,
  allReviewsOfAProductReducer,
  featuredProductReducer,
  filteredProductReducer,
  getAdminProductReducer,
  newReviewReducer,
  productDetailReducer,
} from "./reducers/productReducer";
import {
  adminUserReducer,
  allUsersReducer,
  deleteReviewsReducer,
  forgotPasswordReducer,
  profileReducer,
  reviewsReducer,
  singleUserDetailReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { paymentReducer } from "./reducers/paymentReducer";
import {
  adminOrdersReducer,
  allOrdersReducer,
  myOrderDetailsReducer,
  myOrdersReducer,
  newOrderReducer,
} from "./reducers/orderReducer";
import { bannerReducer, newBannerReducer } from "./reducers/bannerReducer";

const store = configureStore({
  reducer: {
    featuredProducts: featuredProductReducer,
    filteredProducts: filteredProductReducer,
    productDetail: productDetailReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    profile: profileReducer,
    cart: cartReducer,
    payment: paymentReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    myOrderDetails: myOrderDetailsReducer,
    newReview: newReviewReducer,
    allReviewsOfAProduct: allReviewsOfAProductReducer,
    newBanner: newBannerReducer,
    banner: bannerReducer,
    getAdminProduct: getAdminProductReducer,
    adminProduct: adminProductReducer,
    allOrders: allOrdersReducer,
    adminOrders: adminOrdersReducer,
    allUsers: allUsersReducer,
    singleUserDetail: singleUserDetailReducer,
    adminUser: adminUserReducer,
    reviews: reviewsReducer,
    deleteReviews: deleteReviewsReducer,
  },
});

export default store;
