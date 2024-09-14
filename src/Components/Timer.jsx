import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Timer({ time }) {
  // Set the target date and time
  const navigate = useNavigate();
  const targetDate = new Date(time).getTime();

  // Initialize the remaining time state
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  // Calculate the remaining time function
  function calculateRemainingTime() {
    const now = new Date().getTime();
    const timeDifference = targetDate - now;

    if (timeDifference <= 0) {
      // Target date and time have passed
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  // Update the remaining time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      remainingTime.days == 0 &&
      remainingTime.hours == 0 &&
      remainingTime.minutes == 0 &&
      remainingTime.seconds == 0
    ) {
      navigate("/dashboard/plans");
    }
  }, [remainingTime]);

  return (
    <div className="d-flex gap-0 justify-content-center">
      <p id="timer">{remainingTime.days}D</p>
      <p id="timer">
        <span style={{ margin: "0px 1px" }}>:</span>
        {remainingTime.hours}H
      </p>
      <p id="timer">
        <span style={{ margin: "0px 1px" }}>:</span>
        {remainingTime.minutes}M
      </p>
      <p id="timer">
        <span style={{ margin: "0px 1px" }}>:</span>
        {remainingTime.seconds}S
      </p>
    </div>
  );
}

export default Timer;
