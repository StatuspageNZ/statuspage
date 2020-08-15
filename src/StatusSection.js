import React from "react";

const StatusSection = ({ category, icon, children }) => (
  <div className="status-section">
    <div className="status-section__header">
      <div className="status-section__icon">{icon}</div>
      <div className="status-section__title">{category}</div>
    </div>
    <div className="status-section__content">{children}</div>
  </div>
);

export default StatusSection;
