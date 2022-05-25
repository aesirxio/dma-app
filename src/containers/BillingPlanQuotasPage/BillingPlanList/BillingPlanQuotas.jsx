import React, { Component, lazy } from 'react';
import { observer } from 'mobx-react';
import { withBillingPlanViewModel } from '../../BillingPlanPage/BillingPlanViewModel/BillingPlanViewModelContextProvider';
import Spinner from '../../../components/Spinner';
import ComponentBillingInfo from '../../../components/ComponentBillingInfo';
import { CHANNEL_ADS_GOOGLE } from '../../../constants/ChannelModule';

const BillingPlanQuotas = observer(
  class BillingPlanQuotas extends Component {
    billingPlanListViewModel = null;
    constructor(props) {
      super(props);
      const { viewModel } = props;

      this.billingPlanListViewModel = viewModel ? viewModel.getBillingPlanListViewModel() : null;
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

    componentDidMount() {
      console.log('init data');
      const script = document.createElement('script');
      script.src = 'https://cdn.paddle.com/paddle/paddle.js';
      script.async = true;
      document.body.appendChild(script);

      //get subscription detail
      if (this.billingPlanListViewModel.subscriptionDetail == null) {
        this.billingPlanListViewModel.initializeDataMemberSubscriptionDetail();
      }
      this.billingPlanListViewModel.initializeDataMemberUploadHistoryQuotas();
      this.channelsListViewModel.resetObservableProperties();
      this.channelsListViewModel.initMemberFeaturesMasterData();
    }

    render() {
      const { tableStatus, subscriptionDetail, uploadHistoryQuotas } =
        this.billingPlanListViewModel;
      const {
        cmsFeaturesMasterData,
        countCMSConnected,
        countAdvertisingConnected,
        countEmailMarketingConnected,
        countSocialMediaConnected,
      } = this.channelsListViewModel;
      let planName =
        (subscriptionDetail &&
          subscriptionDetail.valid &&
          subscriptionDetail.plan_name.toLowerCase()) ||
        'free';
      return cmsFeaturesMasterData == null ? (
        <Spinner />
      ) : (
        <div>
          <div>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="text-blue-0 mb-0">Quotas</h2>
            </div>
            {uploadHistoryQuotas && (
              <ComponentBillingInfo
                subscriptionDetail={subscriptionDetail}
                uploadHistoryQuotas={uploadHistoryQuotas}
                countSocialMediaConnected={countSocialMediaConnected}
                countAdvertisingConnected={countAdvertisingConnected}
                countCMSConnected={countCMSConnected}
                countEmailMarketingConnected={countEmailMarketingConnected}
                cmsFeaturesMasterData={cmsFeaturesMasterData}
                planName={planName}
              />
            )}
          </div>
        </div>
      );
    }
  }
);

export default withBillingPlanViewModel(BillingPlanQuotas);
