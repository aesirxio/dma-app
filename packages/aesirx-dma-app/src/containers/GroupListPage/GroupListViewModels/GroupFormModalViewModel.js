/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import { notify } from 'aesirx-uikit';
import PAGE_STATUS from '../../../constants/PageStatus';
import { GROUP_FIELD_KEY } from '../../../constants/GroupModule';

class GroupFormModalViewModel {
  show = false;
  groupEditdata = null;
  formStatus = PAGE_STATUS.READY;
  editMode = false;
  groupListViewModel = null;
  groupStore = null;
  groupFormComponent = null;

  constructor(groupStore) {
    makeAutoObservable(this);
    this.groupStore = groupStore;
  }

  setGroupListViewModel = (groupListViewModelInstance) => {
    this.groupListViewModel = groupListViewModelInstance;
  };

  setForm = (groupFormComponent) => {
    this.groupFormComponent = groupFormComponent;
  };

  setEditGroup = (data) => {
    this.editMode = true;

    if (data[0] !== undefined && typeof data == 'object') {
      this.groupEditdata = data[0];
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  getGroup = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.groupStore.getGroup(id, this.setEditGroup, this.callbackOnErrorHander);
  };

  initForm = async (id = null) => {
    if (id && id > 0) {
      this.groupStore.getGroup(id, this.setEditGroup, this.callbackOnErrorHander);
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  loadForm = (id = null) => {
    this.openModal();
    this.formStatus = PAGE_STATUS.LOADING;
    this.initForm(id);
  };

  getGroupEditData = () => this.groupEditdata;

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.editMode = false;
    this.show = false;
  };

  saveOnModal = () => {
    if (this.editMode) {
      const groupId = this.groupEditdata.getId();
      this.groupFormComponent.formPropsData.id = groupId.value;

      let startDateParse = Date.parse(
        this.groupFormComponent.formPropsData[GROUP_FIELD_KEY.START_DATE]
      );
      let endDateParse = Date.parse(
        this.groupFormComponent.formPropsData[GROUP_FIELD_KEY.END_DATE]
      );

      if (
        this.groupFormComponent.formPropsData[GROUP_FIELD_KEY.NAME] === '' ||
        startDateParse >= endDateParse
      ) {
        notify('Something went wrong from Server response', 'error');
      }
    }

    this.groupStore.saveGroup(
      this.groupFormComponent.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    notify(error.message, 'error');
  };

  callbackOnSuccessHandler = () => {
    this.closeModal();

    this.groupListViewModel.refreshTableGroupList();
    notify();
  };
}

export default GroupFormModalViewModel;
