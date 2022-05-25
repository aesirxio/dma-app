import { AesirxMemberApiService } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';
import SignUpModel from '../SignUpModel/SignUpModel';
import Helper from '../../../utils/helper';

export default class SignUpStore {
  async saveMember(signUpData, callbackOnSuccess, callbackOnError) {
    try {
      signUpData.timezone_default = Helper.getTimezoneDefault();
      const convertedSignUpData = SignUpModel.convertSubmittedDataToAPIService(signUpData);
      let resultOnSave;

      const signupAPIService = new AesirxMemberApiService();
      resultOnSave = await signupAPIService.createMember(convertedSignUpData);
      resultOnSave = JSON.parse(resultOnSave);

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
}
