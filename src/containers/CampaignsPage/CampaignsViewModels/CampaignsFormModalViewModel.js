/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { notify } from 'aesirx-uikit';
import PAGE_STATUS from '../../../constants/PageStatus';
import { CAMPAIGNS_FIELD_KEY } from '../../../constants/CampaignsModule';

class CampaignsFormModalViewModel {
  show = false;
  campaignEditdata = null;
  formStatus = PAGE_STATUS.READY;
  editMode = false;
  campaignsListViewModel = null;
  campaignsStore = null;
  campaignsFormComponent = null;

  dropdownlistProjectValues = null;

  constructor(campaignsStore) {
    makeAutoObservable(this);
    this.campaignsStore = campaignsStore;
  }

  setCampaignsListViewModel = (campaignsListViewModelInstance) => {
    this.campaignsListViewModel = campaignsListViewModelInstance;
  };

  setForm = (campaignsFormComponent) => {
    this.campaignsFormComponent = campaignsFormComponent;
  };

  setEditCampaigns = (data) => {
    this.editMode = true;

    if (data[0] !== undefined && typeof data == 'object') {
      this.campaignEditdata = data[0];
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  getCampaign = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.campaignsStore.getCampaign(id, this.setEditCampaigns, this.callbackOnErrorHander);
  };

  initForm = async (id = null) => {
    const projectMasterDataInModel = await this.campaignsStore.getProjectMasterData();

    if (id && id > 0) {
      this.campaignsStore.getCampaign(id, this.setEditCampaigns, this.callbackOnErrorHander);
    }

    runInAction(() => {
      this.dropdownlistProjectValues = projectMasterDataInModel
        ? projectMasterDataInModel.toDropdownListValues()
        : null;
    });

    this.formStatus = PAGE_STATUS.READY;

    // this.campaignsStore.getProjectMasterData((projectMasterDataInModel) => {

    //   if (id && id > 0) {
    //     this.campaignsStore.getCampaign(id, this.setEditCampaigns, this.callbackOnErrorHander);
    //   } else {
    //     this.formStatus = PAGE_STATUS.READY;
    //   }
    // }, this.callbackOnErrorHander);
  };

  loadForm = (id = null) => {
    this.openModal();
    this.formStatus = PAGE_STATUS.LOADING;
    this.initForm(id);
  };

  getCampaignEditData = () => this.campaignEditdata;

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.editMode = false;
    this.show = false;
  };

  saveOnModal = () => {
    if (this.editMode) {
      const campaignId = this.campaignEditdata.getId();
      this.campaignsFormComponent.formPropsData.id = campaignId.value;

      let startDateParse = Date.parse(
        this.campaignsFormComponent.formPropsData[CAMPAIGNS_FIELD_KEY.START_DATE]
      );
      let endDateParse = Date.parse(
        this.campaignsFormComponent.formPropsData[CAMPAIGNS_FIELD_KEY.END_DATE]
      );

      if (
        this.campaignsFormComponent.formPropsData[CAMPAIGNS_FIELD_KEY.NAME] === '' ||
        startDateParse >= endDateParse
      ) {
        notify('Something went wrong from Server response', 'error');
      }
    }

    this.campaignsStore.saveCampaigns(
      this.campaignsFormComponent.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  callbackOnErrorHander = (error) => {
    notify(error.message);
  };

  callbackOnSuccessHandler = () => {
    this.closeModal();

    this.campaignsListViewModel.refreshTableCampaignsList();
    notify();
  };
}

export default CampaignsFormModalViewModel;
