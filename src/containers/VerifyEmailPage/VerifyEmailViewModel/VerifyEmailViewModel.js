import ResendActivationEmailViewModel from './ResendActivationEmailViewModel';

class VerifyEmailViewModel {
  resendActivationEmailViewModel = null;

  constructor(verifyEmailStore) {
    if (verifyEmailStore) {
      this.resendActivationEmailViewModel = new ResendActivationEmailViewModel(
        verifyEmailStore);
    }
  }

  getResendActivationEmailViewModel = () => this.resendActivationEmailViewModel;
}

export default VerifyEmailViewModel;