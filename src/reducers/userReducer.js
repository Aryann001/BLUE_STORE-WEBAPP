import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  { user: {} },
  {
    // LOGIN
    LOGIN_USER_REQUEST: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    LOGIN_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    LOGIN_USER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },

    //REGISTER
    REGISTER_USER_REQUEST: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    REGISTER_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    REGISTER_USER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },

    //LOAD USER
    LOAD_USER_REQUEST: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    },
    LOAD_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    LOAD_USER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },

    //LOGOUT
    LOGOUT_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    },
    LOGOUT_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //CLEAR ERRORS
    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const forgotPasswordReducer = createReducer(
  {},
  {
    //FORGOT PASSWORD
    FORGOT_PASSWORD_REQUEST: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    FORGOT_PASSWORD_SUCCESS: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    FORGOT_PASSWORD_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //RESET PASSWORD
    RESET_PASSWORD_REQUEST: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    RESET_PASSWORD_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    RESET_PASSWORD_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //CLEAR ERRORS
    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const profileReducer = createReducer(
  {},
  {
    //UPDATE PASSWORD
    UPDATE_PASSWORD_REQUEST: (state, action) => {
      state.loading = true;
    },
    UPDATE_PASSWORD_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UPDATE_PASSWORD_RESET: (state, action) => {
      state.isUpdated = false;
    },
    UPDATE_PASSWORD_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //UPDATE Profile
    UPDATE_PROFILE_REQUEST: (state, action) => {
      state.loading = true;
    },
    UPDATE_PROFILE_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UPDATE_PROFILE_RESET: (state, action) => {
      state.isUpdated = false;
    },
    UPDATE_PROFILE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //CLEAR ERRORS
    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const allUsersReducer = createReducer(
  { users: [] },
  {
    ALL_USERS_REQUEST: (state, action) => {
      state.loading = true;
    },
    ALL_USERS_SUCCESS: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    ALL_USERS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const singleUserDetailReducer = createReducer(
  { user: {} },
  {
    GET_USER_DETAIL_REQUEST: (state, action) => {
      state.loading = true;
    },
    GET_USER_DETAIL_SUCCESS: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    GET_USER_DETAIL_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const adminUserReducer = createReducer(
  {},
  {
    //UPDATE ADMIN_USER
    UPDATE_ADMIN_USER_REQUEST: (state, action) => {
      state.loading = true;
    },
    UPDATE_ADMIN_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UPDATE_ADMIN_USER_RESET: (state, action) => {
      state.isUpdated = false;
    },
    UPDATE_ADMIN_USER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //DELETE ADMIN_USER
    DELETE_ADMIN_USER_REQUEST: (state, action) => {
      state.loading = true;
    },
    DELETE_ADMIN_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    DELETE_ADMIN_USER_RESET: (state, action) => {
      state.isDeleted = false;
    },
    DELETE_ADMIN_USER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);


export const reviewsReducer = createReducer(
  { reviews: [] },
  {
    GET_REVIEWS_REQUEST: (state, action) => {
      state.loading = true;
    },
    GET_REVIEWS_SUCCESS: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    GET_REVIEWS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const deleteReviewsReducer = createReducer(
  {},
  {
    DELETE_REVIEWS_REQUEST: (state, action) => {
      state.loading = true;
    },
    DELETE_REVIEWS_SUCCESS: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    DELETE_REVIEWS_RESET: (state, action) => {
      state.isDeleted = false;
    },
    DELETE_REVIEWS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);
