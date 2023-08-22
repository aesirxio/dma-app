/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PAGE_STATUS from '../../../constants/PageStatus';
import { withChannelsViewModel } from '../ChannelsViewModels/ChannelsViewModelContextProvider';
import { Spinner } from 'aesirx-uikit';
import ComponentConnectaChannel from '../../../components/ComponentConnectaChannel';
import ModalComponent from '../../../components/Modal';
import ComponentItemFanpage from '../../../components/ComponentItemFanpage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { CHANNEL_ADS_GOOGLE } from '../../../constants/ChannelModule';

const ConnectChannels = observer(
  class ConnectChannels extends Component {
    channelsListViewModel = null;
    listFacebookFanpageConnected = null;
    listInstagramFanpageConnected = null;

    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.viewModel = viewModel;

      this.channelsListViewModel = viewModel ? viewModel.getChannelsListViewModel() : null;

      this.loginCMSChannelFormModalViewModel = viewModel
        ? viewModel.getLoginCMSChannelFormModalViewModel()
        : null;

      this.state = {
        channels: [],
        showModal: true,
        showModalFbad: true,
        getIDSFanpage: [],
        getIDSAdAccount: [],
        isWordpressConnected: false,
      };

      //call check connected channels
    }

    componentDidMount() {
      this.channelsListViewModel.resetObservableProperties();
      this.channelsListViewModel.initMemberFeaturesMasterData();

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

    handleCheckbox = (id) => {
      let getIDSFanpage = this.state.getIDSFanpage;
      getIDSFanpage.push(id);

      this.setState({
        getIDFanpage: getIDSFanpage,
      });
    };

    handleCloseModal = () => {
      this.setState({
        showModal: false,
      });
    };

    handleCheckboxAdAccounts = (id) => {
      let getIDSAdAccount = this.state.getIDSAdAccount;
      getIDSAdAccount.push(id);

      this.setState({
        getIDSAdAccount: getIDSAdAccount,
      });
    };

    handleCloseModalFbad = () => {
      this.setState({
        showModalFbad: false,
      });
    };

    handleSaveAdsAccount = () => {
      this.channelsListViewModel.saveChosseFacebookAdAccount(this.state.getIDSAdAccount);

      this.setState({
        showModal: false,
      });
    };

    // handleSaveFanpage = () => {
    //   this.channelsListViewModel.saveChosseFacebookFanpages(this.state.getIDSFanpage);

    //   this.setState({
    //     showModal: false,
    //   });
    // };

    handleModalCms = (type, isConnected = true) => {
      if (isConnected) {
        this.loginCMSChannelFormModalViewModel.setChannelType(type);
        this.loginCMSChannelFormModalViewModel.openModal();
      } else {
        this.channelsListViewModel.disConnectChannel(type);
      }
    };

    handleConnectedFanpage = (channelType, id) => {
      switch (channelType) {
        case 'facebook':
          if (this.channelsListViewModel.listFacebookFanpageConnected.indexOf(id) > -1) {
            this.channelsListViewModel.disconnectAFanpagePage(channelType, id);
          } else {
            this.channelsListViewModel.connectAFanpagePage(channelType, id);
          }
          break;
        case 'instagram':
          if (this.channelsListViewModel.listInstagramFanpageConnected.indexOf(id) > -1) {
            this.channelsListViewModel.disconnectAFanpagePage(channelType, id);
          } else {
            this.channelsListViewModel.connectAFanpagePage(channelType, id);
          }
          break;
        case 'google_ads':
          if (this.channelsListViewModel.listGoogleAdsAccountConnected?.indexOf(id) > -1) {
            this.channelsListViewModel.disconnectAFanpagePage(channelType, id);
          } else {
            this.channelsListViewModel.connectAFanpagePage(channelType, id);
          }
          break;
        case 'linkedin':
          // if(this.channelsListViewModel.listLinkedinFanpageConnected) {
          //   if(typeof this.channelsListViewModel.listLinkedinFanpageConnected  == 'object') {
          //     this.channelsListViewModel.listLinkedinFanpageConnected = Object.values(this.channelsListViewModel.listLinkedinFanpageConnected)
          //   } else {
          //     this.channelsListViewModel.listLinkedinFanpageConnected = this.channelsListViewModel.listLinkedinFanpageConnected
          //   }
          // }

          if (this.channelsListViewModel.listLinkedinFanpageConnected.indexOf(id) > -1) {
            this.channelsListViewModel.disconnectAFanpagePage(channelType, id);
          } else {
            this.channelsListViewModel.connectAFanpagePage(channelType, id);
          }
          break;

        default:
      }
    };

    onSuccessGoogleConnect = (res) => {
      let dataAccessToken = {
        profileObject: res.profileObj,
        tokenObject: res.tokenObj,
        status: 'connected',
      };

      this.channelsListViewModel.onSuccessConnect(JSON.stringify(dataAccessToken), 'google_ads');
    };

    onRequestGoogleConnect = () => {};

    onSuccessFacebookConnect = () => {
      window.FB.api('me/accounts', (response) => {
        if (response) {
          const connected = response.data.map((item) => item.id);
          const dataAccessToken = {
            pages: response.data,
            connected: connected,
            status: 'connected',
          };

          this.channelsListViewModel.onSuccessConnect(JSON.stringify(dataAccessToken), 'facebook');
        }
      });
    };

    onSuccessYoutubeConnect = (res) => {
      let dataAccessToken = {
        profileObject: res.profileObj,
        tokenObject: res.tokenObj,
        status: 'connected',
      };

      this.channelsListViewModel.onSuccessConnect(JSON.stringify(dataAccessToken), 'youtube');
    };

    onSuccessInstagramConnect = (res) => {
      let dataAccessToken = {
        profileObject: res.authResponse.accessToken,
        tokenObject: res.authResponse.accessToken,
        status: 'connected',
      };

      this.channelsListViewModel.onSuccessConnect(JSON.stringify(dataAccessToken), 'instagram');
    };

    onFailureConnectChannels = () => {};

    onSuccessGoogleMyBusinessConnect = (res) => {
      let dataAccessToken = {
        profileObject: res.profileObj,
        tokenObject: res.tokenObj,
        status: 'connected',
      };

      this.channelsListViewModel.onSuccessConnect(
        JSON.stringify(dataAccessToken),
        'google_my_business'
      );
    };

    render() {
      let { showModal } = this.state;

      const {
        listFaceBookFanpageView,
        listFacebookFanpageConnected,
        facebookConnected,
        listInstagramFanpageView,
        listInstagramFanpageConnected,
        instagramConnected,
        listFacebookAdsAccount,
        listFacebookAdsAccountView,
        facebookAdsConnected,
        youtubeConnected,
        twitterConnected,
        linkedinConnected,
        mailchimpConnected,
        tumblrConnected,
        wordpressConnected,
        mustUpgrade,
        drupalConneted,
        mediumConnected,
        joomlaConnected,
        googleadsConnected,
        advertisingFeaturesMasterData,
        cmsFeaturesMasterData,
        socialMediaFeaturesMasterData,
        emailMarketingFeaturesMasterData,
        countCMSConnected,
        countAdvertisingConnected,
        countEmailMarketingConnected,
        countSocialMediaConnected,
        drupalConnected,
        getIdActionFacebookFange,
        ConnectStatusFanpage,
        googleMyBusinessConnected,
        listLinkedinFanpageView,
        listLinkedinFanpageConnected,
        listGoogleAdsAccountView,
        listGoogleAdsAccountConnected,
        tableStatus,
      } = this.channelsListViewModel;

      if (tableStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      return (
        <div className="py-4 px-3">
          <h2 className="text-blue-0 mb-4 text-blue-0">Connect a Channel</h2>
          <div>
            <ComponentConnectaChannel
              channelsListViewModel={this.channelsListViewModel}
              listFaceBookFanpageView={listFaceBookFanpageView ? listFaceBookFanpageView : null}
              listFacebookFanpageConnected={
                listFacebookFanpageConnected ? listFacebookFanpageConnected : null
              }
              listInstagramFanpageView={listInstagramFanpageView ? listInstagramFanpageView : null}
              listInstagramFanpageConnected={
                listInstagramFanpageConnected ? listInstagramFanpageConnected : null
              }
              listFacebookAdsAccountView={
                listFacebookAdsAccountView ? listFacebookAdsAccountView : null
              }
              facebookConnected={facebookConnected}
              facebookAdsConnected={facebookAdsConnected}
              youtubeConnected={youtubeConnected}
              twitterConnected={twitterConnected}
              linkedinConnected={linkedinConnected}
              mailchimpConnected={mailchimpConnected}
              instagramConnected={instagramConnected}
              tumblrConnected={tumblrConnected}
              wordpressConnected={wordpressConnected}
              mustUpgrade={mustUpgrade}
              drupalConneted={drupalConneted}
              mediumConnected={mediumConnected}
              joomlaConnected={joomlaConnected}
              viewModel={this.viewModel}
              handleModalCms={this.handleModalCms}
              isModalCms={this.loginCMSChannelFormModalViewModel.show}
              googleadsConnected={googleadsConnected}
              handleConnectedFanpage={this.handleConnectedFanpage}
              advertisingFeaturesMasterData={advertisingFeaturesMasterData}
              cmsFeaturesMasterData={cmsFeaturesMasterData}
              socialMediaFeaturesMasterData={socialMediaFeaturesMasterData}
              emailMarketingFeaturesMasterData={emailMarketingFeaturesMasterData}
              countCMSConnected={countCMSConnected}
              countAdvertisingConnected={countAdvertisingConnected}
              countEmailMarketingConnected={countEmailMarketingConnected}
              countSocialMediaConnected={countSocialMediaConnected}
              onSuccessGoogleConnect={this.onSuccessGoogleConnect}
              onFailureGoogleConnect={this.onFailureGoogleConnect}
              onRequestGoogleConnect={this.onRequestGoogleConnect}
              onSuccessFacebookConnect={this.onSuccessFacebookConnect}
              onFailureFacebookConnect={this.onFailureFacebookConnect}
              drupalConnected={drupalConnected}
              getIdActionFacebookFange={getIdActionFacebookFange ? getIdActionFacebookFange : null}
              ConnectStatusFanpage={ConnectStatusFanpage}
              PAGE_STATUS={PAGE_STATUS}
              onFailureConnectChannels={this.onFailureConnectChannels}
              onSuccessYoutubeConnect={this.onSuccessYoutubeConnect}
              onSuccessInstagramConnect={this.onSuccessInstagramConnect}
              googleMyBusinessConnected={googleMyBusinessConnected}
              onSuccessGoogleMyBusinessConnect={this.onSuccessGoogleMyBusinessConnect}
              listLinkedinFanpageView={listLinkedinFanpageView}
              listLinkedinFanpageConnected={listLinkedinFanpageConnected}
              listGoogleAdsAccountView={listGoogleAdsAccountView}
              listGoogleAdsAccountConnected={listGoogleAdsAccountConnected}
            />
          </div>
          {/* {listFaceBookFanpage && (
            <ModalComponent
              header={'Facebook Fanpage'}
              body={
                <div>
                  <ul className="list-unstyled align-items-center">
                    {listFaceBookFanpage &&
                      listFaceBookFanpage.map((value, key) => {
                        return (
                          <ComponentItemFanpage
                            key={key}
                            name={value.name}
                            handleCheckbox={(e) => {
                              this.handleCheckbox(value.id);
                            }}
                          />
                        );
                      })}
                  </ul>
                </div>
              }
              show={showModal}
              onHide={this.handleCloseModal}
              footer={
                <button onClick={this.handleSaveFanpage} className="btn btn-success w-100">
                  <span>Save</span>
                  <i className="ms-1">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </i>
                </button>
              }
            />
          )} */}
          {listFacebookAdsAccount && (
            <ModalComponent
              header={'Facebook Ad Accounts'}
              body={
                <div>
                  <ul className="list-unstyled align-items-center">
                    {listFacebookAdsAccount &&
                      listFacebookAdsAccount.map((value, key) => {
                        return (
                          <ComponentItemFanpage
                            key={key}
                            name={value.name}
                            handleCheckbox={() => {
                              this.handleCheckboxAdAccounts(value.id);
                            }}
                          />
                        );
                      })}
                  </ul>
                </div>
              }
              show={showModal}
              onHide={this.handleCloseModal}
              footer={
                <button onClick={this.handleSaveAdsAccount} className="btn btn-success w-100">
                  <span>Save</span>
                  <i className="ms-1">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </i>
                </button>
              }
            />
          )}
        </div>
      );
    }
  }
);

export default withChannelsViewModel(ConnectChannels);
