import { createReducer } from "@reduxjs/toolkit";

export const featuredProductReducer = createReducer(
  { products: [] },
  {
    FEATURED_PRODUCT_REQUEST: (state, action) => {
      state.loading = true;
    },
    FEATURED_PRODUCT_SUCCESS: (state, action) => {
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
      state.loading = false;
    },
    FEATURED_PRODUCT_FAIL: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const filteredProductReducer = createReducer(
  { products: [] },
  {
    FILTERED_PRODUCT_REQUEST: (state, action) => {
      state.loading = true;
    },
    FILTERED_PRODUCT_SUCCESS: (state, action) => {
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
      state.resultPerPage = action.payload.resultPerPage;
      state.filteredProductCount = action.payload.filteredProductCount;
      state.loading = false;
    },
    FILTERED_PRODUCT_FAIL: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const productDetailReducer = createReducer(
  { product:{} },
  {
    PRODUCT_DETAIL_REQUEST: (state, action) => {
      state.loading = true;
    },
    PRODUCT_DETAIL_SUCCESS: (state, action) => {
      state.product = action.payload;
      state.loading = false;
    },
    PRODUCT_DETAIL_FAIL: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const newReviewReducer = createReducer(
  {},
  {
    NEW_REVIEW_REQUEST: (state, action) => {
      state.loading = true;
    },
    NEW_REVIEW_SUCCESS: (state, action) => {
      state.success = action.payload;
      state.loading = false;
    },
    NEW_REVIEW_FAIL: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    NEW_REVIEW_RESET: (state, action) => {
      state.success = false;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const allReviewsOfAProductReducer = createReducer(
  {reviews: []},
  {
    ALL_REVIEW_REQUEST: (state, action) => {
      state.loading = true;
    },
    ALL_REVIEW_SUCCESS: (state, action) => {
      state.reviews = action.payload;
      state.loading = false;
    },
    ALL_REVIEW_FAIL: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const getAdminProductReducer = createReducer(
  {products: []},
  {
    ALL_ADMIN_PRODUCTS_REQUEST: (state, action) => {
      state.loading = true;
    },
    ALL_ADMIN_PRODUCTS_SUCCESS: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    ALL_ADMIN_PRODUCTS_FAIL: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const adminProductReducer = createReducer(
  {},
  {
    //CREATE ADMIN_PRODUCTS
    CREATE_ADMIN_PRODUCTS_REQUEST: (state, action) => {
      state.loading = true;
    },
    CREATE_ADMIN_PRODUCTS_SUCCESS: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    CREATE_ADMIN_PRODUCTS_RESET: (state, action) => {
      state.success = false;
    },
    CREATE_ADMIN_PRODUCTS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //UPDATE ADMIN_PRODUCTS
    UPDATE_ADMIN_PRODUCTS_REQUEST: (state, action) => {
      state.loading = true;
    },
    UPDATE_ADMIN_PRODUCTS_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UPDATE_ADMIN_PRODUCTS_RESET: (state, action) => {
      state.isUpdated = false;
    },
    UPDATE_ADMIN_PRODUCTS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //DELETE ADMIN_PRODUCTS
    DELETE_ADMIN_PRODUCTS_REQUEST: (state, action) => {
      state.loading = true;
    },
    DELETE_ADMIN_PRODUCTS_SUCCESS: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
      state.message = action.payload.message;
    },
    DELETE_ADMIN_PRODUCTS_RESET: (state, action) => {
      state.isDeleted = false;
    },
    DELETE_ADMIN_PRODUCTS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);
