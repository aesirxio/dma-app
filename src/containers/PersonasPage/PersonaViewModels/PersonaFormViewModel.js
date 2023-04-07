/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { notify } from '../../../components/Toast';
import history from '../../../routes/history';

import PAGE_STATUS from '../../../constants/PageStatus';
import { PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR } from '../../../constants/PersonaModule';
import ChannelUtils from '../../ChannelsPage/ChannelUtils/ChannelUtils';
import ChannelStore from '../../ChannelsPage/ChannelsStore/ChannelsStore';

class PersonaFormViewModel {
  personaListViewModel = null;

  personaStore = null;

  personaFormComponent = null;

  formStatus = PAGE_STATUS.LOADING;

  previewPersonaData = null;

  connectedChannelMasterData = null;

  getDataValueSelectedPersona = [];

  getDataValueSelectedIds = [];

  getAge = null;

  constructor(personaStore) {
    makeAutoObservable(this);
    this.personaStore = personaStore;
    this.channelStore = new ChannelStore();
  }

  init = async (match) => {
    this.formStatus = PAGE_STATUS.LOADING;

    const channelData = await this.channelStore.getChannelsData();

    //const connectedChannelMasterData = ChannelUtils.getChannelByFilter(channelData, 'connected');
    const connectedChannelMasterData = ChannelUtils.connectedChannelGroupOptions(channelData);

    if (!connectedChannelMasterData) {
      notify('Please connect a channel', 'warn');
      history.push('/channels');
    }

    if (match.params.id) {
      const data = await this.personaStore.getPersona(match.params.id);
      this.personaFormComponent.populatingFormDataHandler(data[0], connectedChannelMasterData);
    }

    runInAction(() => {
      this.connectedChannelMasterData = connectedChannelMasterData;

      this.formStatus = PAGE_STATUS.READY;
    });
  };

  setForm = (personaFormComponent) => {
    this.personaFormComponent = personaFormComponent;
  };

  getPersonaTemplate = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.personaStore.getPersonaRecommendationItem(
      id,
      this.setCreatePersonaByTemplate,
      this.callbackOnErrorHander
    );
  };

  setCreatePersonaByTemplate = (data) => {
    this.formStatus = PAGE_STATUS.READY;
    // Override data to recognize is to create new persona from persona template
    data[0].id = 0;
    this.personaFormComponent.populatingFormDataHandler(data[0]);
  };

  getPreviewPersona = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.personaStore.getPersona(
      id,
      (result) => {
        this.previewPersonaData = result[0];
      },
      this.callbackOnErrorHander
    );
  };

  savePersona = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    const result = await this.personaStore.savePersona(this.personaFormComponent.formPropsData);

    runInAction(() => {
      this.formStatus = PAGE_STATUS.READY;
    });

    if (result) {
      notify('Saved', 'success');
      history.push('/personas');
    } else {
      notify('Something was wrong. Please try again', 'error');
    }
  };

  callbackOnErrorHander = () => {};

  callbackOnSuccessHandler = () => {
    this.formStatus = PAGE_STATUS.READY;
    history.push('/personas');
  };

  getSelectedLabels = (value) => {
    let labels = value && value.map((e) => e.label);

    this.getDataValueSelectedPersona = labels;
  };

  getSelectedIDs = () => {
    if (!this.getDataValueSelectedIds) return null;
    const convertedInArray = this.getDataValueSelectedIds
      .map((item) => {
        return item[PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.VALUE];
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);

    let result = convertedInArray;

    return result;
  };
}

export default PersonaFormViewModel;
