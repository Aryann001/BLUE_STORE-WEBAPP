import axios from "axios";
import { server } from "../index";

export const createBanner = (bannerImages) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_BANNER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/banner/create`,
      bannerImages,
      config
    );

    dispatch({ type: "CREATE_BANNER_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "CREATE_BANNER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const updateBanner = (bannerImages) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_BANNER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${server}/banner/update`,
      bannerImages,
      config
    );

    dispatch({ type: "UPDATE_BANNER_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_BANNER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const deleteBanner = () => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_BANNER_REQUEST" });

    const { data } = await axios.delete(`${server}/banner/delete`, {
      withCredentials: true,
    });

    dispatch({ type: "DELETE_BANNER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "DELETE_BANNER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const getBanner = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_BANNER_REQUEST" });

    const { data } = await axios.get(`${server}/getbanner`, {
      withCredentials: true,
    });

    dispatch({ type: "GET_BANNER_SUCCESS", payload: data.banner });
  } catch (error) {
    dispatch({
      type: "GET_BANNER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR" });
};
