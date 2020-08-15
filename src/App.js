import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import Search from "./Search";
import StatusItem from "./StatusItem";
import StatusSection from "./StatusSection";
import Autosuggest from 'react-autosuggest';
import Modal from 'react-modal';

const suburbs = [
  {
    name: "Auckland"
  },
  {
    name: "Christchurch"
  },
  {
    name: "Wellington"
  },
  {
    name: "Dunedin"
  },
  {
    name: "Invercargill"
  },
]
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : suburbs.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};
Modal.setAppElement('#root')
function App() {
  const [location, setLocation] = useState("Browsns Bay, Auckland, NZ");
  const [isEditLocationModalOpen, setEditLocationModalOpen] = useState(true)
  const [suggestions, setSuggestions] = useState([])
  const [value, setValue] = useState('')

  function onChange(event, { newValue }) {
    setValue(newValue)
  };

  function onSuggestionsFetchRequested({ value }) {
    setSuggestions(getSuggestions(value))
  };

  function onSuggestionsClearRequested() {
    setSuggestions([])
  };

  const inputProps = {
    placeholder: 'Try Auckland',
    value,
    onChange,
  };

  return (
    <div className="App">
      <Header location={location} openEditLocation={() => setEditLocationModalOpen(true)} />
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

      <Search location={location} setLocation={setLocation} />

      <div className="statuses">
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

      </div>
      <Modal
         isOpen={isEditLocationModalOpen}
         className="edit-location-modal"
         overlayClassName="edit-location-modal__overlay"
         contentLabel="Edit Location"
      >
        <div className="edit-location-modal__header">
          <div className="edit-location-modal__title">
            Set your location
          </div>
        </div>
        <div className="edit-location-modal__content">
          <div>Search suburbs</div>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={suggestion => suggestion.name}
            renderSuggestion={suggestion => (<span>{suggestion.name}</span>)}
            inputProps={inputProps}
            onSuggestionSelected={() => setEditLocationModalOpen(false)}
          />

          <div className="edit-location-modal__delimeter">or</div>
          <button>Use current location</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
