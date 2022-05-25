import SignUpFormViewModel from './SignUpFormViewModel';

class SignUpViewModel {
  signupFormViewModel = null;

  constructor(signupStore) {
    if (signupStore) {
      this.signupFormViewModel = new SignUpFormViewModel(signupStore);
    }
  }

  getSignUpFormViewModel = () => this.signupFormViewModel;
}

export default SignUpViewModel;