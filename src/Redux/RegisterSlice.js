import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "registerDisplay",
  initialState: {
    value: false,
  },
  reducers: {
    setRegisterDisplay: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setRegisterDisplay } = registerSlice.actions;
export default registerSlice.reducer;
