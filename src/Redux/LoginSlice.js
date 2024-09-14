import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "loginDisplay",
  initialState: {
    value: false,
  },
  reducers: {
    setLoginDisplay: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setLoginDisplay } = loginSlice.actions;
export default loginSlice.reducer;
