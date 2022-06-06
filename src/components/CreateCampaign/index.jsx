/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from "react";
import SelectComponent from "../Select";

const optionCampaigns = [
  { value: "project1", label: "Project 1" },
  { value: "project2", label: "Project 2" },
  { value: "project3", label: "Project 3" },
];

class CreateCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: null
    };

  }

  handleCampaign = (selectedOption) => {
    this.setState(() => ({ campaign: selectedOption }));
  };


  render() {
    return (
      <div className="">
        <form>
          <label className="form-label mb-2" htmlFor="project">
            <span className="text-black opacity-75">Project </span>
            <span className="text-red-1">*</span>
          </label>
          <SelectComponent
            value={this.state.campaign}
            onChange={this.handleCampaign}
            options={optionCampaigns}
            className="mb-3 text-danger"
            isBorder={true}
            plColor="rgba(8, 18, 64, 0.8)"
          />

          <label className="form-label mb-2" htmlFor="campaignname">
            <span className="text-black opacity-75">Campaign name</span>
            <span className="text-red-1">*</span>
          </label>
          <input type="text" className="form-control mb-3" id="campaignname" />

          <label className="form-label mb-3" htmlFor="startdate">
            <span className="text-black opacity-75">Start date </span>
            <span className="text-red-1">*</span>
          </label>
          <input type="text" className="form-control mb-3" id="startdate" />

          <label className="form-label mb-3" htmlFor="enddate">
            <span className="text-black opacity-75">End date </span>
            <span className="text-red-1">*</span>
          </label>
          <input type="text" className="form-control" id="enddate" />

        </form>
      </div>
    );
  }
}

export default CreateCampaign;
