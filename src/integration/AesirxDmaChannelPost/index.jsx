/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import ContentStore from 'containers/ContentPage/ContentStore/ContentStore';

import ContentViewModel from 'containers/ContentPage/ContentViewModels/ContentViewModel';
import GlobalStore from 'store/Store';
import { ContentViewModelContextProvider } from 'containers/ContentPage/ContentViewModels/ContentViewModelContextProvider';
import ContentListContainer from './components/ContentListContainer';
import { Toast } from 'aesirx-uikit';

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}

const globalStore = window.globalStore;

const contentStore = new ContentStore({
  globalStore: globalStore,
});

const contentViewModel = new ContentViewModel(contentStore);

class AesirxDmaContentPost extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Toast />
        <ContentViewModelContextProvider viewModel={contentViewModel}>
          <div className="py-4 px-3">
            <ContentListContainer {...this.props} />
          </div>
        </ContentViewModelContextProvider>
      </>
    );
  }
}

export default AesirxDmaContentPost;
