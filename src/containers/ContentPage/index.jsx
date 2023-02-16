/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy, Component } from 'react';
import { Route } from 'react-router-dom';
import ContentActionBar from './ContentForm/ContentActionBar';
import ContentStore from './ContentStore/ContentStore';

import ContentViewModel from './ContentViewModels/ContentViewModel';
import GlobalStore from '../../store/Store';
import { withTranslation } from 'react-i18next';
import { ContentViewModelContextProvider } from './ContentViewModels/ContentViewModelContextProvider';

const ContentFormPage = lazy(() => import('./ContentForm/ContentFormPage'));
const ContentsList = lazy(() => import('./ContentsList/ContentsList'));

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
    const { t } = this.props;
    return (
      <ContentViewModelContextProvider viewModel={contentViewModel}>
        <div className="py-4 px-3">
          <Route exact path={['/content']}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="text-blue-0">{t('txt_list_post')}</h2>
              <ContentActionBar />
            </div>
            <ContentsList />
          </Route>

          <Route exact path={['/content/create', '/content-edit/:categoryId']}>
            <ContentFormPage match={match} />
          </Route>
        </div>
      </ContentViewModelContextProvider>
    );
  }
}

export default withTranslation('common')(Contents);
