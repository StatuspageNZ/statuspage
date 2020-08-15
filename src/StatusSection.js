import React from "react";
import Highlighter from './Highlighter'

const StatusSection = ({ category, icon, highlight, color, children }) => (
  <div className="status-section">
    <div className="status-section__header">
      <div className={`status-section__icon status-section__icon--${color}`}>{icon}</div>
      <div className="status-section__title"><Highlighter text={category} highlight={highlight}/></div>
    </div>
    <div className="status-section__content">{children}</div>
  </div>
);

export default StatusSection;
