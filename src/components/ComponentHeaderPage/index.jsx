/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ComponentHeaderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { title, textBtn, handleCreate, faIcons } = this.props;
    return (
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="fs-2">{title}</h2>
        {
          textBtn && (
            <span className={`cursor-pointer text-decoration-none btn btn-success`} onClick={handleCreate}>
              <i className={`text-white`}><FontAwesomeIcon icon={faIcons} /></i>
              <span className="ps-2">{textBtn}</span>
            </span>
          )
        }
        
      </div>
    );
  }
}

export default ComponentHeaderPage;