import { createSlice } from "@reduxjs/toolkit";

export const profileDataSlice = createSlice({
  name: "profileData", // Corrected the name to match with the reducer key
  initialState: {
    userPersonalInfo: [],
  },
  reducers: {
    setUserPersonalInfo: (state, action) => {
      state.userPersonalInfo = action.payload; // Corrected field name to dashboardProviders
    },
  },
});

export const { setUserPersonalInfo } = profileDataSlice.actions;
export default profileDataSlice.reducer;
