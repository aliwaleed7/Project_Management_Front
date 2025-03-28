import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/projectSlice"; // Import reducer
import workspaceReducer from "./slices/workspaceSlice"; // Import reducer
import dashboardReducer from "./slices/dashboardSlice"; // Import reducer

const store = configureStore({
  reducer: {
    project: projectReducer, // Add project slice to Redux store
    workspace: workspaceReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
