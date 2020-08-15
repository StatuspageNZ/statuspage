import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import Overview from "./Overview";
import Search from "./Search";
import Statuses from "./Statuses";
import StatusItem from "./StatusItem";
import StatusSection from "./StatusSection";
import Autosuggest from "react-autosuggest";
import Modal from 'react-modal';
import suburbs from './suburbs'

const getSuggestions = (value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : suburbs.filter(
        (lang) => lang[0].toLowerCase().slice(0, inputLength) === inputValue
      );
};

Modal.setAppElement("#root");

function App() {
  const [isEditLocationModalOpen, setEditLocationModalOpen] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");
  const [selectedLocality, setSelectedLocality] = useState(['', ''])

  function onChange(event, { newValue }) {
    setValue(newValue);
  }

  function onSuggestionsFetchRequested({ value }) {
    setSuggestions(getSuggestions(value));
  }

  function onSuggestionsClearRequested() {
    setSuggestions([]);
  }

  const inputProps = {
    placeholder: "Try Auckland",
    value,
    onChange,
  };

  const onCurrentLocationClicked = () => {
    setEditLocationModalOpen(false)
    setValue("Auckland")
  }

  return (
    <div className="App">
      {/* Header */}
      <Header
        location={`${selectedLocality[0]}, ${selectedLocality[1]}, NZ`}
        openEditLocation={() => setEditLocationModalOpen(true)}
      />

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
      <Search location={""} setLocation={() =>{}} />

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

      {/* Modal */}
      <Modal
        isOpen={isEditLocationModalOpen}
        className="edit-location-modal"
        overlayClassName="edit-location-modal__overlay"
        contentLabel="Edit Location"
      >
        <div className="edit-location-modal__header">
          <div className="edit-location-modal__title">Set your location</div>
        </div>
        <div className="edit-location-modal__content">
          <div>Search suburbs</div>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={(suggestion) => suggestion[0]}
            renderSuggestion={(suggestion) => (<span>{suggestion[0]}, {suggestion[1]}, NZ</span>)}
            inputProps={inputProps}
            onSuggestionSelected={(e, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
              setSelectedLocality(suggestion)
              setEditLocationModalOpen(false)
            }}
          />

          <div className="edit-location-modal__delimeter">or</div>
          <button onClick={onCurrentLocationClicked}>Use current location</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
