import { createReducer } from "@reduxjs/toolkit";

export const newOrderReducer = createReducer(
  {},
  {
    CREATE_ORDER_REQUEST: (state, action) => {
      state.loading = true;
    },
    CREATE_ORDER_SUCCESS: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    CREATE_ORDER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const myOrdersReducer = createReducer(
  { orders: [] },
  {
    MY_ORDER_REQUEST: (state, action) => {
      state.loading = true;
    },
    MY_ORDER_SUCCESS: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    MY_ORDER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const myOrderDetailsReducer = createReducer(
  { order: {} },
  {
    MY_ORDER_DETAILS_REQUEST: (state, action) => {
      state.loading = true;
    },
    MY_ORDER_DETAILS_SUCCESS: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    MY_ORDER_DETAILS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const allOrdersReducer = createReducer(
  { orders: [] },
  {
    ALL_ORDER_REQUEST: (state, action) => {
      state.loading = true;
    },
    ALL_ORDER_SUCCESS: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    ALL_ORDER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

export const adminOrdersReducer = createReducer(
  {},
  {
    //UPDATE ORDER
    UPDATE_ORDER_REQUEST: (state, action) => {
      state.loading = true;
    },
    UPDATE_ORDER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    UPDATE_ORDER_RESET: (state, action) => {
      state.isUpdated = false;
    },
    UPDATE_ORDER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    //DELETE ORDER
    DELETE_ORDER_REQUEST: (state, action) => {
      state.loading = true;
    },
    DELETE_ORDER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    DELETE_ORDER_RESET: (state, action) => {
      state.isDeleted = false;
    },
    DELETE_ORDER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state, action) => {
      state.error = null;
    },
  }
);

