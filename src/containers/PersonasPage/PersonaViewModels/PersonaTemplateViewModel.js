/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import PersonaUtils from '../PersonaUtils/PersonaUtils';
import { PERSONA_FIELD_KEY } from '../../../constants/PersonaModule';
import contentsStore from '../../ContentPage/ContentStore/ContentStore';
import PersonaTemplateUtils from '../PersonaUtils/PersonaTemplateUtils';

import { notify } from '../../../components/Toast';

class PersonaTemplateViewModel {
  personaStore = null;

  contentsStore = null;

  personaTemplatesData = null;

  constructor(personaStore) {
    makeAutoObservable(this);
    this.personaStore = personaStore;

    if (this.contentsStore === null) {
      this.contentsStore = new contentsStore();
    }
  }

  initializeData = () => {
    this.personaStore.getPersonaRecommendations(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      1
    );
  };

  callbackOnSuccessHandler = (personaTemplateModelData) => {
    const rowDataTransformed = PersonaTemplateUtils.transformPersonaTemplateModelIntoTableDataRow(
      personaTemplateModelData.list
    );

    this.personaTemplatesData = rowDataTransformed;
  };

  callbackOnErrorHander = (error) => {};
}

export default PersonaTemplateViewModel;
