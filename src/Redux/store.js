import { configureStore } from "@reduxjs/toolkit";
import SideDisplaySlice from "./../Redux/SideDisplaySlice";
import RegisterSlice from "./RegisterSlice";
import LoginSlice from "./LoginSlice";
import Accounts from "./Accounts";
import profileDataReducer from "./ProfileDataSlice";
import incomeDataReducer from "./IncomeWallet";
import teamDataReducer from "./TeamSlice";
export default configureStore({
  reducer: {
    sideDisplay: SideDisplaySlice,
    account: Accounts,
    registerDisplay: RegisterSlice,
    loginDisplay: LoginSlice,
    profileData: profileDataReducer,
    incomeData: incomeDataReducer,
    teamData: teamDataReducer,
  },
});
