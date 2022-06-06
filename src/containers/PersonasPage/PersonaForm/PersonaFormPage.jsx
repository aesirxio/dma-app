/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { observer } from 'mobx-react';

import SimpleReactValidator from 'simple-react-validator';
import { Form } from 'react-bootstrap';

import { withPersonaViewModel } from '../PersonaViewModels/PersonaViewModelContextProvider';

import ComponentFormFieldPersonaName from '../FormComponentPersona/ComponentFormFieldPersonaName';
import ComponentHeaderPage from '../../../components/ComponentHeaderPage';
import PAGE_STATUS from '../../../constants/PageStatus';
import Spinner from '../../../components/Spinner';

import { faSave } from '@fortawesome/free-regular-svg-icons/faSave';
import ComponentFormChannels from '../FormComponentPersona/ComponentFormChannels';

import ComponentFormFieldGeneral from '../FormComponentPersona/ComponentFormFieldGeneral';
import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';
import ComponentFormFieldTarget from '../FormComponentPersona/ComponentFormFieldTarget';

const PersonaFormPage = observer(
  class PersonaFormPage extends Component {
    formPropsData = {
      [PERSONA_FIELD_KEY.ALL_COUNTRIES]: 'yes',
      [PERSONA_FIELD_KEY.GENDER]: 'all',
    };

    validator = null;
    viewModel = null;

    constructor(props) {
      super(props);

      const { viewModel } = props;

      this.validator = new SimpleReactValidator({ autoForceUpdate: this });

      this.personaFormViewModel = viewModel ? viewModel.getPersonaFormViewModel() : null;

      this.personaFormViewModel.setForm(this);
    }

    componentDidMount = async () => {
      const { match } = this.props;

      this.personaFormViewModel.init(match);
    };

    populatingFormDataHandler = (data, connectedChannelMasterData) => {
      if (!data) return false;
      this.formPropsData[PERSONA_FIELD_KEY.ID] = data.id ?? 0;
      this.formPropsData[PERSONA_FIELD_KEY.NAME] = data.getName().value;
      this.formPropsData[PERSONA_FIELD_KEY.AVATAR_2] = data.getAvatar2().value;
      this.formPropsData[PERSONA_FIELD_KEY.AGE_FROM] = data.getAgeFrom();
      this.formPropsData[PERSONA_FIELD_KEY.AGE_TO] = data.getAgeTo();
      this.formPropsData[PERSONA_FIELD_KEY.GENDER] = data.getGender().value;
      this.formPropsData[PERSONA_FIELD_KEY.CHANNELS] = data.getChannels(connectedChannelMasterData);
      this.formPropsData[PERSONA_FIELD_KEY.DEMOGRAPHICS_TYPE] = data.getDemographicsType();
      this.formPropsData[PERSONA_FIELD_KEY.DEMOGRAPHICS_SELECT] = data.getDemographicsSelect();
      this.formPropsData[PERSONA_FIELD_KEY.INTERESTS_TYPE] = data.getInterestsType();
      this.formPropsData[PERSONA_FIELD_KEY.INTERESTS_SELECT] = data.getInterestsSelect();
      this.formPropsData[PERSONA_FIELD_KEY.BEHAVIORS_TYPE] = data.getBehaviorsType();
      this.formPropsData[PERSONA_FIELD_KEY.BEHAVIORS_SELECT] = data.getBehaviorsSelect();
      this.formPropsData[PERSONA_FIELD_KEY.LOCATION] = data.getLocation();
    };

    isFormValid = () => {
      if (this.validator.allValid()) {
        return true;
      } else {
        this.validator.showMessages();
        // rerender to show messages for the first time
        this.forceUpdate();
        return false;
      }
    };

    handleSave = () => {
      //this.personaFormViewModel.savePersona();
      if (this.isFormValid()) {
        this.personaFormViewModel.savePersona();
      }
    };

    render() {
      const { formStatus, personaData } = this.personaFormViewModel;

      if (formStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      this.populatingFormDataHandler(personaData);

      return (
        <Form key={Math.random(40, 200)} className="row">
          <div className="mb-4">
            <ComponentHeaderPage
              title={'Make Persona Overview'}
              textBtn={'Save persona'}
              handleCreate={this.handleSave}
              faIcons={faSave}
            />
          </div>
          <div className="col-4">
            <ComponentFormFieldPersonaName
              validator={this.validator}
              formPropsData={this.formPropsData}
              personaFormViewModel={this.personaFormViewModel}
              key="ComponentFormFieldPersonaName"
            />

            <ComponentFormFieldGeneral
              validator={this.validator}
              formPropsData={this.formPropsData}
              personaFormViewModel={this.personaFormViewModel}
            />
            <ComponentFormChannels
              validator={this.validator}
              connectedChannelMasterData={this.personaFormViewModel.connectedChannelMasterData}
              formPropsData={this.formPropsData}
            />
          </div>
          <div className="col-8">
            <ComponentFormFieldTarget
              validator={this.validator}
              formPropsData={this.formPropsData}
            />
          </div>
        </Form>
      );
    }
  }
);

export default withPersonaViewModel(PersonaFormPage);
