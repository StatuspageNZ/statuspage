import React from "react";
import Highlighter from './Highlighter'

const StatusItem = ({ title, color, details, highlight }) => (
  <div className="line-item__container">
    <div className={`line-item__status-circle line-item__status-circle--${color}`}></div>
<p class='line-item__container_text'>    <b><Highlighter text={title} highlight={highlight}/></b> - {details}</p>
  </div>
);

export default StatusItem;
