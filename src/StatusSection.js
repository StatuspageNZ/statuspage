import React from "react";
import Highlighter from "./Highlighter";
import { useHistory } from "react-router-dom";

const StatusSection = ({ category, suburb, icon, highlight, color, children }) => {
  let history = useHistory();

  return (
    <div
      className="status-section"
      onClick={() => { history.push(`/details?category=${category}&suburb=${suburb}`); window.scrollTo(0, {}) }}
    >
      <div className="status-section__header">
        <div className={`status-section__icon status-section__icon--${color}`}>
          <img
            src={`/${icon}`}
            alt={category}
            className="status-section__icon-img"
          />
        </div>
        <div className="status-section__title">
          <Highlighter text={category} highlight={highlight} />
        </div>
      </div>
      <div className="status-section__content">{children}</div>
    </div>
  );
};

export default StatusSection;
