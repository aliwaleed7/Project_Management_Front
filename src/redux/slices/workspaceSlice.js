import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspaceId: localStorage.getItem("workspaceId") || null, // Initialize from localStorage
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaceId: (state, action) => {
      state.workspaceId = action.payload;
      localStorage.setItem("workspaceId", action.payload); // Store in localStorage
    },
  },
});

export const { setWorkspaceId } = workspaceSlice.actions;
export default workspaceSlice.reducer;
