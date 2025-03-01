import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    selectedProjectId: null, // This will store the project ID
  },
  reducers: {
    setSelectedProject: (state, action) => {
      state.selectedProjectId = action.payload; // Update project ID
    },
  },
});

export const { setSelectedProject } = projectSlice.actions;
export default projectSlice.reducer;
