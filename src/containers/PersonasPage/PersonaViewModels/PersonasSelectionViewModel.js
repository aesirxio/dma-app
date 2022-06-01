/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import { makeAutoObservable } from "mobx";
import PAGE_STATUS from "../../../constants/PageStatus";
import PersonaUtils from "../PersonaUtils/PersonaUtils";
import { PERSONA_FIELD_KEY } from "../../../constants/PersonaModule";

import { notify } from "../../../components/Toast";

class PersonasSelectionViewModel {
  show = false;

  multi = false;

  personaStore = null;

  personas = null;

  tableStatus = PAGE_STATUS.LOADING;

  personaSelectionData = [];

  channelSelectionData = [];

  constructor(personaStore) {
    makeAutoObservable(this);
    this.personaStore = personaStore;
  }

  resetObservableProperties() {
    this.multi = false;
    this.personaSelectionData = [];
    this.channelSelectionData = [];
    this.personas = null;
    this.tableStatus = PAGE_STATUS.LOADING;
  }

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.show = false;
  };

  setSelectionData = (data) => {
    if (!this.multi) {
      this.personaSelectionData = [];
    }

    this.personaSelectionData.push(data);
  };

  setMulti = (multi) => {
    this.multi = multi;
  };

  getSectionsValue = () => {
    return this.personaSelectionData
      .map((item) => {
        return {
          value: item[PERSONA_FIELD_KEY.ID],
          label: item[PERSONA_FIELD_KEY.NAME],
        };
      })
      .reduce((arr, el) => {
        const i = arr.findIndex((e) => e.value === el.value);

        if (i === -1) {
          arr.push(el);
        } else {
          arr[i] = el;
        }
        return arr;
      }, []);
  };

  getSelectedIDs = () => {
    if (!this.personaSelectionData) return null;
    const convertedInArray = this.personaSelectionData
      .map((item) => {
        return item[PERSONA_FIELD_KEY.ID];
      })
      .reduce((arr, el) => {
        const i = arr.findIndex((e) => e.value === el.value);

        if (i === -1) {
          arr.push(el);
        } else {
          arr[i] = el;
        }
        return arr;
      }, []);
    let result = convertedInArray;
    if (!this.multi) {
      result = convertedInArray.length > 0 ? convertedInArray[0] : null;
    }
    return result;
  };

  getSelectionData = () => {
    return this.personaSelectionData;
  };

  initializeData = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.personaStore.getPersonaMasterData(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    notify(error.message);
  };

  callbackOnSuccessHandler = (personaModelData) => {
    if (personaModelData) {
      this.tableStatus = PAGE_STATUS.READY;

      this.personas = personaModelData.toDropdownFullListValues();

    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default PersonasSelectionViewModel;
