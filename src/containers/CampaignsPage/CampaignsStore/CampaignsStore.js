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
        console.log('Project Store - Get Global Store');
        console.log(this.globalStore);

        const result = await this.globalStore.getMasterData({
          isForProjectMaster: true,
          isForceProjectMasterData: isForce,
        });

        const resultInModel = new ProjectMasterDataModel(
          result && result.projectMasterData ? result.projectMasterData : null
        );
        console.log('CampaignsStore - getProjectMasterData');
        console.log(result);
        console.log('CampaignsStore - resultToDropdownlistValues');
        console.log(resultInModel);
        if (resultInModel) {
          return resultInModel;
        } else {
          return null;
        }
      }
    } catch (error) {
      console.log(error);
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
      console.log('Persona Store - Fetch Personas');
      const campaignService = new AesirxCampaignApiService();
      const respondedDataFromLibrary = await campaignService.getCampaigns(
        paginationStep,
        paginationSize
      );

      console.log('respondedDataFromLibrary respondedDataFromLibrary', respondedDataFromLibrary);

      const CampaignsModels = await CampaignsUtils.transformCampaignResponseIntoModel(
        respondedDataFromLibrary.list
      );

      console.log('respondedDataFromLibrary respondedDataFromLibrary - after');
      console.log(CampaignsModels);

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
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async saveCampaigns(campaignsData, callbackOnSuccess, callbackOnError) {
    try {
      console.log('Saving Project via call web service lib function');
      console.log(campaignsData);

      const convertedCampaignsData = CampaignsModel.convertSubmittedDataToAPIService(campaignsData);

      console.log('convertedCampaignsData', convertedCampaignsData);

      const campaignService = new AesirxCampaignApiService();
      let resultOnSave = false;

      if (campaignsData.id === undefined) {
        console.log('CREATE CAMPAIGN');
        resultOnSave = await campaignService.createCampaign(convertedCampaignsData);
      } else {
        console.log('UPDATE CAMPAIGN', convertedCampaignsData);
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
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async deleteCampaigns(ids, callbackOnSuccess, callbackOnError) {
    if (!ids) return false;

    console.log('DELETE CAMPAIGN IDS');
    console.log(ids);

    try {
      const campaignService = new AesirxCampaignApiService();
      const deleteIds = ids.join();
      console.log('Prepare ids for delete: ', deleteIds);
      const respondedFromApi = await campaignService.deleteCampaign(deleteIds);

      if (respondedFromApi.result === true) {
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

  async getCampaign(id, callbackOnSuccess, callbackOnError) {
    console.log('ID for get Campaign', id);
    if (!id) return false;

    // try {
    const results = true;

    // const editCampaigns = campaigns.filter(
    //   (campaigns) => campaigns.id !== parseInt(id)
    // );

    if (results) {
      const campaignService = new AesirxCampaignApiService();
      const respondedDataFromLibrary = await campaignService.getCampaign(id);

      console.log('Campaign - getCampain from API', respondedDataFromLibrary);

      const campaignsDataModels = CampaignsUtils.transformCampaignResponseIntoModel([
        respondedDataFromLibrary,
      ]);

      console.log(campaignsDataModels);

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
    // } catch (error) {
    //   console.log(error);
    //   runInAction(() => {
    //     callbackOnError(error);
    //   });
    // }
  }

  async searchCampaigns(
    callbackOnSuccess,
    callbackOnError,
    dataFilter = {},
    paginationStep = 1,
    paginationSize = 25
  ) {
    try {
      console.log('Campaign Store - filter Campaign');
      const CampaignAPIService = new AesirxCampaignApiService();
      const respondedDataFromLibrary = await CampaignAPIService.searchCampaigns(
        dataFilter,
        paginationStep,
        paginationSize
      );

      console.log('Debugging ---- filter campaign');
      console.log(respondedDataFromLibrary);
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
      console.log(error);
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
        console.log('Campaign Store - Get Global Store');
        console.log(this.globalStore);
        await this.globalStore.getMasterData(
          {
            isForCampaignMasterData: true,
          },
          (result) => {
            try {
              console.log('Campaign - getMasterData');
              console.log(result);
              const resultCampaignInModel = new CampaignMasterDataModel(
                result && result.campaignMasterData ? result.campaignMasterData : null
              );
              console.log('resultInModel');
              console.log(resultCampaignInModel);
              console.log('CampaignsStore - resultCampaignInModel');
              console.log(result);
              console.log('CampaignsStore - resultToDropdownlistValues');

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
      console.log(error);
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}

export default CampaignsStore;
