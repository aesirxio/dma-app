/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import { runInAction } from 'mobx';

import ContentUtils from '../ContentUtils/ContentUtils';
import ContentChannelsUtils from '../ContentUtils/ContentChannelsUtils';
import ContentModel from '../ContentModel/ContentModel';
import { AUTHORIZATION_KEY } from 'aesirx-dma-lib';
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

    console.log('DELETE CONTENT IDS');
    console.log(ids);

    try {
      const contentAPIService = new AesirxContentApiService();
      const deleteIds = JSON.stringify(ids);
      console.log('Prepare ids for delete: ', deleteIds);

      const repondedDataFromLibrary = await contentAPIService.deleteContent(deleteIds);

      if (repondedDataFromLibrary.result === true) {
        runInAction(() => {
          callbackOnSuccess();
        });
      }
    } catch (error) {
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  // async getContent(id, callbackOnSuccess, callbackOnError) {
  //   if (!id) return false;

  //   try {
  //     const contentService = new AesirxContentApiService();
  //     const repondedDataFromLibrary = await contentService.getContentItem(id);

  //     console.log('Content Store - getContent');
  //     console.log(repondedDataFromLibrary);

  //     if (repondedDataFromLibrary) {
  //       const contentDataModels = ContentUtils.transformContentResponseIntoModel([
  //         repondedDataFromLibrary,
  //       ]);

  //       if (contentDataModels) {
  //         runInAction(() => {
  //           callbackOnSuccess(contentDataModels);
  //         });
  //       } else {
  //         callbackOnError({
  //           message: 'Something went wrong from Server response',
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     runInAction(() => {
  //       callbackOnError(error);
  //     });
  //   }
  // }

  // async getContentItemDetailChannel(id, callbackOnSuccess, callbackOnError) {
  //   if (!id) return false;

  //   try {
  //     const contentService = new AesirxContentApiService();
  //     const repondedDataFromLibrary = await contentService.getPostItem(id);

  //     console.log('Content Store - getContent getContentChannelItem');
  //     console.log(repondedDataFromLibrary);

  //     if (repondedDataFromLibrary) {
  //       runInAction(() => {
  //         callbackOnSuccess(repondedDataFromLibrary);
  //       });
  //     } else {
  //       callbackOnError({
  //         message: 'Something went wrong from Server response',
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     runInAction(() => {
  //       callbackOnError(error);
  //     });
  //   }
  // }

  searchContents = async (
    callbackOnSuccess,
    callbackOnError,
    dataFilter = {},
    paginationStep = 1,
    paginationSize = 25
  ) => {
    try {
      console.log('Content Store - filter Content');
      const contentAPIService = new AesirxContentApiService();
      const respondedDataFromLibrary = await contentAPIService.searchContents(
        dataFilter,
        paginationStep,
        paginationSize
      );

      console.log('Debugging ---- filter campaign');
      console.log(respondedDataFromLibrary);
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
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  };

  async getContentsByCampaignIDs(CampaignIDs, limit) {
    try {
      console.log('Content Store - Fetch Content CampaignIDs');
      console.log(CampaignIDs);
      const contentAPIService = new AesirxContentApiService();

      const repondedDataFromLibrary = await contentAPIService.getContentsByCampaignIDs(
        CampaignIDs,
        limit
      );

      console.log('repondedDataFromLibrary - repondedDataFromLibrary CampaignIDs');

      console.log(repondedDataFromLibrary);

      const contentDataModels =
        ContentUtils.transformContentResponseIntoModel(repondedDataFromLibrary);

      console.log('contentDataModels contentDataModels');
      console.log(contentDataModels);

      if (contentDataModels) {
        return contentDataModels;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getConnectedChannelsByOrganizationID(callbackOnSuccess, callbackOnError) {
    try {
      const service = new AesirxPersonaApiService();

      const repondedDataFromLibrary = await service.getConnectedChannelByOrganisationId();

      console.log('repondedDataFromLibrary - getConnectedChannelsByProjectId');

      console.log(repondedDataFromLibrary);

      const contentDataModels = new ContentConnectedChannelsModel(repondedDataFromLibrary.result);

      console.log('contentDataModels contentDataModels');
      console.log(contentDataModels);

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
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getConnectedChannelByPersonaIds(callbackOnSuccess, callbackOnError, personaIds) {
    try {
      const service = new AesirxPersonaApiService();

      console.log('personaIds 3333');
      console.log(personaIds);

      const repondedDataFromLibrary = await service.getConnectedChannelByPersonaIds(personaIds);

      console.log('repondedDataFromLibrary - getConnectedChannelByPersonaIds idsids');

      console.log(repondedDataFromLibrary);

      const contentDataModels = new ContentConnectedChannelsModel(repondedDataFromLibrary.result);

      console.log('contentDataModels contentDataModels 3333');
      console.log(contentDataModels);

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
      console.log(error);
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

        console.log(projectDataModels);

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
      console.log(error);
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

      console.log('userAccountDataFromFacebook12345');
      console.log(userAccountDataFromFacebook);

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
      console.log(error);
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

      console.log('fetchContents repondedDataFromLibrary', repondedDataFromLibrary);

      const contentDataModels =
        ContentUtils.transformContentResponseIntoModel(repondedDataFromLibrary);

      console.log('fetchContents contentDataModels', repondedDataFromLibrary);

      return {
        list: contentDataModels,
        pagination: repondedDataFromLibrary.pagination,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  getListContentChannelItem = async (id) => {
    if (!id) return false;

    try {
      const contentService = new AesirxContentApiService();
      const repondedDataFromLibrary = await contentService.getContentChannelItem(id);

      console.log('Content Store - getContent getContentChannelItem', id, repondedDataFromLibrary);

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
      console.log(error);
      return [];
    }
  };

  saveContent = async (contentData, channelMasterData, type) => {
    try {
      console.log('Saving Content via call web service lib function', contentData, type);

      const convertedContentData = ContentModel.convertSubmittedDataToAPIService(
        contentData,
        channelMasterData
      );

      console.log('convertedContentData', convertedContentData);

      const contentService = new AesirxContentApiService();

      let resultContent = await contentService.createPost(convertedContentData, type);

      console.log('resultOnSave', resultContent);

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
      console.log(error);
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
      console.log(error);
      return null;
    }
  };

  getFacebookAdPreviewFromFacebookData = async (creative, pageId) => {
    try {
      console.log(
        'getFacebookAdPreviewFromFacebookData',
        creative,
        pageId,
        Storage.getItem('organisation_id')
      );
      const facebookDataAPIService = new AesirxFacebookDataApiService();
      const adPreviewDataFromFacebook = await facebookDataAPIService.getAdPreviewFromFacebookData(
        creative,
        pageId,
        Storage.getItem('organisation_id')
      );

      return adPreviewDataFromFacebook;
    } catch (error) {
      console.log(error);
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
      console.log('Content Store - filter Content');
      const contentAPIService = new AesirxPlanningApiService();
      const respondedDataFromLibrary = await contentAPIService.searchPlanning(
        dataFilter,
        paginationStep,
        paginationSize
      );

      console.log('Debugging ---- filter planing');
      console.log(respondedDataFromLibrary);
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
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
