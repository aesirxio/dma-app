/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons/faFileExport';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import ComponentDatepicker from '../../components/ComponentDatepicker';

import CampaignsViewModel from './CampaignsViewModels/CampaignsViewModel';
import { CampaignsViewModelContextProvider } from './CampaignsViewModels/CampaignsViewModelContextProvider';
import CampaignsStore from './CampaignsStore/CampaignsStore';
import GlobalStore from '../../store/Store';
const CampaignsList = lazy(() => import('./CampaignsList/CampaignsList'));

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}
const globalStore = window.globalStore;
const campaignsStore = new CampaignsStore({
  globalStore: globalStore,
});
const campaignsViewModel = new CampaignsViewModel(campaignsStore);

function Campaigns() {
  return (
    <CampaignsViewModelContextProvider viewModel={campaignsViewModel}>
      <div className="py-4 px-3 h-100 bg-body">
        <>
          <div className="d-flex align-items-center justify-content-between mb-4 d-none">
            <h2 className="text-blue-0">Campaigns Statistics</h2>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center border-1 bg-white rounded-2 w-180">
                <ComponentDatepicker isDown={true} />
              </div>
              <button className="btn btn-success d-flex align-items-center w-150 ms-2">
                <i>
                  <FontAwesomeIcon icon={faFileExport} />
                </i>
                <span className="flex-1 ps-2">Export</span>
                <i>
                  <FontAwesomeIcon icon={faChevronDown} />
                </i>
              </button>
            </div>
          </div>
          <CampaignsList />
        </>
      </div>
    </CampaignsViewModelContextProvider>
  );
}

export default Campaigns;
