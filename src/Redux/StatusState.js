import { createSlice } from "@reduxjs/toolkit";

export const statusSlice = createSlice({
  name: "status",
  initialState: {
    authToken: null,
    user: null,
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload; // Corrected field name to authToken
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthToken, setUser } = statusSlice.actions;
export default statusSlice.reducer;
