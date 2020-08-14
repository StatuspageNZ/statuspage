import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <div className="header__container">
          <div className="header__left-part">
            <div className="header__title">Civil Status</div>
            <div className="header__location">Browns Bay, Auckland, NZ</div>
          </div>
          <div className="header__right-part">
            <button className="fancy-button">Get Alerts</button>
            <button className="fancy-button">Edit location</button>
          </div>
        </div>
      </div>
      <div className="overview">
        <div className="overview__header">
          <b>Browns Bay</b> is at Alert Level 3
        </div>
        <div className="overview__description">

          <div className="line-item__container">
            <div className="line-item__status-circle line-item__status-circle--red"></div>
            <b>Travel</b> restrictions apply
          </div>
          <div className="line-item__container">
            <div className="line-item__status-circle line-item__status-circle--red"></div>
            <b>Water</b> restrictions apply
          </div>

          <div className="line-item__container">
            <div className="line-item__status-circle line-item__status-circle--green"></div>
            <b>Internet</b> available
          </div>

          <div className="line-item__container">
            <div className="line-item__status-circle line-item__status-circle--yellow"></div>
            <b>Power</b> issues
          </div>

          <div className="line-item__container">
            <div className="line-item__status-circle line-item__status-circle--green"></div>
            <b>Healthcare</b> available
          </div>

          <div className="line-item__container">
            <div className="line-item__status-circle line-item__status-circle--green"></div>
            <b>Security</b> no issues
          </div>

          <div className="line-item__container">
            <div className="line-item__status-circle line-item__status-circle--green"></div>
            <b>Waterware</b> no issues
          </div>

          <div className="line-item__container">
            <div className="line-item__status-circle line-item__status-circle--green"></div>
            <b>Essential goods</b> available
          </div>

        </div>
      </div>

      <input className="search" type="text" placeholder="Search brown bay"/>

    </div>
  );
}

export default App;
