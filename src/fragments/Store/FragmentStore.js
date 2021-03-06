/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { runInAction } from 'mobx';
import { ProjectMasterDataModel } from '../../store/Models/MasterDataModels/ProjectMasterDataModel';
import { PersonaMasterDataModel } from '../../store/Models/MasterDataModels/PersonaMasterDataModel';
import { CampaignMasterDataModel } from '../../store/Models/MasterDataModels/CampaignMasterDataModel';

class FragmentStore {
  globalStore = null;
  constructor(args = {}) {
    if (args) {
      this.globalStore = args.globalStore ? args.globalStore : null;
    }
  }

  async getProjectMasterData(callbackOnSuccess, callbackOnError) {
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
            isForProjectMaster: true,
          },
          (result) => {
            const resultInModel = new ProjectMasterDataModel(
              result && result.projectMasterData ? result.projectMasterData : null
            );
            if (resultInModel) {
              runInAction(() => {
                callbackOnSuccess(resultInModel);
              });
            } else {
              runInAction(() => {
                callbackOnError({
                  message:
                    'AAAAA - FragmentStore - getProjectMasterData - Something went wrong from Server response',
                });
              });
            }
          },
          (error) => {
            runInAction(() => {
              callbackOnError({
                message:
                  'BBBBBB - FragmentStore - getProjectMasterData - Something went wrong from Server response' +
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

  async getPersonaMasterData(callbackOnSuccess, callbackOnError) {
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
            isForPersonaMasterData: true,
          },
          (result) => {
            const resultInModel = new PersonaMasterDataModel(
              result && result.personaMasterData ? result.personaMasterData : null
            );
            if (resultInModel) {
              runInAction(() => {
                callbackOnSuccess(resultInModel);
              });
            } else {
              runInAction(() => {
                callbackOnError({
                  message:
                    'AAAAA - FragmentStore - getPersonaMasterData - Something went wrong from Server response',
                });
              });
            }
          },
          (error) => {
            runInAction(() => {
              callbackOnError({
                message:
                  'BBBBBB - FragmentStore - getPersonaMasterData - Something went wrong from Server response' +
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
            const resultInModel = new CampaignMasterDataModel(
              result && result.campaignMasterData ? result.campaignMasterData : null
            );
            if (resultInModel) {
              runInAction(() => {
                callbackOnSuccess(resultInModel);
              });
            } else {
              runInAction(() => {
                callbackOnError({
                  message: 'Something went wrong from Server response',
                });
              });
            }
          },
          (error) => {
            runInAction(() => {
              callbackOnError({
                message: 'Something went wrong from Server response' + error,
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

export default FragmentStore;
