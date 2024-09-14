import React from "react";
import "./RewardCard.css";
import { GiTrophyCup } from "react-icons/gi";
import rankGold from "./../../Images/rankGold.png";
const RewardCard = (props) => {
  return (
    <div
      className="rewardCard"
      id={props.status == "Achieved" ? "rewardCardActive" : ""}
    >
      <img src={props.image} alt="" />
      <h1>{props.rank}</h1>
      <div className="rewardCardDiv">
        <h5>{props.income} %</h5>
        <p>Income</p>
      </div>
      <div className="rewardCardDiv">
        <h5>{props.community}</h5>
        <p>Current Month Community</p>
      </div>
      <div className="rewardCardDiv">
        <h4>{props.condition}</h4>
        <p>Condition</p>
      </div>
      <div className="rewardCardDiv">
        <h5
          style={{ color: props.status == "Pending" ? "#EF7F1B" : "#73BA3F" }}
        >
          {props.status}
        </h5>
        <p>Status</p>
      </div>
    </div>
  );
};

export default RewardCard;
