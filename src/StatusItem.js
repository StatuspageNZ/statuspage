import React from "react";

const StatusItem = ({ title, color, details }) => (
  <div className="line-item__container">
    <div className={`line-item__status-circle line-item__status-circle--${color}`}></div>
    <b>{title}</b> - {details}
  </div>
);

export default StatusItem;
