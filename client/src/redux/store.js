import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./inventorySlice";
import orderReducer from "./orderSlice";

const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    order: orderReducer,
  },
});

export default store;
