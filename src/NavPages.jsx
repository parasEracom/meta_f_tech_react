import React from "react";
import { Route, Routes } from "react-router-dom";
import BinarySystem from "./Pages/BinarySystem/BinarySystem";
import BonusSystem from "./Pages/BonusSystem/BonusSystem";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Finance from "./Pages/Finance/Finance";
import MyTeam from "./Pages/MyTeam/MyTeam";
import News from "./Pages/News/News";
import GrowthSip from "./Pages/Plans/GrowthSip";
import TimeDeposit from "./Pages/Plans/TimeDeposit";
import FixedDeposit from "./Pages/Plans/FixedDepositPlan";
import Support from "./Pages/Support/Support";
import Profile from "./Pages/Profile/Profile";
import Transactions from "./Pages/Transactions/Transactions";
import DirectTeam from "./Pages/DirectTeam/DirectTeam";
import GenerationTeam from "./Pages/GenerationTeam/GenerationTeam";
// import GenerationTeamOld from "./Pages/GenerationTeam/generationTeamOld";
import Withdraw from "./Pages/Withdraw/Withdraw";
import Blog from "./Pages/Blog/Blog";
import WithdrawalHistory from "./Pages/WithdrawalHistory/WithdrawalHistory";
import NotificationPage from "./Pages/NotificationPage/NotificationPage";
import Market from "./Pages/Market/Market";
import ActivationHistory from "./Pages/ActivationHistory/ActivationHistory";
import AllCapping from "./Pages/AllCapping/AllCapping";
import SlotDetailsPage from "./Pages/Dashboard/SlotDetailsPage";
import Claim from "./Pages/Claim/Claim";
import StakingPage from "./Pages/StakingPage/StakingPage";
import PaymentWIthAPI from "./Pages/StakingPage/PaymentWIthAPI";
import SellToken from "./Pages/SellToken/SellToken";
import WalletTransfer from "./Pages/WalletTransfer/WalletTransfer";
import Incomes from "./Pages/Incomes/Incomes";
import Genealogy from "./Pages/Genealogy/Genealogy";
import FundTransfer from "./Pages/FundTransfer/FundTransfer";
import Fund from "./Pages/Fund/Fund";
import FundHistory from "./Pages/FundHistory/FundHistory";
import PaymentWithUPI from "./Pages/PaymentWithUPI/PaymentWithUPI";
import UploadPaymentProof from "./Pages/UploadPaymentProof/UploadPaymentProof";
import Reward from "./Pages/Reward/Reward";
import Ranks from "./Pages/Ranks/Ranks";
import Welcome from "./Pages/Welcome/Welcome";
import KYC from "./Pages/KYC/KYC";
import Bonanza from "./Pages/Bonanza/Bonanza";
import PopUp from "./Components/PopUp/PopUp";
import TermsCondition from "./Pages/TermsConditions/TermsCondition";
const NavPages = () => {
  return (
    <Routes>
      <Route exact={true} path="/*" element={<Dashboard />}></Route>
      <Route exact={true} path="/finance" element={<Finance />}></Route>
      <Route exact={true} path="/my_team" element={<MyTeam />}></Route>
      <Route exact={true} path="/reward" element={<Reward />}></Route>
      <Route exact={true} path="/ranks" element={<Ranks />}></Route>

      <Route
        exact={true}
        path="/bonus_system"
        element={<BonusSystem />}
      ></Route>
      <Route exact={true} path="/time-deposit-plan" element={<TimeDeposit />}></Route>
      <Route exact={true} path="/fixed-deposit-plan" element={<FixedDeposit />}></Route>
      <Route exact={true} path="/growth-sip-plan" element={<GrowthSip />}></Route>
      <Route
        exact={true}
        path="/wallet_transfer"
        element={<WalletTransfer />}
      ></Route>
      <Route exact={true} path="/plans/stake" element={<StakingPage />}></Route>
      <Route exact={true} path="/news" element={<News />}></Route>
      <Route exact={true} path="/support" element={<Support />}></Route>
      <Route
        exact={true}
        path="/binary_system"
        element={<BinarySystem />}
      ></Route>
      <Route exact={true} path="/profile" element={<Profile />}></Route>
      <Route exact={true} path="/kyc" element={<KYC />}></Route>
      <Route exact={true} path="/bonanza" element={<Bonanza />}></Route>

      <Route exact={true} path="/incomes" element={<Incomes />}></Route>
      {/* <Route
        exact={true}
        path="/transactions"
        element={<Transactions />}
      ></Route> */}
      <Route exact={true} path="/direct_team" element={<DirectTeam />}></Route>
      <Route exact={true} path="/claim" element={<Claim />}></Route>
      <Route
        exact={true}
        path="/generation_team"
        element={<GenerationTeam />}
      ></Route>
      {/* <Route
        exact={true}
        path="/generation_teamOld"
        element={<GenerationTeamOld />}
      ></Route> */}

      {/* <Route
        exact={true}
        path="/development_bonus"
        element={<GameDevelopmentBonus />}
      ></Route> */}
      <Route exact={true} path="/withdraw" element={<Withdraw />}></Route>
      {/* <Route exact={true} path="/set_account" element={<EditAccount />}></Route> */}
      <Route exact={true} path="/fund" element={<Fund />}></Route>
      <Route exact={true} path="/fund-transfer" element={<FundTransfer />}></Route>
      <Route exact={true} path="/fund-history" element={<FundHistory />}></Route>

      <Route
        exact={true}
        path="/withdrawal_history"
        element={<WithdrawalHistory />}
      ></Route>
      <Route
        exact={true}
        path="/notification"
        element={<NotificationPage />}
      ></Route>
      <Route exact={true} path="/market" element={<Market />}></Route>
      {/* <Route
        exact={true}
        path="/activation_history"
        element={<ActivationHistory />}
      ></Route> */}
      <Route
        exact={true}
        path="/staking_details"
        element={<AllCapping />}
      ></Route>
      <Route exact={true} path="/slot" element={<SlotDetailsPage />}></Route>
      <Route exact={true} path="/sell_token" element={<SellToken />}></Route>
      <Route exact={true} path="/genealogy" element={<Genealogy />}></Route>
      <Route
        exact={true}
        path="/plans/stake/payment"
        element={<PaymentWIthAPI />}
      ></Route>
      <Route
        exact={true}
        path="/payment-upi"
        element={<PaymentWithUPI />}
      ></Route>
      <Route
        exact={true}
        path="/payment-proof"
        element={<UploadPaymentProof />}
      />
      <Route
        exact={true}
        path="/profile/welcome-letter"
        element={<Welcome />}
      ></Route>
      <Route exact={true} path="/popUp" element={<PopUp />}></Route>
    </Routes>
  );
};

export default NavPages;
