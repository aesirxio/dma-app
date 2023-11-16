/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import GroupFormModalViewModel from './GroupFormModalViewModel';
import GroupListViewModel from './GroupListViewModel';
import GroupSelectionViewModel from './GroupSelectionViewModel';

class GroupViewModel {
  groupListViewModel = null;
  groupSelectionViewModel = null;
  groupFormModalViewModel = null;

  constructor(groupStore) {
    if (groupStore) {
      this.groupFormModalViewModel = new GroupFormModalViewModel(groupStore);
      this.groupListViewModel = new GroupListViewModel(groupStore);
      this.groupSelectionViewModel = new GroupSelectionViewModel(groupStore);

      this.groupFormModalViewModel.setGroupListViewModel(this.groupListViewModel);
    }
  }

  getListViewModel = () => this.groupListViewModel;
  getSelectionViewModel = () => this.groupSelectionViewModel;
  getFormModalViewModel = () => this.groupFormModalViewModel;
}

export default GroupViewModel;
