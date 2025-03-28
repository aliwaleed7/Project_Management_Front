import { createSlice } from "@reduxjs/toolkit";

// Load listId from local storage
const initialState = {
  listId: localStorage.getItem("listId") || null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setListId: (state, action) => {
      state.listId = action.payload;
      localStorage.setItem("listId", action.payload); // Save to local storage
    },
  },
});

export const { setListId } = dashboardSlice.actions;
export default dashboardSlice.reducer;
