/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from "react";

class ComponentPreviewDevice extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {};

  render() {
    return (
      <div>
        <h5>Preview</h5>
        <div className="p-3 border-1 rounded-2">
          <div className="mb-3">
            <h5>Desktop</h5>
            <div className="bg-blue h-110"></div>
          </div>
          <div className="">
            <h5>Mobile</h5>
            <div className="bg-blue h-110"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ComponentPreviewDevice;
