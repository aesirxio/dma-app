/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import { makeAutoObservable, runInAction } from 'mobx';

class CampaignsFilterFormViewModel {
  campaignsStore = null;

  dropdownlistProjectValues = null;

  constructor(campaignsStore) {
    makeAutoObservable(this);
    this.campaignsStore = campaignsStore;
  }

  initData = async () => {
    const projectMasterDataInModel = await this.campaignsStore.getProjectMasterData(true);

    runInAction(() => {
      this.dropdownlistProjectValues = projectMasterDataInModel
        ? projectMasterDataInModel.toDropdownListValues()
        : null;
    });
  };
}

export default CampaignsFilterFormViewModel;
