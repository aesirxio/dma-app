/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';
import ChannelsStore from './ChannelsStore/ChannelsStore';
import ChannelsViewModel from './ChannelsViewModels/ChannelsViewModel';
import {
  ChannelsViewModelContextProvider,
  SelectedChannelsProvider,
} from './ChannelsViewModels/ChannelsViewModelContextProvider';
import { withTranslation } from 'react-i18next';
import GlobalStore from '../../store/Store';

const ChannelsList = lazy(() => import('./ChannelsList/ChannelsList'));
const LoginChannelCMSFormModal = lazy(() =>
  import('./LoginChannelCMSForm/LoginChannelCMSFormModal')
);

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}

const globalStore = window.globalStore;

const channelsStore = new ChannelsStore({
  globalStore: globalStore,
});
const channelsViewModel = new ChannelsViewModel(channelsStore);

class channelsPage extends Component {
  render() {
    return (
      <ChannelsViewModelContextProvider viewModel={channelsViewModel}>
        <SelectedChannelsProvider>
          <ChannelsList />
          <LoginChannelCMSFormModal />
        </SelectedChannelsProvider>
      </ChannelsViewModelContextProvider>
    );
  }
}

export default withTranslation()(channelsPage);
