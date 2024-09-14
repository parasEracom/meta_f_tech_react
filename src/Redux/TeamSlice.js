import { createSlice } from "@reduxjs/toolkit";

export const teamDataSlice = createSlice({
  name: "teamData", // Corrected the name to match with the reducer key
  initialState: {
    teamSection: [],
  },
  reducers: {
    setTeamSection: (state, action) => {
      state.teamSection = action.payload; // Corrected field name to dashboardProviders
    },
  },
});

export const { setTeamSection } = teamDataSlice.actions;
export default teamDataSlice.reducer;
