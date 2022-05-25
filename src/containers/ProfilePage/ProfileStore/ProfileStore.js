import { AesirxMemberApiService, AesirxProjectApiService } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';
import ProfileModel from '../ProfileModel/ProfileModel';
import ProjectUtils from '../../ProjectsPage/ProjectUtils/ProjectUtils';

export default class ProfileStore {
  async updatePassword(updatePasswordData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdatePasswordData =
        ProfileModel.convertSubmittedPasswordDataToAPIService(updatePasswordData);

      let resultOnSave;
      const updatePasswordApiService = new AesirxMemberApiService();
      resultOnSave = await updatePasswordApiService.updateMemberPassword(
        convertedUpdatePasswordData
      );

      if (resultOnSave.result.success) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave);
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async updateGeneral(updateGeneralData, callbackOnSuccess, callbackOnError) {
    try {
      const convertedUpdateGeneralData =
        ProfileModel.convertSubmittedGeneralDataToAPIService(updateGeneralData);

      let resultOnSave;
      const updateGeneralApiService = new AesirxMemberApiService();

      resultOnSave = await updateGeneralApiService.updateMember(convertedUpdateGeneralData);

      console.log('-----------resulrt on save -------------------');
      console.log(resultOnSave);

      if (resultOnSave.result.success) {
        runInAction(() => {
          callbackOnSuccess(resultOnSave);
        });
      } else {
        runInAction(() => {
          callbackOnError(resultOnSave);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getMember(id, callbackOnSuccess, callbackOnError) {
    if (!id) return false;

    try {
      const results = true;

      if (results) {
        const getMemberInfoAPIService = new AesirxMemberApiService();
        const respondedData = await getMemberInfoAPIService.getMemberInfo(id);
        console.log('------------response-----------------------------------');
        console.log(respondedData);
        if (respondedData) {
          runInAction(() => {
            callbackOnSuccess(respondedData);
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
}
