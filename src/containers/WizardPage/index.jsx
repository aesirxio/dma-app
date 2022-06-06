/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';

// import ProjectStore from "../ProjectsPage/ProjectStore/ProjectStore";
import ChannelsStore from '../ChannelsPage/ChannelsStore/ChannelsStore';
import ContentStore from '../ContentPage/ContentStore/ContentStore';
import history from '../../routes/history';
import WizardSteps from '../../components/WizardSteps';
import Spinner from '../../components/Spinner';

import GlobalStore from '../../store/Store';
import { ChannelsViewModelContextProvider } from '../ChannelsPage/ChannelsViewModels/ChannelsViewModelContextProvider';
import ChannelsViewModel from '../ChannelsPage/ChannelsViewModels/ChannelsViewModel';
import ButtonNormal from '../../components/ButtonNormal';
import ContentViewModel from '../ContentPage/ContentViewModels/ContentViewModel';

import { ContentViewModelContextProvider } from '../ContentPage/ContentViewModels/ContentViewModelContextProvider';

const ContentFormPage = lazy(() => import('../ContentPage/ContentForm/ContentFormPage'));
const ChannelsList = lazy(() => import('../ChannelsPage/ChannelsList/ChannelsList'));

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}

const globalStore = window.globalStore;

const channelsStore = new ChannelsStore({
  globalStore: globalStore,
});

const contentStore = new ContentStore({
  globalStore: globalStore,
});

const channelsViewModel = new ChannelsViewModel(channelsStore);
const contentViewModel = new ContentViewModel(contentStore);

class WizardPage extends Component {
  next = () => {
    history.push(`${history.location.pathname}/content`);
  };

  render() {
    return (
      <>
        <WizardSteps match={this.props.match} />

        <Suspense fallback={<Spinner />}>
          <Route exact path="/wizard">
            <ChannelsViewModelContextProvider viewModel={channelsViewModel}>
              <ChannelsList />
            </ChannelsViewModelContextProvider>

            <div className="d-flex justify-content-end pb-6 m-3">
              <ButtonNormal
                className="btn btn-success px-4 mw-80"
                text="Next"
                onClick={() => this.next()}
              ></ButtonNormal>
            </div>
          </Route>

          <Route exact path="/wizard/content">
            <ContentViewModelContextProvider viewModel={contentViewModel}>
              <div className="ps-3 pb-4 wr_wz_content_page">
                <ContentFormPage match={this.props.match} />
              </div>
            </ContentViewModelContextProvider>
          </Route>
        </Suspense>
      </>
    );
  }
}

export default WizardPage;
