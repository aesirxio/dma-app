/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { runInAction, makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import { notify } from 'aesirx-uikit';
import ChannelUtils from '../ChannelUtils/ChannelUtils';
import { AUTHORIZATION_KEY, Storage } from 'aesirx-lib';
import ProfileStore from '../../ProfilePage/ProfileStore/ProfileStore';

class ChannelsListViewModel {
  channelsStore = null;
  profileStore = null;
  channelsData = null;
  memberProfile = null;

  tableStatus = PAGE_STATUS.LOADING;

  showUpgrade = false;

  constructor(channelsStore) {
    makeAutoObservable(this);

    this.channelsStore = channelsStore;
    this.profileStore = new ProfileStore();
  }

  init = async () => {
    try {
      const channelsData = await this.channelsStore.getChannelsData();
      const memberProfile = await this.profileStore.getMemberProfile(
        Storage.getItem(AUTHORIZATION_KEY.MEMBER_ID) ?? 0
      );

      runInAction(() => {
        this.channelsData = channelsData;
        this.tableStatus = PAGE_STATUS.READY;
        this.memberProfile = memberProfile;
      });
    } catch (error) {
      this.catchError(error);
    }
  };

  reset = () => {
    this.channelsData = null;
    this.tableStatus = PAGE_STATUS.LOADING;
  };

  setChannelsDataFromMessage = (channelsData) => {
    this.channelsData = ChannelUtils.transformChannelResponseIntoModel(channelsData);
  };

  connectChannel = async (channelType) => {
    try {
      const response = await this.channelsStore.getChannelLoginUrl(channelType);

      if (response?.result?.must_upgrade) {
        this.mustUpgrade = true;
        return;
      }

      window.open(response.result.loginUrl, 'popup', 'width=600,height=600');

      // Todo: we need web socket to get data
    } catch (error) {
      this.catchError(error);
    }
  };

  closeModalUpgrade = () => {
    this.showUpgrade = false;
  };

  actions = async (action, channelType, channel) => {
    try {
      let msg = '';
      let status = await this.channelsStore[action](channelType.id, channel.id);

      switch (action) {
        case 'reconnectChannel':
          msg = `Reconnected ${channel.name} successfully`;

          if (!status.status) {
            this.showUpgrade = true;
          } else {
            //notify(msg);
            channel.connected = !channel.connected;
          }

          break;

        case 'disconnectChannel':
          msg = `Disconnected ${channel.name} successfully`;

          if (status.status) {
            //notify(msg);
            channel.connected = !channel.connected;
          } else {
            throw new Error(`Update ${channel.id} failed`);
          }

          break;

        case 'removeChannel':
          msg = `Removed successfully`;

          if (status) {
            notify(msg);
            channelType.pages = channelType.pages.filter((item) => item.id !== channel.id);
          } else {
            throw new Error(`Update ${channel.id} failed`);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      this.catchError(error);
      return false;
    }
  };

  bulk = async (action, channelType, channelIds) => {
    try {
      let msg = '';
      let status = await this.channelsStore[action](channelType.id, channelIds);

      switch (action) {
        case 'removeChannel':
          msg = `Removed successfully`;

          if (status) {
            notify(msg);
            channelType.pages = channelType.pages.filter((item) => !channelIds.includes(item.id));
          } else {
            throw new Error(`Update failed`);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      this.catchError(error);
      return false;
    }
  };

  catchError = () => {
    notify('Something went wrong from Server response. Please try again.', 'error');
  };
}

export default ChannelsListViewModel;
