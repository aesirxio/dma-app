import React, { Component } from 'react';

import StepWizard from 'react-step-wizard';
import { observer } from 'mobx-react';
import { withContentViewModel } from '../ContentViewModels/ContentViewModelContextProvider';
import PAGE_STATUS from '../../../constants/PageStatus';
import ContentFormGeneral from './ContentFormGeneral/index';
import ContentFormPublish from './ContentFormPublish/index';
import { CONTENT_DESCRIPTION_MODE, CONTENT_FIELD_KEY } from '../../../constants/ContentModule';
import ContentFormAds from './ContentFormAds';
import { CHANNEL_ADS_GOOGLE, CHANNEL_ADS_FACEBOOK } from '../../../constants/ChannelModule';
import ContentUtils from '../ContentUtils/ContentUtils';
import ChannelUtils from '../../ChannelsPage/ChannelUtils/ChannelUtils';
import Spinner from '../../../components/Spinner';

const ContentFormPage = observer(
  class ContentFormPage extends Component {
    formPropsData = {};

    constructor(props) {
      super(props);

      this.viewModel = this.props.viewModel.getFormViewModel();

      console.log('ContentFormPage', this.viewModel);

      this.viewModel.init(this, this.props.match);
    }

    populatingFormDataHandler = (
      data,
      channelsData,
      projectMasterData,
      campaignMasterData,
      personaMasterData
    ) => {
      this.formPropsData[CONTENT_FIELD_KEY.ID] = data?.id ?? 0;
      this.formPropsData[CONTENT_FIELD_KEY.NAME] = data?.getName().value;
      this.formPropsData[CONTENT_FIELD_KEY.PROJECT] = data?.getProject(projectMasterData) ?? '';
      this.formPropsData[CONTENT_FIELD_KEY.CAMPAIGN] = data?.getCampaign(campaignMasterData) ?? '';
      this.formPropsData[CONTENT_FIELD_KEY.PERSONA] = data?.getPersona(personaMasterData) ?? [];
      this.formPropsData[CONTENT_FIELD_KEY.CHANNELS] = channelsData;
      this.formPropsData[CONTENT_FIELD_KEY.MODE] =
        data?.getMode() ?? CONTENT_DESCRIPTION_MODE.BASIC;
      this.formPropsData[CONTENT_FIELD_KEY.DESCRIPTION] = data?.getDescription() ?? '';

      this.formPropsData[CONTENT_FIELD_KEY.PUBLISH_MODE] = data?.getPublishType() ?? {};

      this.formPropsData[CONTENT_FIELD_KEY.PUBLISH_DATE] = data?.getPublishDate() ?? new Date();
      this.formPropsData[CONTENT_FIELD_KEY.TIME] = data?.getPublishTime() ?? new Date();

      this.formPropsData[CONTENT_FIELD_KEY.DESELECTED] = [];
      this.formPropsData[CONTENT_FIELD_KEY.CANVA] = data?.getCanvaAssets() ?? {};
      this.formPropsData[CONTENT_FIELD_KEY.DAM] = data?.getDamAssets() ?? {};

      this.formPropsData[CONTENT_FIELD_KEY.ADS] = data?.getAds() ?? {
        [CHANNEL_ADS_GOOGLE]: {
          setupAds: {},
          campaign: {},
          ad_group: {},
        },
        [CHANNEL_ADS_FACEBOOK]: {
          setupAds: {},
          campaign: {},
          ad_group: {},
        },
      };

      this.formPropsData['items'] = data?.items ?? [];
    };

    render() {
      const { formStatus } = this.viewModel;

      if (formStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      const channelMasterData = ChannelUtils.getChannelByFilter(
        this.viewModel.channelMasterData,
        'removed',
        'not'
      );

      console.log('[ContentFormPage] - re-render .........', this.formPropsData, channelMasterData);

      return (
        <>
          <StepWizard
            isLazyMount={true}
            transitions={{
              enterRight: '',
              enterLeft: '',
              exitRight: '',
              exitLeft: '',
            }}
            initialStep={1}
          >
            <ContentFormGeneral stepName={'general'} formPropsData={this.formPropsData} />
            {ContentUtils.hasAdvertising(channelMasterData) && (
              <ContentFormAds stepName={'ads'} formPropsData={this.formPropsData} />
            )}
            <ContentFormPublish stepName={'publish'} formPropsData={this.formPropsData} />
          </StepWizard>
        </>
      );
    }
  }
);

export default withContentViewModel(ContentFormPage);
