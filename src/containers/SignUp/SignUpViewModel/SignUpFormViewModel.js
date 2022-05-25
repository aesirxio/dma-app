import history from '../../../routes/history';
import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';

class SignUpFormViewModel {
  signupStore = null;
  formStatus = PAGE_STATUS.READY;
  signupFormViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(signupStore) {
    makeAutoObservable(this);
    this.signupStore = signupStore;
  }

  setAllValue = (signupFormComponent) => {
    this.signupFormComponent = signupFormComponent;
  };

  saveMemberOnPage = (data) => {
    this.signupStore.saveMember(data, this.callbackOnSuccessHandler, this.callbackOnErrorHandler);
  };

  callbackOnErrorHandler = (error) => {
    console.log('error');
    console.log(error);
    this.successResponse.state = false;
    this.successResponse.content_id = error.result.content_id;
  };

  callbackOnSuccessHandler = (result) => {
    if (result.result.email && result.result.id) {
      history.push({
        pathname: '/verify',
        state: { id: result.result.id, email: result.result.email },
      });
    } else {
      notify('Something went wrong from server, please re-login', 'error');
      history.push('/signup');
    }
  };
}

export default SignUpFormViewModel;
