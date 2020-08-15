import React from "react";

const Header = ({ location, openEditLocation }) => (
  <div className="header__container">
    <div className="header__left-part">
      <div className="header__title">Civil Status</div>
      <div className="header__location">{location}</div>
    </div>
    <div className="header__right-part">
      <button className="fancy-button">Get Alerts</button>
      <button className="fancy-button" onClick={openEditLocation}>
        Edit location
      </button>
    </div>
  </div>
);

export default Header;
