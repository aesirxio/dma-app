/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable, runInAction } from 'mobx';
import { notify } from '../../../components/Toast';

import CampaignsUtils from '../../CampaignsPage/CampaignsUtils/CampaignsUtils';
import PersonaUtils from '../../PersonasPage/PersonaUtils/PersonaUtils';
import ChannelUtils from '../../ChannelsPage/ChannelUtils/ChannelUtils';
import ChannelsStore from '../../ChannelsPage/ChannelsStore/ChannelsStore';
import ProjectUtils from '../../ProjectsPage/ProjectUtils/ProjectUtils';
class ContentsFilterFormViewModel {
  contentsStore = null;

  campaignMasterData = [];
  projectMasterData = [];
  personaMasterData = [];
  constructor(contentsStore) {
    makeAutoObservable(this);
    this.contentsStore = contentsStore;
    this.channelStore = new ChannelsStore();
  }

  initData = async () => {
    const masterData = await this.contentsStore.getMasterData();
    // const channelsData = await this.channelStore.getChannelsData();

    const personaMasterData = PersonaUtils.toDropdownOptions(masterData?.personaMasterData);
    // const projectMasterData = ProjectUtils.toDropdownOptions(masterData?.projectMasterData);
    const campainsMasterData = CampaignsUtils.toDropdownOptions(
      masterData?.campaignMasterData?.result
    );

    const projectMasterData = ProjectUtils.toDropdownOptions(masterData?.projectMasterData);

    runInAction(() => {
      this.personaMasterData = personaMasterData;
      // this.channelMasterData = channelsData;
      this.campaignMasterData = campainsMasterData;
      this.projectMasterData = projectMasterData;
    });
  };

  callbackOnErrorHander = (error) => {
    notify(error.message);
  };

  callbackOnSuccessHandler = (masterDataInModel) => {
    this.campaignsMasterData = masterDataInModel.resultCampaignInModel
      ? masterDataInModel.resultCampaignInModel.toDropdownListValues()
      : null;

    this.personaMasterData = masterDataInModel.resultPersonaInModel
      ? masterDataInModel.resultPersonaInModel.toDropdownListValues()
      : null;
  };
}

export default ContentsFilterFormViewModel;
