/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import SelectComponent from '../Select';
import ComponentImage from '../ComponentImage';

class ComponentPreviewPersona extends Component {

  componentDidMount = () => {};

  render() {
    let { data } = this.props;
    return (
      <div className="h-100">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3>Preview Persona</h3>
        </div>
        <SelectComponent
          placeholder={data ? data.name : null}
          onChange={this.props.handleSelect}
          options={this.props.options}
          className="text-danger bg-white rounded-2 mb-3"
          isBorder={true}
          plColor="rgba(8, 18, 64, 0.8)"
        />
        <div className="text-center mb-2">
          <ComponentImage
            src={data ? data.image : null}
            className="w-110 h-110 object-fit-cover rounded-circle"
            alt={data ? data.image : null}
          />
        </div>
        <p>{data ? data.job_title : null}</p>
        <div>
          <div className="bg-blue-3 py-2 px-3">Demographic</div>
          <ul className="list-unstyled py-3">
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Name</span>
              <span className="flex-1">{data ? data.name : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Age</span>
              <span className="flex-1">{data ? data.age : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Gender</span>
              <span className="flex-1">{data ? data.gender.label : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Location</span>
              <span className="flex-1">{data ? data.location : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Job Title</span>
              <span className="flex-1">{data ? data.job_title : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Sector</span>
              <span className="flex-1">{data ? data.sector : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Marital Status</span>
              <span className="flex-1">{/* {data ? data.marital_status : null} */}</span>
            </li>
          </ul>
        </div>
        <div>
          <div className="bg-blue-3 py-2 px-3">Sources of information</div>
          <ul className="list-unstyled py-3">
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Tools</span>
              <span className="flex-1">{data ? data.tools : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Website</span>
              <span className="flex-1">{data ? data.website : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Vendor research</span>
              <span className="flex-1">{data ? data.vendor_research : null}</span>
            </li>
            <li className="d-flex py-1">
              <span className="fw-bold w-150">Social Networks</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ComponentPreviewPersona;
