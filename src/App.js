import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import Overview from "./Overview";
import Search from "./Search";
import Statuses from "./Statuses";
import StatusItem from "./StatusItem";
import StatusSection from "./StatusSection";
import Autosuggest from "react-autosuggest";
import Modal from "react-modal";
import suburbs from "./suburbs";

Modal.setAppElement("#root");

function App() {
  const [isEditLocationModalOpen, setEditLocationModalOpen] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");
  const [filterQuery, setFilterQuery] = useState("")
  const [selectedLocality, setSelectedLocality] = useState([]);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : suburbs.filter(
          (lang) => lang[0].toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  function selectLocality(value) {
    const locality = suburbs.find(locality => locality[0] === value)
    if (locality) {
      setSelectedLocality(locality);
    }
  }

  function onChange(event, { newValue, method }) {
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
    setEditLocationModalOpen(false);
    selectLocality("Auckland Central");
  };

  const sections = [{
    category: "Healthcare",
    icon: "section-health.svg",
    color: "green",
    items: [
      { title: "Hospital Beds", details: "123 / 1234", color: "green" },
      { title: "Hospitals", details: "6/6 operational", color: "green" },
      { title: "Avg Wait time", details: "45 mins", color: "green" },
      { title: "ICU Beds", details: "123 available", color: "green" },
      { title: "6 of 6", details: "Hospitals operational", color: "green" },
      { title: "6 of 6", details: "Hospitals operational", color: "green" },
    ]
  },
  {
    category: "Essential Goods",
    icon: "section-essential.svg",
    color: "red",
    items: [
      { title: "Rice", details: "limited supply", color: "yellow" },
      { title: "Toilet Paper", details: "unavailable", color: "red" },
      { title: "Flour", details: "unavailable", color: "red" },
      { title: "Fuel", details: "available", color: "green" },
      { title: "Potatoes", details: "available", color: "green" },
    ]
  },
  {
    category: "Security",
    icon: "section-security.svg",
    color: "green",
    items: [
      { title: "Police Response", details: "25 mins", color: "green" },
      { title: "Army", details: "not deployed", color: "green" },
      { title: "Internet", details: "available", color: "green" },
    ]
  },
  {
    category: "Utilities",
    icon: "section-utilities.svg",
    color: "red",
    items: [
      { title: "Water", details: "restrictions apply", color: "yellow" },
      { title: "Power", details: "repairs in progress", color: "red" },
      { title: "Internet", details: "available", color: "green" },
      { title: "Fuel", details: "available", color: "green" },
      { title: "Potatoes", details: "availability", color: "green" },
    ]
  },
  {
    category: "Transport",
    icon: "section-transport.svg",
    color: "red",
    items: [
      { title: "Traffic", details: "clear", color: "green" },
      { title: "Flights", details: "restricted", color: "red" },
      { title: "Travel", details: "restrictions apply", color: "green" },
      { title: "Fuel", details: "available", color: "green" },
      { title: "Potatoes", details: "available", color: "green" },
    ]
  },
  {
    category: "Environment",
    icon: "section-environment.svg",
    color: "green",
    items: [
      { title: "Air Quality", details: "good", color: "green" },
      { title: "Water Quality", details: "good", color: "green" },
    ]
  }]

  const filteredSections = sections.filter(section => {
    const matchingItem = section.items.find(item => {
      return item.title.toLowerCase().indexOf(filterQuery.trim().toLowerCase()) !== -1
    })
    return section.category.toLowerCase().indexOf(filterQuery.trim().toLowerCase()) !== -1 || matchingItem
  })

  return (
    <div className="App">
      {/* Header */}
      <Header
        location={selectedLocality.length ? `${selectedLocality[0]}, ${selectedLocality[1]}, NZ` : '-'}
        openEditLocation={() => { document.activeElement.blur(); setEditLocationModalOpen(true) }}
        getAlerts={() => Notification.requestPermission()}
      />

      {/* Overview */}
      <Overview location={selectedLocality.length ? selectedLocality[0] : ''} alertLevel={3}>
        <StatusItem title="Travel" details="restrictions apply" color="red" highlight="" />
        <StatusItem title="Water" details="restrictions apply" color="red" highlight="" />
        <StatusItem title="Internet" details="available" color="green" highlight="" />
        <StatusItem title="Power" details="issues" color="yellow" highlight="" />
        <StatusItem title="Healthcare" details="available" color="green" highlight="" />
        <StatusItem title="Security" details="no issues" color="green" highlight="" />
        <StatusItem title="Weather" details="no issues" color="green" highlight="" />
        <StatusItem title="Essential Goods" details="available" color="green" highlight="" />
      </Overview>

      {/* Search */}
      <Search
        filterQuery={filterQuery}
        locality={selectedLocality.length ? selectedLocality[0] : ''}
        setFilterQuery={setFilterQuery}
      />

      {/* Status Details */}
      <Statuses>
        {filteredSections.map(section => (
          <StatusSection category={section.category} icon={section.icon} highlight={filterQuery} color={section.color}>
            {section.items.map(item => (
              <StatusItem title={item.title} details={item.details} color={item.color} highlight={filterQuery} />
            ))}
          </StatusSection>
        ))}
      </Statuses>

      {/* Modal */}
      <Modal
        isOpen={isEditLocationModalOpen}
        className="edit-location-modal"
        onRequestClose={onCurrentLocationClicked}
        overlayClassName="edit-location-modal__overlay"
        contentLabel="Edit Location"
      >
        <div className="edit-location-modal__header">
          <div className="edit-location-modal__title">Set your location</div>
        </div>
        <div className="edit-location-modal__content">
          <div className="edit-location-modal__desc">Search suburbs</div>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={(suggestion) => suggestion[0]}
            renderSuggestion={(suggestion) => (
              <span className="edit-location-modal__content-suggestion">
                {suggestion[0]}, {suggestion[1]}, NZ
              </span>
            )}
            inputProps={inputProps}
            onSuggestionSelected={(
              e,
              {
                suggestion,
                suggestionValue,
                suggestionIndex,
                sectionIndex,
                method,
              }
            ) => {
              selectLocality(suggestionValue)
              setEditLocationModalOpen(false);
            }}
          />
          <div className="edit-location-modal__delimeter-container">
            <div className="edit-location-modal__delimeter-left"></div>
            <div className="edit-location-modal__delimeter">or</div>
            <div className="edit-location-modal__delimeter-right"></div>
          </div>
          <button onClick={onCurrentLocationClicked} className="default-button edit-location-modal__current-location">
            Use current location
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
