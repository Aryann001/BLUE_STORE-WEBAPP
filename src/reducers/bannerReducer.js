import { createReducer } from "@reduxjs/toolkit";

export const newBannerReducer = createReducer(
  {},
  {
    //CREATE BANNER
    CREATE_BANNER_REQUEST: (state, action) => {
      state.loading = true;
    },
    CREATE_BANNER_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    CREATE_BANNER_RESET: (state, action) => {
      state.loading = false;
      state.success = false;
    },
    CREATE_BANNER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //UPDATE BANNER
    UPDATE_BANNER_REQUEST: (state, action) => {
      state.loading = true;
    },
    UPDATE_BANNER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UPDATE_BANNER_RESET: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
    },
    UPDATE_BANNER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //DELETE BANNER
    DELETE_BANNER_REQUEST: (state, action) => {
      state.loading = true;
    },
    DELETE_BANNER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
      state.message = action.payload.message;
    },
    DELETE_BANNER_RESET: (state, action) => {
      state.loading = false;
      state.isDeleted = false;
    },
    DELETE_BANNER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const bannerReducer = createReducer(
  { images: {} },
  {
    GET_BANNER_REQUEST: (state, action) => {
      state.loading = true;
    },
    GET_BANNER_SUCCESS: (state, action) => {
      state.loading = false;
      state.images = action.payload;
    },
    GET_BANNER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);
