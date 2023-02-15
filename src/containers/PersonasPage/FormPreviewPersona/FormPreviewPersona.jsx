/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';

import { withPersonaViewModel } from '../PersonaViewModels/PersonaViewModelContextProvider';
import ContentSbarRight from '../../../components/ContentSbarRight';

const FormPreviewPersona = observer(
  class FormPreviewPersona extends Component {
    previewPersonaViewModel = null;
    isHiddenPersonaPeview = false;
    isDisable = false;
    personaTableSelectionModalViewModel = null;

    constructor(props) {
      super(props);

      const { viewModel } = props;
      this.personaTableSelectionModalViewModel = this.props.personaTableSelectionModalViewModel
        ? this.props.personaTableSelectionModalViewModel
        : null;

      this.previewPersonaViewModel = viewModel ? viewModel.personaFormViewModel : null;
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

      let { getValueSelected } = this.personaTableSelectionModalViewModel;

      if (getValueSelected ? getValueSelected.length <= 0 : null || getValueSelected === null) {
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
          handlShowPreviewPersona={() => this.handlShowPreviewPersona(getValueSelected)}
          isHidden={this.isHiddenPersonaPeview}
        />
      );
    }
  }
);

export default withPersonaViewModel(FormPreviewPersona);
