import React from "react";

const Header = ({ title, location, openEditLocation, getAlerts }) => (
  <div className="header__container">
    <div className="header__left-part">
      <div className="header__title">{title || "Civil Status"}</div>
      <div className="header__location">{location}</div>
    </div>
    <div className="header__right-part">
      <button className="fancy-button" onClick={getAlerts}>Get Alerts</button>
      <button className="fancy-button" onClick={openEditLocation}>
        Edit Location
      </button>
    </div>
  </div>
);

export default Header;
