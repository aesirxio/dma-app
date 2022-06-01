/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React from 'react';
import { runInAction } from 'mobx';

import CampaignsUtils from '../CampaignsUtils/CampaignsUtils';
import CampaignsModel from '../CampaignsModel/CampaignsModel';
import { AesirxCampaignApiService } from 'aesirx-dma-lib';
import { ProjectMasterDataModel } from '../../../store/Models/MasterDataModels/ProjectMasterDataModel';
import { CampaignMasterDataModel } from '../../../store/Models/MasterDataModels/CampaignMasterDataModel';

class CampaignsStore {
  globalStore = null;
  constructor(args = {}) {
    if (args) {
      this.globalStore = args.globalStore ? args.globalStore : null;
    }
  }

  async getProjectMasterData(isForce = false) {
    try {
      if (!this.globalStore) {
        return null;
      } else {
        const result = await this.globalStore.getMasterData({
          isForProjectMaster: true,
          isForceProjectMasterData: isForce,
        });

        const resultInModel = new ProjectMasterDataModel(
          result && result.projectMasterData ? result.projectMasterData : null
        );
        if (resultInModel) {
          return resultInModel;
        } else {
          return null;
        }
      }
    } catch (error) {
      return null;
    }
  }

  async fetchCampaigns(
    callbackOnSuccess,
    callbackOnError,
    paginationStep = 0,
    paginationSize = 25
  ) {
    try {
      const campaignService = new AesirxCampaignApiService();
      const respondedDataFromLibrary = await campaignService.getCampaigns(
        paginationStep,
        paginationSize
      );

      const CampaignsModels = await CampaignsUtils.transformCampaignResponseIntoModel(
        respondedDataFromLibrary.list
      );

      if (CampaignsModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: CampaignsModels,
            pagination: respondedDataFromLibrary.pagination,
          });
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

  async saveCampaigns(campaignsData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedCampaignsData = CampaignsModel.convertSubmittedDataToAPIService(campaignsData);

      const campaignService = new AesirxCampaignApiService();
      let resultOnSave = false;

      if (campaignsData.id === undefined) {
        resultOnSave = await campaignService.createCampaign(convertedCampaignsData);
      } else {
        resultOnSave = await campaignService.updateCampaign(convertedCampaignsData);
      }

      if (resultOnSave) {
        runInAction(() => {
          callbackOnSuccess();
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async deleteCampaigns(ids, callbackOnSuccess, callbackOnError) {
    if (!ids) return false;

    try {
      const campaignService = new AesirxCampaignApiService();
      const deleteIds = ids.join();
      const respondedFromApi = await campaignService.deleteCampaign(deleteIds);

      if (respondedFromApi.result === true) {
        runInAction(() => {
          callbackOnSuccess();
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getCampaign(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    const results = true;


    if (results) {
      const campaignService = new AesirxCampaignApiService();
      const respondedDataFromLibrary = await campaignService.getCampaign(id);

      const campaignsDataModels = CampaignsUtils.transformCampaignResponseIntoModel([
        respondedDataFromLibrary,
      ]);

      if (campaignsDataModels) {
        runInAction(() => {
          callbackOnSuccess(campaignsDataModels);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
    }
  }

  async searchCampaigns(
    callbackOnSuccess,
    callbackOnError,
    dataFilter = {},
    paginationStep = 1,
    paginationSize = 25
  ) {
    try {
      const CampaignAPIService = new AesirxCampaignApiService();
      const respondedDataFromLibrary = await CampaignAPIService.searchCampaigns(
        dataFilter,
        paginationStep,
        paginationSize
      );

      let campaignDataModels = null;

      if (respondedDataFromLibrary !== null) {
        campaignDataModels = CampaignsUtils.transformCampaignResponseIntoModel(
          respondedDataFromLibrary.list
        );
      }

      if (campaignDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: campaignDataModels,
            pagination: respondedDataFromLibrary.pagination,
          });
        });
      } else {
        callbackOnSuccess({
          list: [],
          pagination: [],
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getCampaignMasterData(callbackOnSuccess, callbackOnError) {
    try {
      if (!this.globalStore) {
        runInAction(() => {
          callbackOnError({
            message: 'Global Store is NULL',
          });
        });
      } else {
        await this.globalStore.getMasterData(
          {
            isForCampaignMasterData: true,
          },
          (result) => {
            try {
              const resultCampaignInModel = new CampaignMasterDataModel(
                result && result.campaignMasterData ? result.campaignMasterData : null
              );

              runInAction(() => {
                callbackOnSuccess(resultCampaignInModel);
              });
            } catch (error) {
              runInAction(() => {
                callbackOnError({
                  message:
                    'resultInModel - ContentsStore - getMasterData - Something went wrong from Server response',
                });
              });
            }
          },
          (error) => {
            runInAction(() => {
              callbackOnError({
                message:
                  'ContentsStore - getMasterData - Something went wrong from Server response : ' +
                  error,
              });
            });
          }
        );
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}

export default CampaignsStore;
