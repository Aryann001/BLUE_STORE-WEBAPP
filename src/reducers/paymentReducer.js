import { createReducer } from "@reduxjs/toolkit";

export const paymentReducer = createReducer(
  {},
  {
    API_REQUEST: (state, action) => {
      state.loading = true;
    },
    API_SUCCESS: (state, action) => {
      state.loading = false;
      state.key = action.payload;
    },
    API_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);
