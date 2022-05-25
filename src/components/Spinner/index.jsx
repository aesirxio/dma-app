import React from "react";

import "./index.scss";

class Spinner extends React.Component {
  render() {
    return (
      <div className="position-fixed top-50 start-50 translate-middle">
        <div
          className="spinner-border"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
}

export default Spinner;
