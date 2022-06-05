/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import { observer } from 'mobx-react';
import { withWizardViewModel } from '../../WizardViewModels/WizardViewModelContextProvider';
import ComponentContentFormPublish from '../../../ContentPage/ContentForm/ComponentContentFormPublish';
import GlobalStore from '../../../../store/Store';
import FragmentStore from '../../../../fragments/Store/FragmentStore';
import PersonaTableSelectionModalViewModel from '../../../../fragments/PersonaTableSelectionModal/PersonaTableSelectionModalViewModel';
import CampaignTableSelectionModalViewModel from '../../../../fragments/CampaignTableSelectionModal/CampaignTableSelectionModalViewModel';

import { CHANNEL_ADS_GOOGLE } from '../../../../constants/ChannelModule';

if (!window.globalStore) {
  window.globalStore = new GlobalStore();
}
const globalStore = window.globalStore;

const fragmentStore = new FragmentStore({
  globalStore: globalStore,
});

const personaTableSelectionModalViewModel = new PersonaTableSelectionModalViewModel(fragmentStore);

const campaignTableSelectionModalViewModel = new CampaignTableSelectionModalViewModel(
  fragmentStore
);

const ContentFormPublishWizard = observer(
  class ContentFormPublishWizard extends Component {
    contentFormViewModel = null;
    contentConnectedChannelsByOrganisationViewModel = null;
    channelsListViewModel = null;

    constructor(props) {
      super(props);

      this.state = {
        getArrayPageFacebook: [],
        getArrayPageInstagram: [],
        getArrayPageLinkedin: [],
      };

      const { viewModel } = props;
      this.contentFormViewModel = viewModel ? viewModel.getFormViewModel() : null;

      this.contentConnectedChannelsByOrganisationViewModel = viewModel
        ? viewModel.getContentConnectedChannelsViewModel()
        : null;

      this.channelsListViewModel = viewModel ? viewModel.getChannelsListViewModel() : null;

      this.channelsListViewModel.checkConnectedChannels([
        'linkedin',
        'youtube',
        'twitter',
        'instagram',
        'facebook',
        'mailchimp',
        'wordpress',
        'tumblr',
        'drupal',
        'medium',
        'joomla',
        'fbad',
        CHANNEL_ADS_GOOGLE,
        'google_my_business',
      ]);
    }

    handleDeselectAllSocial = () => {
      this.contentConnectedChannelsByOrganisationViewModel.isDeselectAllSocial = true;
    };

    handleSelectAllSocial = () => {
      this.contentConnectedChannelsByOrganisationViewModel.isDeselectAllSocial = false;
    };

    handleDeSelectConnectSomePage = (name, id) => {
      let { getArrayPageFacebook, getArrayPageLinkedin, getArrayPageInstagram } = this.state;
      let indexFB, indexLI, indexInstagram

      switch (name) {
        case 'facebook':
          indexFB = getArrayPageFacebook.includes(id);

          if (indexFB) {
            const getIdFB = getArrayPageFacebook.indexOf(id);
            getArrayPageFacebook.splice(getIdFB, 1);
          } else {
            getArrayPageFacebook.push(id);
          }

          this.setState({
            getArrayPageFacebook: getArrayPageFacebook,
          });
          break;
        case 'linkedin':
          indexLI = getArrayPageLinkedin.includes(id);

          if (indexLI) {
            const getIdLI = getArrayPageLinkedin.indexOf(id);
            getArrayPageLinkedin.splice(getIdLI, 1);
          } else {
            getArrayPageLinkedin.push(id);
          }

          this.setState({
            getArrayPageLinkedin: getArrayPageLinkedin,
          });
          break;
        case 'instagram':
          indexInstagram = getArrayPageInstagram.includes(id);
          if (indexInstagram) {
            const getIdInstagram = getArrayPageInstagram.indexOf(id);
            getArrayPageInstagram.splice(getIdInstagram, 1);
          } else {
            getArrayPageInstagram.push(id);
          }

          this.setState({
            getArrayPageInstagram: getArrayPageInstagram,
          });
          break;
        default:
          break;
      }

      this.contentConnectedChannelsByOrganisationViewModel.disableConnectSoMePage(name, id);
    };

    render() {
      let { getArrayPageFacebook, getArrayPageLinkedin, getArrayPageInstagram } = this.state;

      return (
        <ComponentContentFormPublish
          {...this.props}
          viewModel={this.contentFormViewModel}
          formStatus={this.contentFormViewModel.formStatus}
          personaTableSelectionModalViewModel={personaTableSelectionModalViewModel}
          campaignTableSelectionModalViewModel={campaignTableSelectionModalViewModel}
          arrayConnectedChannelsFinal={
            this.contentConnectedChannelsByOrganisationViewModel.arrayConnectedChannelsFinal
          }
          listFaceBookFanpageView={
            this.channelsListViewModel ? this.channelsListViewModel.listFaceBookFanpageView : null
          }
          listInstagramFanpageView={
            this.channelsListViewModel ? this.channelsListViewModel.listInstagramFanpageView : null
          }
          listFacebookFanpageConnected={
            this.channelsListViewModel
              ? this.channelsListViewModel.listFacebookFanpageConnected
              : null
          }
          lisInstagramFanpageConnected={
            this.channelsListViewModel
              ? this.channelsListViewModel.lisInstagramFanpageConnected
              : null
          }
          listLinkedinFanpageConnected={
            this.channelsListViewModel
              ? this.channelsListViewModel.listLinkedinFanpageConnected
              : null
          }
          handleDeselectAllSocial={this.handleDeselectAllSocial}
          handleSelectAllSocial={this.handleSelectAllSocial}
          isAdvanceMode={this.contentConnectedChannelsByOrganisationViewModel.isAdvanceMode}
          contentConnectedChannelsByOrganisationViewModel={
            this.contentConnectedChannelsByOrganisationViewModel
          }
          isDeselectAllSocial={
            this.contentConnectedChannelsByOrganisationViewModel
              ? this.contentConnectedChannelsByOrganisationViewModel.isDeselectAllSocial
              : null
          }
          handleDeSelectConnectSomePage={(name, i) => this.handleDeSelectConnectSomePage(name, i)}
          getArrayPageFacebook={getArrayPageFacebook}
          getArrayPageLinkedin={getArrayPageLinkedin}
          getArrayPageInstagram={getArrayPageInstagram}
          getListConnectFacebookPagePublisd={
            this.channelsListViewModel.getListConnectFacebookPagePublisd
          }
          getListConnectLinkedinPagePublisd={
            this.channelsListViewModel.getListConnectLinkedinPagePublisd
          }
          getListConnectInstagramPage={this.channelsListViewModel.getListConnectInstagramPage}
          square_image_gg={this.contentConnectedChannelsByOrganisationViewModel?.getImageSquare}
          landscape_image_gg={
            this.contentConnectedChannelsByOrganisationViewModel?.getImageLandscape
          }
          facebookAdPreview={this.contentsListViewModel?.facebookAdPreview}
          listLinkedinFanpageView={
            this.channelsListViewModel ? this.channelsListViewModel.listLinkedinFanpageView : null
          }
        />
      );
    }
  }
);

export default withWizardViewModel(ContentFormPublishWizard);
