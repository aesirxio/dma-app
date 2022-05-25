import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';

class ResendActivationEmailViewModel {
  verifyEmailStore = null;
  resendActivationEmailViewModel = null;
  memberId = null;
  loadingStatus = false

  constructor(verifyEmailStore) {
    makeAutoObservable(this);
    this.verifyEmailStore = verifyEmailStore;
  }

  resendActivationEmailOnPage = (memberId) => {
    this.verifyEmailStore.resendActivationEmailRequest(memberId,
      this.callbackOnSuccessHandler, this.callbackOnErrorHandler);
  };

  callbackOnErrorHandler = (error) => {
    console.log('error');
    notify('Resend activation email unsuccessfully', 'error');
    console.log(error);
  };

  callbackOnSuccessHandler = (result) => {
    console.log(result);
    notify('Resend activation email successfully', 'success');
    this.loadingStatus = false
  };
}

export default ResendActivationEmailViewModel;