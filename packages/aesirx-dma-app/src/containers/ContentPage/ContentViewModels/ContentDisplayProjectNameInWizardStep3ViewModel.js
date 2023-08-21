/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import { notify } from 'aesirx-uikit';
import PAGE_STATUS from '../../../constants/PageStatus';

class ContentDisplayProjectNameInWizardStep3ViewModel {
  contentsStore = null;

  formStatus = PAGE_STATUS.LOADING;

  value = null;

  constructor(contentsStore) {
    makeAutoObservable(this);
    this.contentsStore = contentsStore;
  }

  resetObservableProperties() {
    this.value = null;
  }

  renderProjectNameByProjectId = (projectId) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.contentsStore.getProjectItemByProjectId(
      projectId,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    this.formStatus = PAGE_STATUS.READY;
    notify(error.message);
  };

  callbackOnSuccessHandler = (projectItemInModel) => {
    const resultInModel = projectItemInModel ? projectItemInModel : null;
    this.value = resultInModel ? resultInModel[0].getName().value : null;
    this.formStatus = PAGE_STATUS.READY;
  };
}

export default ContentDisplayProjectNameInWizardStep3ViewModel;
