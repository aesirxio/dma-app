/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons/faFileExport';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import ComponentDatepicker from '../../components/ComponentDatepicker';

import GroupViewModel from './GroupListViewModels/GroupViewModel';
import { GroupViewModelContextProvider } from './GroupListViewModels/GroupViewModelContextProvider';
import GroupStore from './GroupListStore/GroupStore';
import GlobalStore from '../../store/Store';
const GroupList = lazy(() => import('./GroupList/GroupList'));

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}
const globalStore = window.globalStore;
const groupStore = new GroupStore({
  globalStore: globalStore,
});
const groupViewModel = new GroupViewModel(groupStore);
console.log('groupViewModel', groupViewModel);

function Group() {
  return (
    <GroupViewModelContextProvider viewModel={groupViewModel}>
      <div className="py-4 px-3 h-100">
        <>
          <div className="d-flex align-items-center justify-content-between mb-4 d-none">
            <h2 className="text-blue-0">group Statistics</h2>
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
          <GroupList />
        </>
      </div>
    </GroupViewModelContextProvider>
  );
}

export default Group;
