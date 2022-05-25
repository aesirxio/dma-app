import history from '../../../routes/history';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';

class ActivateMemberLoadingViewModel {
  activateMemberStore = null;
  activateMemberLoadingViewModel = null;

  constructor(activateMemberStore) {
    makeAutoObservable(this);
    this.activateMemberStore = activateMemberStore;
  }

  setValue = (activateMemberComponent) => {
    this.activateMemberComponent = activateMemberComponent;
  };

  activateMemberOnPage = () => {
    this.activateMemberStore.activateMember(
      this.activateMemberComponent.activationData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnErrorHandler = (error) => {
    console.log('error');
    console.log(error);
    history.push('/login');
  };

  callbackOnSuccessHandler = () => {
    notify('Activate member successfully', 'success');
    history.push('/login');
  };
}

export default ActivateMemberLoadingViewModel;
