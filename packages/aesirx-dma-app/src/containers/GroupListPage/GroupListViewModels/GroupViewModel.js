/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import GroupFormModalViewModel from './GroupFormModalViewModel';
import GroupListViewModel from './GroupListViewModel';
//
class GroupViewModel {
  groupListViewModel = null;
  groupFormModalViewModel = null;

  constructor(groupStore) {
    if (groupStore) {
      this.groupFormModalViewModel = new GroupFormModalViewModel(groupStore);
      this.groupListViewModel = new GroupListViewModel(groupStore);

      // Inject dependencies together among ViewModels
      this.groupFormModalViewModel.setGroupListViewModel(this.groupListViewModel);
    }
  }

  getListViewModel = () => this.groupListViewModel;
  getFormModalViewModel = () => this.groupFormModalViewModel;
}

export default GroupViewModel;
