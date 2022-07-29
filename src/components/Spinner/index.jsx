/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from "react";

import "./index.scss";

class Spinner extends React.Component {
  render() {
    return (
      <div className="position-absolute top-50 start-50 translate-middle">
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
