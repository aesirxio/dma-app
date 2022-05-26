/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

// import ProjectsListViewModel from "../../ProjectsPage/ProjectViewModels/ProjectsListViewModel";
// import ProjectFormModalViewModel from "../../ProjectsPage/ProjectViewModels/ProjectFormModalViewModel";
import ContentFormViewModel from '../../ContentPage/ContentViewModels/ContentFormViewModel';
import ContentConnectedChannelsByOrganisationViewModel from '../../ContentPage/ContentViewModels/ContentConnectedChannelsByOrganisationViewModel';
import ContentDisplayProjectNameInWizardStep3ViewModel from '../../ContentPage/ContentViewModels/ContentDisplayProjectNameInWizardStep3ViewModel';
import LoginCMSChannelFormModalViewModel from '../../ChannelsPage/ChannelsViewModels/LoginCMSChannelFormModalViewModel';
import ChannelsListViewModel from '../../ChannelsPage/ChannelsViewModels/ChannelsListViewModel';

class WizardViewModel {
  channelsListViewModel = null;
  contentFormViewModel = null;
  loginCMSChannelFormModalViewModel = null;
  contentConnectedChannelsByOrganisationViewModel = null;
  contentDisplayProjectNameInWizardStep3ViewModel = null;

  constructor(channelsStore, contentStore) {
    if (channelsStore) {
      console.log('WizardViewModel - Abstract');
      console.log(channelsStore);
      console.log(contentStore);

      this.channelsListViewModel = new ChannelsListViewModel(channelsStore);
      this.loginCMSChannelFormModalViewModel = new LoginCMSChannelFormModalViewModel(channelsStore);

      console.log('this.channelsListViewModel - Abstract', this.channelsListViewModel);

      this.contentFormViewModel = new ContentFormViewModel(contentStore);

      this.contentConnectedChannelsByOrganisationViewModel =
        new ContentConnectedChannelsByOrganisationViewModel(contentStore);

      this.contentFormViewModel.setContentConnectedChannelsViewModel(
        this.contentConnectedChannelsByOrganisationViewModel
      );

      this.contentDisplayProjectNameInWizardStep3ViewModel =
        new ContentDisplayProjectNameInWizardStep3ViewModel(contentStore);

      this.contentFormViewModel.setContentDisplayProjectNameInWizardStep3ViewModel(
        this.contentDisplayProjectNameInWizardStep3ViewModel
      );

      console.log('this.contentConnectedChannelsByOrganisationViewModel 11111');
      console.log(this.contentConnectedChannelsByOrganisationViewModel);
    }
  }

  // getListViewModel = () => this.projectListViewModel;
  // getFormModalViewModel = () => this.projectFormViewModel;

  getChannelsListLoginViewModel = () => this.loginCMSChannelFormModalViewModel;
  getChannelsListViewModel = () => this.channelsListViewModel;
  getContentConnectedChannelsViewModel = () => this.contentConnectedChannelsByOrganisationViewModel;

  getContentDisplayProjectNameInWizardStep3ViewModel = () =>
    this.contentDisplayProjectNameInWizardStep3ViewModel;
}

export default WizardViewModel;
