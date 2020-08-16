import React from "react";
import { useHistory } from "react-router-dom";
import AlertFeed from "./AlertFeed";
import "./App.css";
import Header from "./Header";
import ReactTooltip from "react-tooltip";

function AppDetails({ location }) {
  const category = new URLSearchParams(location.search).get("category");
  const selectedLocalityLS = localStorage.getItem('selectedLocality')
  const locality = selectedLocalityLS ? JSON.parse(selectedLocalityLS) : []

  let history = useHistory();

  if (!locality.length) {
    return (
      <h1>
        Suburb not found{" "}
        <span role="img" aria-label="sad">
          😢
        </span>
      </h1>
    );
  }

  const barGraphs = [
    {
      id: "hospital-beds",
      tooltip:
        "Hospital Beds near you.",
      name: "Hospital Beds",
      timestampValue: "24 mins ago",
      year: "2010",
      date: "today",
      description: "",
    },
    {
      id: "intensive-care-beds",
      tooltip:
        "Intensive Care Beds near you.",
      name: "Intensive Care Beds",
      timestampValue: "24 mins ago",
      year: "2010",
      date: "today",
      description: "",
    },
    {
      id: "ventilators",
      tooltip:
        "Ventilators near you.",
      name: "Ventilators",
      timestampValue: "24 mins ago",
      year: "2010",
      date: "today",
      description: "",
    },
    {
      id: "response-time",
      tooltip:
        "Response time near you.",
      name: "Response time",
      timestampValue: "24 mins ago",
      year: "2010",
      date: "today",
      description: "",
    },
  ];

  return (
    <div className="App">
      {/* Header */}
      <Header
        title={`${category} Status`}
        location={locality.length ? `${locality[0]}, ${locality[1]}, NZ` : "-"}
        openEditLocation={() => {
          document.activeElement.blur();
        }}
        getAlerts={() => Notification.requestPermission()}
      />

      <div className="app-details__container">
        {/* ILIA TO DO */}
        <h1>
          <span onClick={() => history.push("/")} style={{ cursor: "pointer" }}>
            ←
          </span>{" "}
          {category} Status
        </h1>
        {barGraphs.map((barGraph, i) => (
          <div className="bar-graph__container" key={i}>
            <div className="bar-graph__header">
              <div className="bar-graph__status-indicator"></div>
              <div className="bar-graph__title">
                <div className="bar-graph__title-text">{barGraph.name}</div>
                <div
                  className="bar-graph__info"
                  data-tip
                  data-for={`tooltip-${barGraph.id}`}
                >
                  ?
                </div>
                <ReactTooltip
                  id={`tooltip-${barGraph.id}`}
                  place="top"
                  type="dark"
                  effect="solid"
                >
                  <p>{barGraph.tooltip}</p>
                  <p><a href="https://www.health.govt.nz/news-media/news-items/covid-19-novel-coronavirus-update-25-february">Source</a></p>
                </ReactTooltip>
              </div>
              <div className="bar-graph__timestamp">
                <div className="bar-graph__timestamp-desc">Last updated</div>
                <div className="bar-graph__timestamp-value">
                  {barGraph.timestampValue}
                </div>
              </div>
            </div>
            <div className="bar-graph__graph">
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
              <div className="bar-graph__bar bar-graph__bar--green" />
            </div>
            <div className="bar-graph__footer">
              <div className="bar-graph__year">{barGraph.year}</div>
              <div className="bar-graph__date">{barGraph.date}</div>
            </div>
          </div>
        ))}
        {/* OLAF TO DO */}
        <h1>Latest alerts</h1>
        <div className="last-alerts__container"></div>
        Here are some of the most relevant recent stories about {category}
        <AlertFeed />
      </div>
    </div>
  );
}

export default AppDetails;
