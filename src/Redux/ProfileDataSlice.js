import { createSlice } from "@reduxjs/toolkit";

export const profileDataSlice = createSlice({
  name: "profileData", // Corrected the name to match with the reducer key
  initialState: {
    userPersonalInfo: [],
    userProfile: null,
  },
  reducers: {
    setUserPersonalInfo: (state, action) => {
      state.userPersonalInfo = action.payload; // Corrected field name to dashboardProviders
    },
    setUserProfile: (state, action) => {
      state.userPersonalInfo = action.payload; // Corrected field name to dashboardProviders
    },
  },
});

export const { setUserPersonalInfo, setUserProfile } = profileDataSlice.actions;
export default profileDataSlice.reducer;
