import axios from "axios";
import { server } from "../index";

export const featuredProduct = () => async (dispatch) => {
  try {
    dispatch({ type: "FEATURED_PRODUCT_REQUEST" });

    const { data } = await axios.get(`${server}/products/featured`, {
      withCredentials: true,
    });

    dispatch({ type: "FEATURED_PRODUCT_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "FEATURED_PRODUCT_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const filteredProduct =
  (keyword = "", price = [0, 20000], ratings = 0, currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: "FILTERED_PRODUCT_REQUEST" });

      let link = `${server}/products/filters?search=${keyword}&page=${currentPage}&ratings[gte]=${ratings}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      if (category) {
        link = `${server}/products/filters?search=${keyword}&page=${currentPage}&ratings[gte]=${ratings}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      }

      const { data } = await axios.get(link, { withCredentials: true });

      dispatch({ type: "FILTERED_PRODUCT_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "FILTERED_PRODUCT_FAIL",
        payload: error.response.data.message,
      });
    }
  };

export const productDetail = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAIL_REQUEST" });

    const { data } = await axios.get(`${server}/product/${productId}`, {
      withCredentials: true,
    });

    dispatch({ type: "PRODUCT_DETAIL_SUCCESS", payload: data.product });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DETAIL_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: "NEW_REVIEW_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(`${server}/review`, reviewData, config);

    dispatch({ type: "NEW_REVIEW_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "NEW_REVIEW_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const allReviewsOfAProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "ALL_REVIEW_REQUEST" });

    const { data } = await axios.get(`${server}/reviews?id=${productId}`, {
      withCredentials: true,
    });

    dispatch({ type: "ALL_REVIEW_SUCCESS", payload: data.reviews });
  } catch (error) {
    dispatch({
      type: "ALL_REVIEW_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_ADMIN_PRODUCTS_REQUEST" });

    const { data } = await axios.get(`${server}/admin/products`, {
      withCredentials: true,
    });

    dispatch({ type: "ALL_ADMIN_PRODUCTS_SUCCESS", payload: data.products });
  } catch (error) {
    dispatch({
      type: "ALL_ADMIN_PRODUCTS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_ADMIN_PRODUCTS_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/admin/product/new`,
      productData,
      config
    );

    dispatch({ type: "CREATE_ADMIN_PRODUCTS_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "CREATE_ADMIN_PRODUCTS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (productId, productData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_ADMIN_PRODUCTS_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${server}/admin/product/${productId}`,
      productData,
      config
    );

    dispatch({ type: "UPDATE_ADMIN_PRODUCTS_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_ADMIN_PRODUCTS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_ADMIN_PRODUCTS_REQUEST" });

    const { data } = await axios.delete(
      `${server}/admin/product/${productId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: "DELETE_ADMIN_PRODUCTS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "DELETE_ADMIN_PRODUCTS_FAIL",
      payload: error.response.data.message,
    });
  }
};

//CLEAR ERRORS
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR" });
};
