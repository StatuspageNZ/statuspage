import React from "react";
import "./App.css";
import Header from "./Header";

function AppDetails({ location }) {
  const category = new URLSearchParams(location.search).get('category');

  return (
    <div className="App">
      {/* Header */}
      <Header
        title="Healthcare Status"
        location="Browns Bay, Auckland, NZ"
        openEditLocation={() => {
          document.activeElement.blur();
        }}
        getAlerts={() => Notification.requestPermission()}
      />

      <div className="app-details__container">
        {/* ILIA TO DO */}
        <h1>Healthcare Status</h1>
        <div className="bar-graph__container">
          <div className="bar-graph__header">
            <div className="bar-graph__status-indicator"></div>
            <div className="bar-graph__title">
              <div className="bar-graph__title-text">Hospital Beds</div>
              <div className="bar-graph__info">?</div>
            </div>
            <div className="bar-graph__timestamp">
              <div className="bar-graph__timestamp-desc">Last updated</div>
              <div className="bar-graph__timestamp-value">24 mins ago</div>
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
            <div className="bar-graph__year">2010</div>
            <div className="bar-graph__date">Today</div>
          </div>

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
