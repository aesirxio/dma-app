/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import PAGE_STATUS from '../../../constants/PageStatus';
import history from '../../../routes/history';
import { PROJECT_COLUMN_INDICATOR } from '../../../constants/ProjectModule';

class ProjectFormModalViewModel {
  show = false;
  projectEditdata = null;
  editMode = null;
  projectListViewModel = null;
  formStatus = PAGE_STATUS.READY;

  projectStore = null;
  projectFormComponent = null;

  constructor(projectStore) {
    makeAutoObservable(this);
    this.projectStore = projectStore;
  }

  setProjectListViewModel = (projectListViewModelInstance) => {
    this.projectListViewModel = projectListViewModelInstance;
  };

  setForm = (projectFormComponent) => {
    this.projectFormComponent = projectFormComponent;
  };

  setEditProject = (data) => {
    this.editMode = true;
    this.formStatus = PAGE_STATUS.READY;

    if (data[0] !== undefined && typeof data == 'object') {
      this.projectEditdata = data[0];
    }

    this.openModal();
  };

  getProject = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.projectStore.getProject(id, this.setEditProject, this.callbackOnErrorHander);
  };

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.editMode = false;
    this.show = false;
  };

  saveOnModal = () => {
    // const isFormValid = this.projectFormComponent.isFormValid();
    if (this.editMode) {
      const projectID = this.projectEditdata.getId();
      this.projectFormComponent.formPropsData.id = projectID.value;

      let startDateParse = Date.parse(
        this.projectFormComponent.formPropsData[PROJECT_COLUMN_INDICATOR.START_DATE]
      );
      let endDateParse = Date.parse(
        this.projectFormComponent.formPropsData[PROJECT_COLUMN_INDICATOR.END_DATE]
      );

      if (startDateParse >= endDateParse) {
        notify('Something went wrong from Server response');
      }
    }

    this.projectStore.saveProject(
      this.projectFormComponent.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = () => {};

  callbackOnSuccessHandler = (projectId) => {
    this.closeModal();

    if (history.location.pathname === '/wizard/createproject') {
      history.push(`/wizard/project/${projectId}`);
    }

    this.projectListViewModel.refreshTableProjectList();
  };
}

export default ProjectFormModalViewModel;
