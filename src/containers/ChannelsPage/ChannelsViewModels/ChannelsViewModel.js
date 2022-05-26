/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import ChannelsListViewModel from './ChannelsListViewModel';
import LoginCMSChannelFormModalViewModel from './LoginCMSChannelFormModalViewModel';

class ChannelsViewModel {
  channelsListViewModel = null;
  loginCMSChannelFormModalViewModel = null;

  constructor(channelsStore) {
    if (channelsStore) {
      console.log('ChannelsViewModel - Abstract');
      this.channelsListViewModel = new ChannelsListViewModel(channelsStore);
      this.loginCMSChannelFormModalViewModel = new LoginCMSChannelFormModalViewModel(channelsStore);
      this.loginCMSChannelFormModalViewModel.setChannelsListViewModelInstance(
        this.channelsListViewModel
      );
    }
  }

  getChannelsListLoginViewModel = () => this.loginCMSChannelFormModalViewModel;
  getChannelsListViewModel = () => this.channelsListViewModel;
}

export default ChannelsViewModel;
