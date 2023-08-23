/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { AesirxOrganisationChannelApiService } from 'aesirx-lib';
import ChannelUtils from '../ChannelUtils/ChannelUtils';

export default class ChannelsStore {
  globalStore = null;
  channelService = null;

  constructor(args = {}) {
    if (args) {
      this.globalStore = args.globalStore ? args.globalStore : null;
    }

    this.channelService = new AesirxOrganisationChannelApiService();
  }

  getChannelLoginUrl = async (channel) => {
    try {
      const response = await this.channelService.getLoginUrl(channel);

      return response;
    } catch (error) {
      // no error throw
    }
    return null;
  };

  getChannelsData = async () => {
    try {
      const channelsData = await this.channelService.getChannels();

      const data = ChannelUtils.transformChannelResponseIntoModel(channelsData);

      return data;
    } catch (error) {
      // no error throw
    }
    return [];
  };

  reconnectChannel = async (channelType, channelId) => {
    try {
      const status = await this.channelService.reconnectChannel(channelType, channelId);

      return JSON.parse(status);
    } catch (error) {
      return false;
    }
  };

  disconnectChannel = async (channelType, channelId) => {
    try {
      const status = await this.channelService.disconnectChannel(channelType, channelId);

      return JSON.parse(status);
    } catch (error) {
      return false;
    }
  };

  removeChannel = async (channelType, channelId) => {
    try {
      const status = await this.channelService.removeChannel(channelType, channelId);

      return status;
    } catch (error) {
      return false;
    }
  };
  bulkRemoveChannel = async (channelName, channelIds) => {
    try {
      const status = await this.channelService.bulkRemoveChannel(channelName, channelIds);
      return status;
    } catch (error) {
      return false;
    }
  };

  connectCMS = async (dataPost, channelType) => {
    try {
      const dataToAPi = ChannelUtils.convertSubmittedDataToAPIService(dataPost, channelType);
      const status = await this.channelService.doLoginCMS(dataToAPi);

      return status;
    } catch (error) {
      return false;
    }
  };
}
