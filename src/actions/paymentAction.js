import axios from "axios";
import { server } from "../index";

export const getRazorpayApiKey = () => async (dispatch) => {
  try {
    dispatch({ type: "API_REQUEST" });

    const { data } = await axios.get(`${server}/getrazorapikey`, {
      withCredentials: true,
    });

    dispatch({ type: "API_SUCCESS", payload: data.key });
  } catch (error) {
    dispatch({ type: "API_FAIL", payload: error.response.data.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERROR" });
};
