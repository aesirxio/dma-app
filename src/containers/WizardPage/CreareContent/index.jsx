import React, { Component, lazy } from "react";

import StepWizard from "react-step-wizard";

import ContentFormGeneralWizard from "./ContentFormGeneralWizard";
import ContentFormPublishWizard from "./ContentFormPublishWizard";
import WizardSteps from "../../../components/WizardSteps";

class CreareContent extends Component {
  custom = {
    enterRight: "",
    enterLeft: "",
    exitRight: "",
    exitLeft: "",
  };

  render() {
    console.log("[CreareContent] - re-render .........");
    let { match } = this.props;
    let selectedProjectIdFromWizardStep1 = null;
    if (match && match.params) {
      selectedProjectIdFromWizardStep1 = match.params.id;
    }
    console.log("getIdProject", selectedProjectIdFromWizardStep1);

    return (
      <StepWizard isLazyMount={true} transitions={this.custom} className="px-3">
        <ContentFormGeneralWizard
          hashKey={"contentgeneral"}
          selectedProjectIdFromWizardStep1={selectedProjectIdFromWizardStep1}
          match={this.props.match}
        />
        <ContentFormPublishWizard hashKey={"contentpublish"} />
      </StepWizard>
    );
  }
}
export default CreareContent;
