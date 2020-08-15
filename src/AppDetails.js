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

function AppDetails({ location }) {
  const category = new URLSearchParams(location.search).get('category');
  const [isEditLocationModalOpen, setEditLocationModalOpen] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
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
    const locality = suburbs.find((locality) => locality[0] === value);
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

  const sections = [
    {
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
      ],
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
      ],
    },
    {
      category: "Security",
      icon: "section-security.svg",
      color: "green",
      items: [
        { title: "Police Response", details: "25 mins", color: "green" },
        { title: "Army", details: "not deployed", color: "green" },
        { title: "Internet", details: "available", color: "green" },
      ],
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
      ],
    },
    {
      category: "Trasport",
      icon: "section-transport.svg",
      color: "red",
      items: [
        { title: "Traffic", details: "clear", color: "green" },
        { title: "Flights", details: "restricted", color: "red" },
        { title: "Travel", details: "restrictions apply", color: "green" },
        { title: "Fuel", details: "available", color: "green" },
        { title: "Potatoes", details: "available", color: "green" },
      ],
    },
    {
      category: "Environment",
      icon: "section-environment.svg",
      color: "green",
      items: [
        { title: "Air Quality", details: "good", color: "green" },
        { title: "Water Quality", details: "good", color: "green" },
      ],
    },
  ];

  const filteredSections = sections.filter((section) => {
    const matchingItem = section.items.find((item) => {
      return (
        item.title.toLowerCase().indexOf(filterQuery.trim().toLowerCase()) !==
        -1
      );
    });
    return (
      section.category
        .toLowerCase()
        .indexOf(filterQuery.trim().toLowerCase()) !== -1 || matchingItem
    );
  });

  return (
    <div className="App">
      {/* Header */}
      <Header
        title="Healthcare Status"
        location="Browns Bay, Auckland, NZ"
        openEditLocation={() => {
          document.activeElement.blur();
          setEditLocationModalOpen(true);
        }}
        getAlerts={() => Notification.requestPermission()}
      />

      <div className="app-details__container">
        {/* ILIA TO DO */}
        <h1 className="">Healthcare Status</h1>
        <div className="bar-graph__container">
          Hospital Beds ||||||||||||||||||||| 2010 Today
        </div>
        {/* OLAF TO DO */}
        <h1>Latest alerts</h1>
        <div className="last-alerts__container"></div>
        User wants to view details about {category}
      </div>
    </div>
  );
}

export default AppDetails;
