import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/projectSlice"; // Import reducer

const store = configureStore({
  reducer: {
    project: projectReducer, // Add project slice to Redux store
  },
});

export default store;
