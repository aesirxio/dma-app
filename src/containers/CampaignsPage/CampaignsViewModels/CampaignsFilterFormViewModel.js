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
