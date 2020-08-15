import React from "react";
import Highlighter from './Highlighter'

const StatusSection = ({ category, icon, highlight, children }) => (
  <div className="status-section">
    <div className="status-section__header">
      <div className="status-section__icon">{icon}</div>
      <div className="status-section__title"><Highlighter text={category} highlight={highlight}/></div>
    </div>
    <div className="status-section__content">{children}</div>
  </div>
);

export default StatusSection;
