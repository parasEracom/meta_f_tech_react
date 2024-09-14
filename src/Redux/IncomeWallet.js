import { createSlice } from "@reduxjs/toolkit";

export const incomeDataSlice = createSlice({
  name: "incomeData", // Corrected the name to match with the reducer key
  initialState: {
    incomeWallet: [],
  },
  reducers: {
    setIncomeWallet: (state, action) => {
      state.incomeWallet = action.payload; // Corrected field name to dashboardProviders
    },
  },
});

export const { setIncomeWallet } = incomeDataSlice.actions;
export default incomeDataSlice.reducer;
