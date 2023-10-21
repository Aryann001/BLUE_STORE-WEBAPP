import { createReducer } from "@reduxjs/toolkit";

let initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

export const cartReducer = createReducer(initialState, {
  ADD_TO_CART: (state, action) => {
    const item = action.payload;

    const isItemExist = state.cartItems.find((i) => i.product === item.product);

    if (isItemExist) {
      state.cartItems = state.cartItems.map((i) =>
        i.product === isItemExist.product ? item : i
      );
    } else {
      state.cartItems = [...state.cartItems, item];
    }
  },

  REMOVE_ITEMS: (state, action) => {
    state.cartItems = state.cartItems.filter(
      (i) => i.product !== action.payload
    );
  },

  CLEAR_CART: (state, action) => {
    state.cartItems = [];
  },

  SAVE_SHIPPING_INFO: (state, action) => {
    state.shippingInfo = action.payload;
  },
});
