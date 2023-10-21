import axios from "axios";
import { server } from "../index";

export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_ORDER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(`${server}/order/new`, orderData, config);

    dispatch({ type: "CREATE_ORDER_SUCCESS", payload: data.order });
  } catch (error) {
    dispatch({
      type: "CREATE_ORDER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "MY_ORDER_REQUEST" });

    const { data } = await axios.get(`${server}/orders/me`, {
      withCredentials: true,
    });

    dispatch({ type: "MY_ORDER_SUCCESS", payload: data.orders });
  } catch (error) {
    dispatch({
      type: "MY_ORDER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const myOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: "MY_ORDER_DETAILS_REQUEST" });

    const { data } = await axios.get(`${server}/order/${orderId}`, {
      withCredentials: true,
    });

    dispatch({ type: "MY_ORDER_DETAILS_SUCCESS", payload: data.order });
  } catch (error) {
    dispatch({
      type: "MY_ORDER_DETAILS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const allOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_ORDER_REQUEST" });

    const { data } = await axios.get(`${server}/admin/orders`, {
      withCredentials: true,
    });

    dispatch({ type: "ALL_ORDER_SUCCESS", payload: data.orders });
  } catch (error) {
    dispatch({
      type: "ALL_ORDER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const updateOrder = (orderId, orderData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_ORDER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${server}/admin/order/${orderId}`,
      orderData,
      config
    );

    dispatch({ type: "UPDATE_ORDER_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_ORDER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_ORDER_REQUEST" });

    const { data } = await axios.delete(`${server}/admin/order/${orderId}`, {
      withCredentials: true,
    });

    dispatch({ type: "DELETE_ORDER_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "DELETE_ORDER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR" });
};
