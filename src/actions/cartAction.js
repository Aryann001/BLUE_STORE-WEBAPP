import { server } from "../index";
import axios from "axios";

export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${server}/product/${productId}`);

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product: data.product._id,
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeItem = (productId) => async (dispatch, getState) => {
  dispatch({ type: "REMOVE_ITEMS", payload: productId });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => async (dispatch) => {
  dispatch({ type: "CLEAR_CART" });
};

export const saveShippingInfo = (shippingData) => async (dispatch) => {
  dispatch({ type: "SAVE_SHIPPING_INFO", payload: shippingData });

  localStorage.setItem("shippingInfo", JSON.stringify(shippingData));
};
