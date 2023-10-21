import axios from "axios";
import { server } from "../index";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_USER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      config
    );

    dispatch({ type: "LOGIN_USER_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({ type: "LOGIN_USER_FAIL", payload: error.response.data.message });
  }
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_USER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(`${server}/register`, userData, config);

    dispatch({ type: "REGISTER_USER_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({
      type: "REGISTER_USER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: "FORGOT_PASSWORD_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/password/forgot`,
      email,
      config
    );

    dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: data.message });
  } catch (error) {
    dispatch({
      type: "FORGOT_PASSWORD_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (resetToken, passwords) => async (dispatch) => {
  try {
    dispatch({ type: "RESET_PASSWORD_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${server}/password/reset/${resetToken}`,
      passwords,
      config
    );

    dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "RESET_PASSWORD_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOAD_USER_REQUEST" });

    const { data } = await axios.get(`${server}/profile`, {
      withCredentials: true,
    });

    dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({ type: "LOAD_USER_FAIL", payload: error.response.data.message });
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PASSWORD_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${server}/password/update`,
      passwords,
      config
    );

    dispatch({ type: "UPDATE_PASSWORD_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_PASSWORD_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PROFILE_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${server}/profile/update`,
      userData,
      config
    );

    dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_PROFILE_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get(`${server}/logout`, { withCredentials: true });

    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "LOGOUT_FAIL", payload: error.response.data.message });
  }
};

export const allUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "ALL_USERS_REQUEST" });

    const { data } = await axios.get(`${server}/admin/users`, {
      withCredentials: true,
    });

    dispatch({ type: "ALL_USERS_SUCCESS", payload: data.users });
  } catch (error) {
    dispatch({
      type: "ALL_USERS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const singleUserDetail = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER_DETAIL_REQUEST" });

    const { data } = await axios.get(`${server}/admin/user/${userId}`, {
      withCredentials: true,
    });

    dispatch({ type: "GET_USER_DETAIL_SUCCESS", payload: data.user });
  } catch (error) {
    dispatch({
      type: "GET_USER_DETAIL_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const updateUser = (userId, userData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_ADMIN_USER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${server}/admin/user/${userId}`,
      userData,
      config
    );

    dispatch({ type: "UPDATE_ADMIN_USER_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "UPDATE_ADMIN_USER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_ADMIN_USER_REQUEST" });

    const { data } = await axios.delete(`${server}/admin/user/${userId}`, {
      withCredentials: true,
    });

    dispatch({ type: "DELETE_ADMIN_USER_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "DELETE_ADMIN_USER_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const allReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_REVIEWS_REQUEST" });

    const { data } = await axios.get(`${server}/reviews?id=${productId}`, {
      withCredentials: true,
    });

    dispatch({ type: "GET_REVIEWS_SUCCESS", payload: data.reviews });
  } catch (error) {
    dispatch({
      type: "GET_REVIEWS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const deleteReviews = (productId, reviewId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_REVIEWS_REQUEST" });

    const { data } = await axios.delete(
      `${server}/reviews?productId=${productId}&id=${reviewId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: "DELETE_REVIEWS_SUCCESS", payload: data.success });
  } catch (error) {
    dispatch({
      type: "DELETE_REVIEWS_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR" });
};
