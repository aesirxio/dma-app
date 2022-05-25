import React from "react";
import Helper from "../../../utils/helper";

class DescriptionsModel {
  constructor(data) {
    this.descriptions = data[0];
  }

  getChannelDescriptions = () => {
    return <>{this.descriptions ? this.descriptions.description : ""}</>;
  };
}

export { DescriptionsModel };
