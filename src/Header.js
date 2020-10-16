import React from "react";

const Header = ({ title, location, openEditLocation, getAlerts, isGetAlertsAvailable }) => (
  <div className="header__container">
    <div className="header__left-part">
      <div className="header__title">{title || "Check On Life in"}</div>
      <div className="header__location">{location}</div>
    </div>
    <div className="header__right-part">
      {isGetAlertsAvailable ? <button className="fancy-button" onClick={getAlerts}>
        Get Alerts
      </button> : null}
      <button className="fancy-button" onClick={openEditLocation}>
        Edit Location
      </button>
    </div>
  </div>
);

export default Header;
