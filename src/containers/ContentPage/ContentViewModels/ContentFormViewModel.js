/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { notify } from 'aesirx-uikit';
import PAGE_STATUS from '../../../constants/PageStatus';
import ProjectUtils from '../../ProjectsPage/ProjectUtils/ProjectUtils';
import CampaignsUtils from '../../CampaignsPage/CampaignsUtils/CampaignsUtils';
import PersonaUtils from '../../PersonasPage/PersonaUtils/PersonaUtils';
import ChannelsStore from '../../ChannelsPage/ChannelsStore/ChannelsStore';
import ChannelUtils from '../../ChannelsPage/ChannelUtils/ChannelUtils';
import ContentUtils from '../ContentUtils/ContentUtils';
import { history } from 'aesirx-uikit';
import ProfileStore from '../../ProfilePage/ProfileStore/ProfileStore';
import { AUTHORIZATION_KEY, Storage } from 'aesirx-lib';
//                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           b';

class ContentFormViewModel {
  formStatus = PAGE_STATUS.LOADING;
  campaignMasterData = [];
  projectMasterData = [];
  personaMasterData = [];
  channelMasterData = [];
  form = null;
  showAddChannelModel = false;
  selectedChannels = [];
  getDataPreviewFromFacebook = null;

  contentData = null;
  isLoading = false;
  itemId = 0;
  categoryId = 0;

  constructor(contentStore) {
    makeAutoObservable(this);
    this.contentStore = contentStore;
    this.channelStore = new ChannelsStore();
    this.profileStore = new ProfileStore();
  }

  init = async (form, match) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.form = form;
    this.contentData = null;

    const memberProfile = await this.profileStore.getMemberProfile(
      Storage.getItem(AUTHORIZATION_KEY.MEMBER_ID) ?? 0
    );
    console.log(memberProfile);

    if (!memberProfile.allow_create_item && match.path == '/content/create') {
      notify('Please upgrade account at https://dma.aesirx.io');
      history.push('/content');
    }

    const masterData = await this.contentStore.getMasterData();
    const channelsData = await this.channelStore.getChannelsData();

    const campaignMasterData = CampaignsUtils.toDropdownOptions(
      masterData?.campaignMasterData?.result
    );

    const personaMasterData = PersonaUtils.toDropdownOptions(masterData?.personaMasterData);
    const projectMasterData = ProjectUtils.toDropdownOptions(masterData?.projectMasterData);

    let channelMasterData = [];

    if (match?.params?.categoryId) {
      this.contentData = await this.contentStore.getContentItemDetailChannel(
        match.params.categoryId,
        match.params?.itemId
      );
      channelMasterData = ContentUtils.getListSelectChannel(this.contentData, channelsData);

      this.itemId = match.params?.itemId;
      this.categoryId = match.params?.categoryId;
    } else {
      channelMasterData = ChannelUtils.getChannelByFilter(channelsData, 'connected');
    }

    if (channelMasterData.length === 0) {
      notify('Please connect a Channel', 'warn');
      history.push('/channel');
    }

    runInAction(() => {
      this.campaignMasterData = campaignMasterData;
      this.projectMasterData = projectMasterData;
      this.personaMasterData = personaMasterData;
      this.channelMasterData = channelMasterData;

      // get edit content
      this.form.populatingFormDataHandler(
        this.contentData,
        channelMasterData,
        projectMasterData,
        campaignMasterData,
        personaMasterData
      );
      this.formStatus = PAGE_STATUS.READY;
    });
  };

  initIntegration = async (form) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.form = form;
    this.contentData = null;

    // const masterData = await this.contentStore.getMasterData();
    const channelsData = await this.channelStore.getChannelsData();

    // const campaignMasterData = CampaignsUtils.toDropdownOptions(
    //   masterData?.campaignMasterData?.result
    // );

    // const personaMasterData = PersonaUtils.toDropdownOptions(masterData?.personaMasterData);
    // const projectMasterData = ProjectUtils.toDropdownOptions(masterData?.projectMasterData);

    let channelMasterData = [];
    channelMasterData = ChannelUtils.getChannelByFilter(channelsData, 'connected');

    if (channelMasterData.length === 0) {
      notify('Please connect a Channel', 'warn');
    }

    runInAction(() => {
      // this.campaignMasterData = campaignMasterData;
      // this.projectMasterData = projectMasterData;
      // this.personaMasterData = personaMasterData;
      this.channelMasterData = channelMasterData;

      // get edit content
      this.form.populatingFormDataHandler(
        this.contentData,
        channelMasterData
        // projectMasterData,
        // campaignMasterData,
        // personaMasterData
      );
      this.formStatus = PAGE_STATUS.READY;
    });
  };

  getPersonaChannel = async (data) => {
    let channelMasterData = [];

    if (data !== null) {
      const getChannelId = data
        .map((key) => key.channels)
        .filter((value) => {
          return value != null;
        })
        .reduce((arr, el) => [...arr, ...el], []);

      channelMasterData = ContentUtils.getListSelectChannel(
        getChannelId,
        this.channelMasterData,
        true
      );
    } else {
      const channelsData = await this.channelStore.getChannelsData();
      channelMasterData = ChannelUtils.getChannelByFilter(channelsData, 'connected');
    }

    runInAction(() => {
      this.channelMasterData = channelMasterData;
    });
  };

  setForm = (form) => {
    this.form = form;
  };

  setSelectedChannel = (channel) => {
    this.selectedChannels.push(channel);
  };

  saveSeletedChannel = () => {
    this.selectedChannels.forEach((channel) => {
      channel.removed = false;
    });

    this.showAddChannelModel = false;
  };

  save = async (type) => {
    this.formStatus = PAGE_STATUS.LOADING;

    const result = await this.contentStore.saveContent(
      this.form.formPropsData,
      this.channelMasterData,
      type
    );

    runInAction(() => {
      this.formStatus = PAGE_STATUS.READY;
    });

    if (result) {
      notify('Saved', 'success');
      history.push('/content');
    } else {
      notify('Something was wrong. Please try again', 'error');
    }
  };

  saveIntegration = async (type, channel, pageId) => {
    this.formStatus = PAGE_STATUS.LOADING;
    const result = await this.contentStore.saveContentIntegration(
      this.form.formPropsData,
      this.channelMasterData,
      type,
      channel,
      pageId
    );
    runInAction(() => {
      this.formStatus = PAGE_STATUS.READY;
    });

    if (result) {
      notify('Saved', 'success');
    } else {
      notify('Something was wrong. Please try again', 'error');
    }
  };

  setShowAddChannelModel = (status) => {
    this.selectedChannels = [];
    this.showAddChannelModel = status;
  };

  catchError = () => {
    notify('Something went wrong from Server response. Please try again.', 'error');
  };

  setFacebookAdPreviewFromFacebookData = async (creative, pageId) => {
    this.isLoading = true;
    const dataPreviewFromFacebook = await this.contentStore.getFacebookAdPreviewFromFacebookData(
      creative,
      pageId
    );

    this.getDataPreviewFromFacebook = dataPreviewFromFacebook;
    if (this.getDataPreviewFromFacebook) {
      this.isLoading = false;
    }
  };

  requiredVideo = (data) => {
    if (data?.youtube.length > 0) {
      return data?.youtube.some((value) => value.file_extension === 'mp4');
    } else {
      return false;
    }
  };
}

export default ContentFormViewModel;
