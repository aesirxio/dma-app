/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import CampaignsFormModalViewModel from "./CampaignsFormModalViewModel";
import CampaignsListViewModel from "./CampaignsListViewModel";
import CampaignsSelectionViewModel from "./CampaignsSelectionViewModel";
import CampaignsFilterFormViewModel from "./CampaignsFilterFormViewModel";

class CampaignsViewModel {
  campaignsListViewModel = null;
  campaignsSelectionViewModel = null;
  campaignsFormModalViewModel = null;
  campaignsFilterFormViewModel = null;

  constructor(campaignsStore) {
    if (campaignsStore) {
      this.campaignsFormModalViewModel = new CampaignsFormModalViewModel(
        campaignsStore
      );
      this.campaignsListViewModel = new CampaignsListViewModel(campaignsStore);
      this.campaignsSelectionViewModel = new CampaignsSelectionViewModel(
        campaignsStore
      );

      this.campaignsFormModalViewModel.setCampaignsListViewModel(
        this.campaignsListViewModel
      );

      this.campaignsFilterFormViewModel = new CampaignsFilterFormViewModel(
        campaignsStore
      );
    }
  }

  getListViewModel = () => this.campaignsListViewModel;
  getSelectionViewModel = () => this.campaignsSelectionViewModel;
  getFormModalViewModel = () => this.campaignsFormModalViewModel;
  getFilterFormViewModel = () => this.campaignsFilterFormViewModel;
}

export default CampaignsViewModel;
