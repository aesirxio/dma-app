/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import { makeAutoObservable, runInAction } from 'mobx';
import { notify } from '../../../components/Toast';

class LoginCMSChannelFormModalViewModel {
  show = false;
  channelsStore = null;
  channelType = null;
  channelsListViewModel = null;

  constructor(channelsStore) {
    makeAutoObservable(this);
    this.channelsStore = channelsStore;
  }

  setForm = (form) => {
    console.log('324234324324324234', form);
    this.form = form;
  };

  setChannelsListViewModelInstance = (channelsListViewModelInstance) => {
    this.channelsListViewModel = channelsListViewModelInstance;
  };

  openModal = (channelType) => {
    this.show = true;
    this.channelType = channelType;
  };

  closeModal = () => {
    this.show = false;
  };

  saveCMSHandler = async () => {
    try {
      const result = this.channelsStore.connectCMS(this.form.formPropsData, this.channelType);

      if (result) {
        const channelsData = await this.channelsStore.getChannelsData();

        runInAction(() => {
          this.show = false;
          this.channelsListViewModel.channelsData = channelsData;
        });
      } else {
        throw new Error(`coonect CMS failed`);
      }
    } catch (error) {
      this.catchError(error);
    }
  };

  catchError = (error) => {
    notify('Something went wrong from Server response. Please try again.');
    console.log(error);
  };
}

export default LoginCMSChannelFormModalViewModel;
