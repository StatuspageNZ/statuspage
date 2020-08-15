import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import Overview from "./Overview";
import Search from "./Search";
import Statuses from "./Statuses";
import StatusItem from "./StatusItem";
import StatusSection from "./StatusSection";

function App() {
  const [location, setLocation] = useState("Browns Bay, Auckland, NZ");

  return (
    <div className="App">
      {/* Header */}
      <Header location={location} />

      {/* Overview */}
      <Overview location="Browns Bay" alertLevel={3}>
        <StatusItem title="Travel" details="restrictions apply" color="red" />
        <StatusItem title="Water" details="restrictions apply" color="red" />
        <StatusItem title="Internet" details="available" color="green" />
        <StatusItem title="Power" details="issues" color="yellow" />
        <StatusItem title="Healthcare" details="available" color="green" />
        <StatusItem title="Security" details="no issues" color="green" />
        <StatusItem title="Waterware" details="no issues" color="green" />
        <StatusItem title="Essential goods" details="available" color="green" />
      </Overview>

      {/* Search */}
      <Search location={location} setLocation={setLocation} />

      {/* Status Details */}
      <Statuses>
        <StatusSection category="Healthcare" icon="">
          <StatusItem
            title="Hospital Beds"
            details="123 / 1234"
            color="green"
          />
          <StatusItem
            title="Hospitals"
            details="6/6 operational"
            color="green"
          />
          <StatusItem title="Avg Wait time" details="45 mins" color="green" />
          <StatusItem title="ICU Beds" details="123 available" color="green" />
          <StatusItem
            title="6 of 6"
            details="Hospitals operational"
            color="green"
          />
          <StatusItem
            title="6 of 6"
            details="Hospitals operational"
            color="green"
          />
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
          <StatusItem
            title="Water"
            details="restrictions apply"
            color="yellow"
          />
          <StatusItem title="Power" details="repairs in progress" color="red" />
          <StatusItem title="Internet" details="available" color="green" />
          <StatusItem title="Fuel" details="available" color="green" />
          <StatusItem title="Potatoes" details="availability" color="green" />
        </StatusSection>
        <StatusSection category="Trasport" icon="">
          <StatusItem title="Traffic" details="clear" color="green" />
          <StatusItem title="Flights" details="restricted" color="red" />
          <StatusItem
            title="Travel"
            details="restrictions apply"
            color="green"
          />
          <StatusItem title="Fuel" details="available" color="green" />
          <StatusItem title="Potatoes" details="available" color="green" />
        </StatusSection>
        <StatusSection category="Environment" icon="">
          <StatusItem title="Air Quality" details="good" color="green" />
          <StatusItem title="Water Quality" details="good" color="green" />
        </StatusSection>
      </Statuses>
    </div>
  );
}

export default App;
