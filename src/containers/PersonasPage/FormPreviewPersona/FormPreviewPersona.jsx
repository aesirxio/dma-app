import React, { Component, lazy } from "react";

import { observer } from "mobx-react";

import { withPersonaViewModel } from "../PersonaViewModels/PersonaViewModelContextProvider";
import ContentSbarRight from "../../../components/ContentSbarRight";

import { PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR } from "../../../constants/PersonaModule";

const FormPreviewPersona = observer(
  class FormPreviewPersona extends Component {
    previewPersonaViewModel = null;
    isHiddenPersonaPeview = false;
    isDisable = false;
    personaTableSelectionModalViewModel = null;

    constructor(props) {
      super(props);

      const { viewModel } = props;
      console.log("ContentFormGenera - Debug View Model Preview ----");
      console.log(viewModel);
      console.log(this.props);
      this.personaTableSelectionModalViewModel = this.props
        .personaTableSelectionModalViewModel
        ? this.props.personaTableSelectionModalViewModel
        : null;

      this.previewPersonaViewModel = viewModel
        ? viewModel.personaFormViewModel
        : null;

      console.log("After binding class Preview persona");
      console.log(this.previewPersonaViewModel);
    }

    componentDidMount = () => {};

    handleSelect = (e) => {
      if (e !== undefined) {
        this.previewPersonaViewModel.getPreviewPersona(e.value);
      }
    };

    handlShowPreviewPersona = (getValueSelected) => {
      const itemPersonalPerview = getValueSelected ? getValueSelected[0] : null;
      this.handleSelect(itemPersonalPerview);

      this.isHiddenPersonaPeview = !this.isHiddenPersonaPeview;
    };

    render() {
      let data = this.previewPersonaViewModel.previewPersonaData;
      console.log("render - this.personaTableSelectionModalViewModel");
      console.log(this.personaTableSelectionModalViewModel);

      let { getValueSelected } = this.personaTableSelectionModalViewModel;

      if (
        getValueSelected
          ? getValueSelected.length <= 0
          : null || getValueSelected === null
      ) {
        this.isHiddenPersonaPeview = true;
        this.isDisable = true;
      } else {
        this.isDisable = false;
      }

      return (
        <ContentSbarRight
          data={data}
          handleSelect={this.handleSelect}
          options={getValueSelected ? getValueSelected : null}
          disabled={this.isDisable}
          handlShowPreviewPersona={() =>
            this.handlShowPreviewPersona(getValueSelected)
          }
          isHidden={this.isHiddenPersonaPeview}
        />
      );
    }
  }
);

export default withPersonaViewModel(FormPreviewPersona);
