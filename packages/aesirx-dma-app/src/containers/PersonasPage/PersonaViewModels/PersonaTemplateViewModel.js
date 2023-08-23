/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import contentsStore from '../../ContentPage/ContentStore/ContentStore';
import PersonaTemplateUtils from '../PersonaUtils/PersonaTemplateUtils';

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

  callbackOnErrorHander = () => {};
}

export default PersonaTemplateViewModel;
