import { createSlice } from "@reduxjs/toolkit";
export const SideDisplaySlice = createSlice({
  name: "sideDisplay",
  initialState: {
    value: "block",
  },
  reducers: {
    setSidebarDisplay: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setSidebarDisplay } = SideDisplaySlice.actions;
export default SideDisplaySlice.reducer;
