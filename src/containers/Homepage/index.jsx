/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { Component, lazy, Suspense } from 'react';
import Spinner from '../../components/Spinner';

import HomeStore from './HomeStore/HomeStore';
import ProjectStore from '../ProjectsPage/ProjectStore/ProjectStore';
import CampaignsStore from '../CampaignsPage/CampaignsStore/CampaignsStore';
import ContentStore from '../ContentPage/ContentStore/ContentStore';
import CalendarStore from '../CalendarPage/CalendarStore/CalendarStore';
import HomeViewModel from './HomeViewModels/HomeViewModel';
import GlobalStore from '../../store/Store';
import { HomeViewModelContextProvider } from './HomeViewModels/HomeViewModelContextProvider';

const HomeList = lazy(() => import('./HomeList/HomeList'));

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}

const globalStore = window.globalStore;

const contentStore = new ContentStore({
  globalStore: globalStore,
});
const projectStore = new ProjectStore();
const campaignsStore = new CampaignsStore();
const homeStore = new HomeStore();
const calendarStore = new CalendarStore();

const homeViewModel = new HomeViewModel(
  homeStore,
  projectStore,
  campaignsStore,
  contentStore,
  calendarStore
);

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <HomeViewModelContextProvider viewModel={homeViewModel}>
        <Suspense fallback={<Spinner />}>
          <HomeList />
        </Suspense>
      </HomeViewModelContextProvider>
    );
  }
}

export default HomePage;
