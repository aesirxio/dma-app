/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { runInAction } from 'mobx';

import GroupUtils from '../GroupListUtils/GroupUtils';
import GroupModel from '../GroupListModel/GroupModel';
import { AesirxGroupApiService } from 'aesirx-lib';
import { GroupMasterDataModel } from '../../../store/Models/MasterDataModels/GroupMasterDataModel';
import { GROUP_FIELD_KEY } from '../../../constants/GroupModule';
import moment from 'moment';
class GroupStore {
  globalStore = null;
  constructor(args = {}) {
    if (args) {
      this.globalStore = args.globalStore ? args.globalStore : null;
    }
  }

  async fetchGroup(callbackOnSuccess, callbackOnError, paginationStep = 0, paginationSize = 25) {
    try {
      const groupService = new AesirxGroupApiService();
      const respondedDataFromLibrary = await groupService.getGroup(paginationStep, paginationSize);

      const GroupModels = await GroupUtils.transformGroupResponseIntoModel(
        respondedDataFromLibrary.list
      );

      if (GroupModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: GroupModels,
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

  async saveGroup(groupData, callbackOnSuccess, callbackOnError) {
    try {
      // Change local to UTC
      groupData[GROUP_FIELD_KEY.START_DATE] = moment(groupData[GROUP_FIELD_KEY.START_DATE])
        .utc()
        .format();
      groupData[GROUP_FIELD_KEY.END_DATE] = moment(groupData[GROUP_FIELD_KEY.END_DATE])
        .utc()
        .format();
      const convertedGroupData = GroupModel.convertSubmittedDataToAPIService(groupData);

      const groupService = new AesirxGroupApiService();
      let resultOnSave = false;

      if (groupData.id === undefined) {
        resultOnSave = await groupService.createGroup(convertedGroupData);
      } else {
        resultOnSave = await groupService.updateGroup(convertedGroupData);
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

  async deleteGroup(ids, callbackOnSuccess, callbackOnError) {
    if (!ids) return false;

    try {
      const groupService = new AesirxGroupApiService();
      const deleteIds = ids.join();
      const respondedFromApi = await groupService.deleteGroup(deleteIds);

      if (respondedFromApi.result === true) {
        runInAction(() => {
          callbackOnSuccess();
        });
      }
      return respondedFromApi;
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getGroup(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    const results = true;

    if (results) {
      const groupService = new AesirxGroupApiService();
      const respondedDataFromLibrary = await groupService.getGroup(id);

      const groupDataModels = GroupUtils.transformGroupResponseIntoModel([
        respondedDataFromLibrary,
      ]);

      if (groupDataModels) {
        runInAction(() => {
          callbackOnSuccess(groupDataModels);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
    }
  }

  async searchGroup(
    callbackOnSuccess,
    callbackOnError,
    dataFilter = {},
    paginationStep = 1,
    paginationSize = 25
  ) {
    try {
      const GroupAPIService = new AesirxGroupApiService();
      const respondedDataFromLibrary = await GroupAPIService.searchGroup(
        dataFilter,
        paginationStep,
        paginationSize
      );

      let groupDataModels = null;

      if (respondedDataFromLibrary !== null) {
        groupDataModels = GroupUtils.transformGroupResponseIntoModel(respondedDataFromLibrary.list);
      }

      if (groupDataModels) {
        runInAction(() => {
          callbackOnSuccess({
            list: groupDataModels,
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

  async getGroupMasterData(callbackOnSuccess, callbackOnError) {
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
            isForGroupMasterData: true,
          },
          (result) => {
            try {
              const resultGroupInModel = new GroupMasterDataModel(
                result && result.groupMasterData ? result.groupMasterData : null
              );

              runInAction(() => {
                callbackOnSuccess(resultGroupInModel);
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

export default GroupStore;
