import React, { useState, useEffect } from "react";
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
import Link from "./Link";

Modal.setAppElement("#root");

function App() {
  const selectedLocalityLS = localStorage.getItem('selectedLocality')
  const [selectedLocality, setSelectedLocality] = useState(selectedLocalityLS ? JSON.parse(selectedLocalityLS) : []);
  const [isEditLocationModalOpen, setEditLocationModalOpen] = useState(selectedLocality.length ? false : true);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");
  const [filterQuery, setFilterQuery] = useState("")
  const [vodafoneLineOk, setVodafoneLineOk] = useState(true);
  const [vodafoneMobileOk, setVodafoneMobileOk] = useState(true);
  const [sparkLandlineOk, setSparkLandlineOk] = useState(true);
  const [sparkMobileOk, setSparkMobileOk] = useState(true);
  const [vectorPowerOk, setVectorPowerOk] = useState(true);
  const [earthquakeOk, setEarthquakeOk] = useState(true);
  const [toiletPaperOk, setToiletPaperOk] = useState(true);
  const [alertLevelStatus, setAlertLevelStatus] = useState("Alert Level 1");
  const [waterCareOutageNumber, setWaterCareOutageNumber] = useState(0);
  const [damWaterLevel, setDamWaterLevel] = useState(100);

  async function fetchData() {
    try {
      const response = await fetch("https://api.checkon.life/data");
      const json = await response.json();
      console.log('json', json);
      setVodafoneLineOk(json.vodaphoneLineStatus.isOk);
      setVodafoneMobileOk(json.vodaphoneMobileStatus.isOk);
      setSparkLandlineOk(json.sparkLandlineStatus.isOk);
      setSparkMobileOk(json.sparkMobileStatus.isOk);
      setVectorPowerOk(json.vectorPowerStatus.isOk);
      setEarthquakeOk(json.earthQuakeStaus.isOk);
      setAlertLevelStatus(json.alertLevelStatus);
      setWaterCareOutageNumber(json.waterCareOutatage.numberOfOutages);
      setDamWaterLevel(Math.round(json.damWaterLevel.averageDamPercentage));
      setToiletPaperOk(json.countdownToiletPaperStatus.isOk);
    }
    catch (e) {
      alert(`Error loading data: ${e.message} 😢`)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function getSuggestions(value) {
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
      localStorage.setItem('selectedLocality', JSON.stringify(locality))
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

  function onCurrentLocationClicked() {
    setEditLocationModalOpen(false);
    selectLocality("Auckland Central");
  };

  const inputProps = {
    placeholder: "Try Auckland Central",
    value,
    onChange,
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
    ]
  },
  {
    category: "Essential Goods",
    icon: "section-essential.svg",
    color: "red",
    items: [
      { title: "Rice", details: "limited supply", color: "yellow" },
      toiletPaperOk ? { title: "Toilet Paper", details: "available", color: "green" } : { title: "Toilet Paper", details: "unavailable", color: "red" },
      { title: "Flour", details: "unavailable", color: "red" },
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
    color: (!waterCareOutageNumber && vectorPowerOk && vodafoneLineOk && sparkLandlineOk && vodafoneMobileOk && sparkMobileOk) ? "green" : (
      (!vectorPowerOk || (!vodafoneLineOk && !sparkLandlineOk) || (!vodafoneMobileOk && !sparkMobileOk)) ? "red" : "yellow"
    ),
    items: [
      (waterCareOutageNumber === 0 ? { title: "Water", details: "no outages reported", color: "green" } : { title: "Water", details: `${waterCareOutageNumber} outage(s)`, color: "yellow"}),
      (vectorPowerOk ? { title: "Power", details: "no disruptions", color: "green" } : { title: "Power", details: "issues", color: "red" }),
      (vodafoneLineOk && sparkLandlineOk) ? { title: "Landline & Internet", details: "available", color: "green" } : (!vodafoneLineOk && !sparkLandlineOk) ? { title: "Landline & Internet", details: "major disruption", color: "red" } : { title: "Landline & Internet", details: "partial disruption", color: "yellow" },
      (vodafoneMobileOk && sparkMobileOk) ? { title: "Mobile Networks", details: "available", color: "green" } : (!vodafoneMobileOk && !sparkMobileOk) ? { title: "Mobile Networks", details: "major disruption", color: "red" } : { title: "Mobile Networks", details: "partial disruption", color: "yellow" },
      { title: "Fuel", details: "available", color: "green" },
    ]
  },
  {
    category: "Transport",
    icon: "section-transport.svg",
    color: "red",
    items: [
      { title: "Traffic", details: "clear", color: "green" },
      { title: "Flights", details: "restricted", color: "red" },
      { title: "Travel", details: "restrictions apply", color: "yellow" },
      { title: "Fuel", details: "available", color: "green" },
    ]
  },
  {
    category: "Environment",
    icon: "section-environment.svg",
    color: earthquakeOk && damWaterLevel > 50 ? "green" : (!earthquakeOk || damWaterLevel < 30 ? "red" : "yellow"),
    items: [
      { title: "Air Quality", details: "good", color: "green" },
      { title: "Water Quality", details: "good", color: "green" },
      earthquakeOk ? { title: "Earthquakes", details: "no recent", color: "green"} : { title: "Earthquakes", details: "recent major quake", color: "red"},
      {title: "Dam Levels", details: `${damWaterLevel}%`, color: damWaterLevel > 50 ? "green" : damWaterLevel < 30 ? "red" : "yellow"},
    ]
  }]

  const filteredSections = sections.filter(section => {
    const query = filterQuery.trim().toLowerCase()
    const matchingItem = section.items.find(item => {
      return item.title.toLowerCase().indexOf(query) !== -1
    })
    return section.category.toLowerCase().indexOf(query) !== -1 || matchingItem
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
      <Overview
        location={selectedLocality.length ? selectedLocality[0] : ''}
        alertLevel={alertLevelStatus[selectedLocality[1]] ? alertLevelStatus[selectedLocality[1]] : alertLevelStatus["Rest of New Zealand"]}
      >
        <Link href="https://www.nzta.govt.nz/traffic-and-travel-information/"><StatusItem title="Travel" details="restrictions apply" color="yellow" highlight="" /></Link>
        <Link href="https://www.watercare.co.nz/Faults-outages"><StatusItem title="Water" details="restrictions apply" color="red" highlight="" /></Link>
        <Link href="https://www.vodafone.co.nz/help/network-status/">
            {(sparkMobileOk && vodafoneMobileOk && sparkLandlineOk && vodafoneLineOk) ? 
            <StatusItem title="Connectivity" details="available" color="green" highlight="" /> : 
              !(sparkMobileOk && vodafoneMobileOk && sparkLandlineOk && vodafoneLineOk) ? 
                <StatusItem title="Connectivity" details="some issues" color="yellow" highlight="" /> : 
                  <StatusItem title="Connectivity" details="critical outages" color="red" highlight="" />
          }
        </Link>
        <Link href="https://www.vector.co.nz/personal/outages">
          {vectorPowerOk ? 
            <StatusItem title="Power" details="no disruptions" color="green" highlight="" /> :
              <StatusItem title="Power" details="issues" color="red" highlight="" />
          }
        </Link>
        <Link href="/details?category=Healthcare"><StatusItem title="Healthcare" details="available" color="green" highlight="" /></Link>
        <Link href="/details?category=Security"><StatusItem title="Security" details="no issues" color="green" highlight="" /></Link>
        <Link href="https://www.metservice.com/towns-cities/locations/auckland"><StatusItem title="Weather" details="no issues" color="green" highlight="" /></Link>
        <Link href="/details?category=Essential Goods"><StatusItem title="Essential Goods" details="available" color="green" highlight="" /></Link>
      </Overview>

      {/* Search */}
      <Search
        filterQuery={filterQuery}
        locality={selectedLocality.length ? selectedLocality[0] : ''}
        setFilterQuery={setFilterQuery}
      />

      {/* Status Details */}
      <Statuses>
        {filteredSections.map((section, i) => (
          <StatusSection
            key={i}
            suburb={selectedLocality[0]}
            category={section.category}
            icon={section.icon}
            highlight={filterQuery}
            color={section.color}
          >
            {section.items.map((item, j) => (
              <StatusItem
                key={j}
                title={item.title}
                details={item.details}
                color={item.color}
                highlight={filterQuery}
              />
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
