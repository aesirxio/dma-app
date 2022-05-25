import { AesirxMemberApiService } from 'aesirx-dma-lib';
import { runInAction } from 'mobx';

export default class VerifyEmailStore {
  async resendActivationEmailRequest(memberId, callbackOnSuccess, callbackOnError) {
    try {
      const resendActivationEmailApiService = new AesirxMemberApiService();
      let resultOnSave = await resendActivationEmailApiService.resendActivationEmail(memberId);
      console.log('------------result on send------------');
      console.log(resultOnSave);
      console.log('------------result on end------------');
      if (resultOnSave) {
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
