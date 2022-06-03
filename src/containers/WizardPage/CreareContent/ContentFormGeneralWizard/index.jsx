/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';

import { observer } from 'mobx-react';
import history from '../../../../routes/history';
import { withWizardViewModel } from '../../WizardViewModels/WizardViewModelContextProvider';
import ComponentContentFormGeneral from '../../../ContentPage/ContentForm/ComponentContentFormGeneral';
import GlobalStore from '../../../../store/Store';
import FragmentStore from '../../../../fragments/Store/FragmentStore';
import ProjectTableSelectionModalViewModel from '../../../../fragments/ProjectTableSelectionModal/ProjectTableSelectionModalViewModel';
import { ContentPreviewPersona } from '../../../ContentPage/ContentForm/ContentPreviewPersona';
import { ProjectTableSelectionModalViewModelContextProvider } from '../../../../fragments/ProjectTableSelectionModal/ProjectTableSelectionModalViewModelContextProvider';
import PersonaTableSelectionModalViewModel from '../../../../fragments/PersonaTableSelectionModal/PersonaTableSelectionModalViewModel';
import { PersonaTableSelectionModalViewModelContextProvider } from '../../../../fragments/PersonaTableSelectionModal/PersonaTableSelectionModalViewModelContextProvider';
import CampaignTableSelectionModalViewModel from '../../../../fragments/CampaignTableSelectionModal/CampaignTableSelectionModalViewModel';
import { CampaignTableSelectionModalViewModelContextProvider } from '../../../../fragments/CampaignTableSelectionModal/CampaignTableSelectionModalViewModelContextProvider';

const ProjectTableSelectionModal = lazy(() =>
  import('../../../../fragments/ProjectTableSelectionModal/ProjectTableSelectionModal')
);

const PersonaTableSelectionModal = lazy(() =>
  import('../../../../fragments/PersonaTableSelectionModal/PersonaTableSelectionModal')
);

const CampaignTableSelectionModal = lazy(() =>
  import('../../../../fragments/CampaignTableSelectionModal/CampaignTableSelectionModal')
);

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}
const globalStore = window.globalStore;

const fragmentStore = new FragmentStore({
  globalStore: globalStore,
});

const projectTableSelectionModalViewModel = new ProjectTableSelectionModalViewModel(fragmentStore);

const personaTableSelectionModalViewModel = new PersonaTableSelectionModalViewModel(fragmentStore);

const campaignTableSelectionModalViewModel = new CampaignTableSelectionModalViewModel(
  fragmentStore
);

const ContentFormGeneralWizard = observer(
  class ContentFormGeneralWizard extends Component {
    contentFormViewModel = null;
    contentConnectedChannelsByOrganisationViewModel = null;
    contentDisplayProjectNameInWizardStep3ViewModel = null;

    constructor(props) {
      super(props);

      const { viewModel } = props;
      this.contentFormViewModel = viewModel ? viewModel.getFormViewModel() : null;

      this.contentConnectedChannelsByOrganisationViewModel =
        this.contentFormViewModel.getContentConnectedChannelsViewModel();
      this.contentDisplayProjectNameInWizardStep3ViewModel =
        this.contentFormViewModel.getContentDisplayProjectNameInWizardStep3ViewModel();
    }

    previousWizardStep = () => {
      history.push('/wizard');
    };

    render() {
      return (
        <>
          <ComponentContentFormGeneral
            match={this.props.match}
            {...this.props}
            viewModel={this.contentFormViewModel}
            projectTableSelectionModalViewModel={projectTableSelectionModalViewModel}
            personaTableSelectionModalViewModel={personaTableSelectionModalViewModel}
            campaignTableSelectionModalViewModel={campaignTableSelectionModalViewModel}
            connectChannelsField={true}
            addConnectChannlesBtn={false}
            isBackWizardStep={true}
            previousWizardStep={this.previousWizardStep}
            getDataSelectOptionsProject={
              projectTableSelectionModalViewModel
                ? projectTableSelectionModalViewModel.getDataSelectOptions
                : []
            }
            getValueSelectedProject={
              projectTableSelectionModalViewModel
                ? projectTableSelectionModalViewModel.getValueSelected
                : []
            }
            getDataSelectOptionsCampaign={
              campaignTableSelectionModalViewModel
                ? campaignTableSelectionModalViewModel.getDataSelectOptions
                : []
            }
            getValueSelectedCampaign={
              campaignTableSelectionModalViewModel
                ? campaignTableSelectionModalViewModel.getValueSelected
                : []
            }
            getDataSelectOptionsPersona={
              personaTableSelectionModalViewModel
                ? personaTableSelectionModalViewModel.getDataSelectOptions
                : []
            }
            getValueSelectedPersona={
              personaTableSelectionModalViewModel
                ? personaTableSelectionModalViewModel.getValueSelected
                : []
            }
            contentConnectedChannelsByOrganisationViewModel={
              this.contentConnectedChannelsByOrganisationViewModel
            }
            contentDisplayProjectNameInWizardStep3ViewModel={
              this.contentDisplayProjectNameInWizardStep3ViewModel
            }
            showModalChannels={this.contentConnectedChannelsByOrganisationViewModel.show}
            arrayConnectedChannelsFinal={
              this.contentConnectedChannelsByOrganisationViewModel.arrayConnectedChannelsFinal
            }
            dataContentDescriptionSingle={
              this.contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle
            }
            dataContentDescriptionSocial={
              this.contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial
            }
            isAdvanceMode={this.contentConnectedChannelsByOrganisationViewModel.isAdvanceMode}
          />
          <ContentPreviewPersona
            personaTableSelectionModalViewModel={personaTableSelectionModalViewModel}
          />
          <ProjectTableSelectionModalViewModelContextProvider
            viewModel={projectTableSelectionModalViewModel}
          >
            <ProjectTableSelectionModal />
          </ProjectTableSelectionModalViewModelContextProvider>

          <PersonaTableSelectionModalViewModelContextProvider
            viewModel={personaTableSelectionModalViewModel}
          >
            <PersonaTableSelectionModal />
          </PersonaTableSelectionModalViewModelContextProvider>

          <CampaignTableSelectionModalViewModelContextProvider
            viewModel={campaignTableSelectionModalViewModel}
          >
            <CampaignTableSelectionModal />
          </CampaignTableSelectionModalViewModelContextProvider>
        </>
      );
    }
  }
);

export default withWizardViewModel(ContentFormGeneralWizard);
