/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy, Component } from 'react';
import ContentStore from '../ContentPage/ContentStore/ContentStore';
import ContentViewModel from '../ContentPage/ContentViewModels/ContentViewModel';
import GlobalStore from '../../store/Store';
import { ContentViewModelContextProvider } from '../ContentPage/ContentViewModels/ContentViewModelContextProvider';
import { Route } from 'react-router';
import ContentFormPage from '../ContentPage/ContentForm/ContentFormPage';
const CalendarList = lazy(() => import('./CalendarList/CalendarList'));

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}

const globalStore = window.globalStore;

const contentStore = new ContentStore({
  globalStore: globalStore,
});

const contentViewModel = new ContentViewModel(contentStore);

class Contents extends Component {
  render() {
    let { match } = this.props;

    return (
      <ContentViewModelContextProvider viewModel={contentViewModel}>
        <CalendarList />
        <Route exact path={['/content/create', '/content-edit/:categoryId']}>
          <ContentFormPage match={match} />
        </Route>
      </ContentViewModelContextProvider>
    );
  }
}

export default Contents;
