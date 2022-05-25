import { AesirxMemberApiService } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';

export default class ActivateMemberStore {
  async activateMember(activationData, callbackOnSuccess, callbackOnError) {
    try {
      let resultOnSave;
      const activateMemberAPIService = new AesirxMemberApiService();
      resultOnSave = await activateMemberAPIService.activateMember(activationData);
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
