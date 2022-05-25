import ActivateMemberLoadingViewModel from './ActivateMemberLoadingViewModel';
class ActiveMemberViewModel {
  activateMemberLoadingViewModel = null;

  constructor(activateMemberStore) {
    if (activateMemberStore) {
      this.activateMemberLoadingViewModel = new ActivateMemberLoadingViewModel(activateMemberStore);
    }
  }

  getActivateMemberLoadingFormViewModel = () => this.activateMemberLoadingViewModel;
}

export default ActiveMemberViewModel;