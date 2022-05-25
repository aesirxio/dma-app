import UpdatePasswordViewModel from './UpdatePasswordViewModel';
import UpdateGeneralViewModel from './UpdateGeneralViewModel';

class ProfileViewModel {
  updatePasswordViewModel = null;
  updateGeneralViewModel = null;

  constructor(profileStore) {
    if (profileStore) {
      this.updatePasswordViewModel = new UpdatePasswordViewModel(profileStore);
      this.updateGeneralViewModel = new UpdateGeneralViewModel(profileStore);
    }
  }

  getUpdatePasswordViewModel = () => this.updatePasswordViewModel;
  getUpdateGeneralViewModel = () => this.updateGeneralViewModel;
}

export default ProfileViewModel;