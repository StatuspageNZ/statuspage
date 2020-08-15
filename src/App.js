import React from "react";
import "./App.css";
import StatusItem from "./StatusItem";
import StatusSection from "./StatusSection";

function App() {
  return (
    <div className="App">
  
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

      <input className="search" type="text" placeholder="Search brown bay" />

      <div className="statuses">
        <StatusSection category="Healthcare" icon="">
          <StatusItem title="Hospital Beds" details="123 / 1234" color="green" />
          <StatusItem title="Hospitals" details="6/6 operational" color="green" />
          <StatusItem title="Avg Wait time" details="45 mins" color="green" />
          <StatusItem title="ICU Beds" details="123 available" color="green" />
          <StatusItem title="6 of 6" details="Hospitals operational" color="green" />
          <StatusItem title="6 of 6" details="Hospitals operational" color="green" />
        </StatusSection>

        <StatusSection category="Essential Goods" icon="">
          <StatusItem title="Rice" details="limited supply" color="yellow" />
          <StatusItem title="Toilet Paper" details="unavailable" color="red" />
          <StatusItem title="Flour" details="unavailable" color="red" />
          <StatusItem title="Fuel" details="available" color="green" />
          <StatusItem title="Potatoes" details="available" color="green" />
        </StatusSection>

        <StatusSection category="Security" icon="">
          <StatusItem title="Police Response" details="25 mins" color="green" />
          <StatusItem title="Army" details="not deployed" color="green" />
          <StatusItem title="Internet" details="available" color="green" />
        </StatusSection>

        <StatusSection category="Utilities" icon="">
          <StatusItem title="Water" details="restrictions apply" color="yellow" />
          <StatusItem title="Power" details="repairs in progress" color="red" />
          <StatusItem title="Internet" details="available" color="green" />
          <StatusItem title="Fuel" details="available" color="green" />
          <StatusItem title="Potatoes" details="availability" color="green" />
        </StatusSection>

        <StatusSection category="Trasport" icon="">
          <StatusItem title="Traffic" details="clear" color="green" />
          <StatusItem title="Flights" details="restricted" color="red" />
          <StatusItem title="Travel" details="restrictions apply" color="green" />
          <StatusItem title="Fuel" details="available" color="green" />
          <StatusItem title="Potatoes" details="available" color="green" />
        </StatusSection>

        <StatusSection category="Environment" icon="">
          <StatusItem title="Air Quality" details="good" color="green" />
          <StatusItem title="Water Quality" details="good" color="green" />
        </StatusSection>
      </div>
    </div>
  );
}

export default App;
