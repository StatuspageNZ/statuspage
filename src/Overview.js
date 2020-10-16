import React from "react";

const Overview = ({ location, alertLevel, children }) => (
  <div className="overview">
    <div className={`overview__header ${alertLevel !== "Alert Level 1" ? "overview__header--yellow" : ""}`}>
      <b>{location}</b> is at Alert Level 1
    </div>
    <div className="overview__description">{children}</div>
  </div>
);

export default Overview;
