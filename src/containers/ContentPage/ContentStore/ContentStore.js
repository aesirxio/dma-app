/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { runInAction } from 'mobx';

import ContentUtils from '../ContentUtils/ContentUtils';
import ContentModel from '../ContentModel/ContentModel';
import {
  AesirxContentApiService,
  AesirxPersonaApiService,
  AesirxProjectApiService,
  AesirxFacebookDataApiService,
  AesirxPlanningApiService,
  Storage,
} from 'aesirx-dma-lib';

import { ContentConnectedChannelsModel } from '../ContentModel/ContentConnectedChannelsModel';

import ProjectUtils from '../../ProjectsPage/ProjectUtils/ProjectUtils';

export default class ContentStore {
  globalStore = null;
  constructor(args = {}) {
    if (args) {
      this.globalStore = args.globalStore ? args.globalStore : null;
    }
  }

  async deleteContents(ids, callbackOnSuccess, callbackOnError) {
    if (!ids) return false;

    try {
      const contentAPIService = new AesirxContentApiService();
      const deleteIds = JSON.stringify(ids);

      const repondedDataFromLibrary = await contentAPIService.deleteContent(deleteIds);

      if (repondedDataFromLibrary.result === true) {
        runInAction(() => {
          callbackOnSuccess();
        });
      }
      return repondedDataFromLibrary;
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  searchContents = async (
    callbackOnSuccess,
    callbackOnError,
    dataFilter = {},
    paginationStep = 1,
    paginationSize = 25
  ) => {
    try {
      const contentAPIService = new AesirxContentApiService();
      const respondedDataFromLibrary = await contentAPIService.searchContents(
        dataFilter,
        paginationStep,
        paginationSize
      );

      let contentDataModels = null;

      if (respondedDataFromLibrary !== null) {
        contentDataModels = ContentUtils.transformContentResponseIntoModel(
          respondedDataFromLibrary.list
        );
      }

      if (contentDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: contentDataModels,
            pagination: respondedDataFromLibrary.pagination,
          });
        });
      } else {
        callbackOnError({
          message: 'No result',
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  };

  async getContentsByCampaignIDs(CampaignIDs, limit) {
    try {
      const contentAPIService = new AesirxContentApiService();

      const repondedDataFromLibrary = await contentAPIService.getContentsByCampaignIDs(
        CampaignIDs,
        limit
      );

      const contentDataModels =
        ContentUtils.transformContentResponseIntoModel(repondedDataFromLibrary);

      if (contentDataModels) {
        return contentDataModels;
      } else {
        return null;
      }
    } catch (error) {
      // no error throw
    }
  }

  async getConnectedChannelsByOrganizationID(callbackOnSuccess, callbackOnError) {
    try {
      const service = new AesirxPersonaApiService();

      const repondedDataFromLibrary = await service.getConnectedChannelByOrganisationId();

      const contentDataModels = new ContentConnectedChannelsModel(repondedDataFromLibrary.result);

      if (contentDataModels) {
        runInAction(() => {
          callbackOnSuccess(contentDataModels);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getConnectedChannelByPersonaIds(callbackOnSuccess, callbackOnError, personaIds) {
    try {
      const service = new AesirxPersonaApiService();

      const repondedDataFromLibrary = await service.getConnectedChannelByPersonaIds(personaIds);

      const contentDataModels = new ContentConnectedChannelsModel(repondedDataFromLibrary.result);

      if (contentDataModels) {
        runInAction(() => {
          callbackOnSuccess(contentDataModels);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getProjectItemByProjectId(projectId, callbackOnSuccess, callbackOnError) {
    if (!projectId) return false;

    try {
      const results = true;

      if (results) {
        const projectAPIService = new AesirxProjectApiService();
        const respondedDataFromLibrary = await projectAPIService.getProjectItem(projectId, false);

        const projectDataModels = ProjectUtils.transformProjectResponseIntoModel([
          respondedDataFromLibrary,
        ]);

        if (projectDataModels) {
          runInAction(() => {
            callbackOnSuccess(projectDataModels);
          });
        } else {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        }
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getUserAccountDataFromFacebookData(callbackOnSuccess, callbackOnError) {
    try {
      const organisationId = Storage.getItem('organisation_id');
      const facebookDataAPIService = new AesirxFacebookDataApiService();
      const userAccountDataFromFacebook =
        await facebookDataAPIService.getUserAccountDataFromFacebookData(organisationId);

      if (userAccountDataFromFacebook) {
        runInAction(() => {
          callbackOnSuccess(userAccountDataFromFacebook);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  fetchContents = async (paginationStep = 0, paginationSize = 25) => {
    try {
      const contentAPIService = new AesirxContentApiService();

      const repondedDataFromLibrary = await contentAPIService.getPosts(
        paginationStep,
        paginationSize
      );

      const contentDataModels =
        ContentUtils.transformContentResponseIntoModel(repondedDataFromLibrary);

      return {
        list: contentDataModels,
        pagination: repondedDataFromLibrary.pagination,
      };
    } catch (error) {
      return null;
    }
  };

  getListContentChannelItem = async (id) => {
    if (!id) return false;

    try {
      const contentService = new AesirxContentApiService();
      const repondedDataFromLibrary = await contentService.getContentChannelItem(id);

      if (repondedDataFromLibrary) {
        const contentDataModels = ContentUtils.transformContentResponseIntoModel(
          repondedDataFromLibrary.result,
          id
        );
        const result = ContentUtils.transformContentModelIntoTableDataRow(contentDataModels);

        return result;
      }
      return [];
    } catch (error) {
      return [];
    }
  };

  saveContent = async (contentData, channelMasterData, type) => {
    try {
      const convertedContentData = ContentModel.convertSubmittedDataToAPIService(
        contentData,
        channelMasterData
      );

      const contentService = new AesirxContentApiService();

      let resultContent = await contentService.createPost(convertedContentData, type);

      return resultContent;
    } catch (error) {
      return false;
    }
  };

  saveContentIntegration = async (contentData, channelMasterData, type, channel, pageId) => {
    try {
      const convertedContentData = ContentModel.convertSubmittedIntegrationDataToAPIService(
        contentData,
        channelMasterData,
        channel,
        pageId
      );
      console.log(convertedContentData);
      const contentService = new AesirxContentApiService();

      let resultContent = await contentService.createPost(convertedContentData, type);

      return resultContent;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  getMasterData = async () => {
    try {
      if (!this.globalStore) {
        return null;
      }

      const result = await this.globalStore.getMasterData({
        isForCampaignMasterData: true,
        isForceCampaignMasterData: true,
        isForPersonaMasterData: true,
        isForcePersonaMasterData: true,
        isForProjectMaster: true,
        isForceProjectMasterData: true,
      });
      return result;
    } catch (error) {
      return null;
    }
  };

  getContentItemDetailChannel = async (categoryId, itemId) => {
    if (!categoryId) return null;

    try {
      const contentService = new AesirxContentApiService();

      const repondedDataFromLibrary = await contentService.getPostItem(categoryId, itemId);

      if (repondedDataFromLibrary) {
        const contentDataModels = ContentUtils.transformContentResponseIntoModel([
          repondedDataFromLibrary,
        ]);

        return contentDataModels?.[0];
      }
    } catch (error) {
      return null;
    }
  };

  getFacebookAdPreviewFromFacebookData = async (creative, pageId) => {
    try {
      const facebookDataAPIService = new AesirxFacebookDataApiService();
      const adPreviewDataFromFacebook = await facebookDataAPIService.getAdPreviewFromFacebookData(
        creative,
        pageId,
        Storage.getItem('organisation_id')
      );

      return adPreviewDataFromFacebook;
    } catch (error) {
      return false;
    }
  };

  async searchPlanning(
    callbackOnSuccess,
    callbackOnError,
    dataFilter,
    paginationStep = 1,
    paginationSize = 25
  ) {
    try {
      const contentAPIService = new AesirxPlanningApiService();
      const respondedDataFromLibrary = await contentAPIService.searchPlanning(
        dataFilter,
        paginationStep,
        paginationSize
      );

      if (respondedDataFromLibrary) {
        runInAction(() => {
          callbackOnSuccess(respondedDataFromLibrary);
        });
      } else {
        callbackOnError({
          message: 'No result',
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
