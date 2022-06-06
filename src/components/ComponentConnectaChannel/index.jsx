/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component, lazy } from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';

import LoginChannelCMSFormModal from '../../containers/ChannelsPage/LoginChannelCMSForm/LoginChannelCMSFormModal';
import styles from './index.module.scss';
import './index.scss';
import Upgrade from '../Upgrade';
import ButtonConnect from '../ButtonConnect';
import { CHANNEL_TYPE } from '../../constants/ChannelModule';
import { AESIRX_CONFIGS, AXIOS_CONFIGS } from 'aesirx-dma-lib';

const ModalComponent = lazy(() => import('../../components/Modal'));
class ComponentConnectaChannel extends Component {
  formData = [];
  channelsListViewModel = null;
  constructor(props) {
    super(props);

    this.channelsListViewModel = this.props.channelsListViewModel;

    let { viewModel } = this.props;

    this.loginCMSChannelFormModalViewModel = viewModel
      ? viewModel.getLoginCMSChannelFormModalViewModel()
      : null;

    this.state = {
      panelIndex: '',
      isShowModalWordpress: false,
      showModalCms: false,
      showModalUpgrade: false,
    };
  }

  closeModal = () => {
    this.setState({
      isShowModalWordpress: false,
    });
  };

  isAllowedConnectAdvertising = (channelType) => {
    const advertisingMasterData = this.props.advertisingFeaturesMasterData;

    if (!advertisingMasterData) {
      return false;
    }

    const featureChannel = this.getFeatureByChannelType(advertisingMasterData, channelType);

    return featureChannel?.enable === 1;
  };

  isAllowedConnectChannel = (channelType, groupType) => {
    if (!AESIRX_CONFIGS.ENABLE_PRICING_PLAN) {
      return true;
    }

    switch (groupType) {
      case 'social_media':
        const { socialMediaFeaturesMasterData, countSocialMediaConnected } = this.props;
        return this.isAllowedConnectByChannelType(
          channelType,
          socialMediaFeaturesMasterData,
          countSocialMediaConnected
        );
      case 'cms':
        const { cmsFeaturesMasterData, countCMSConnected } = this.props;
        return this.isAllowedConnectByChannelType(
          channelType,
          cmsFeaturesMasterData,
          countCMSConnected
        );
      case 'advertising':
        const { advertisingFeaturesMasterData, countAdvertisingConnected } = this.props;
        return this.isAllowedConnectByChannelType(
          channelType,
          advertisingFeaturesMasterData,
          countAdvertisingConnected
        );
      case 'email_marketing':
        const { emailMarketingFeaturesMasterData, countEmailMarketingConnected } = this.props;
        return this.isAllowedConnectByChannelType(
          channelType,
          emailMarketingFeaturesMasterData,
          countEmailMarketingConnected
        );
      default:
        return true;
    }
  };

  getFeatureByChannelType = (featureMasterData, channelType) => {
    let result = featureMasterData.filter((obj) => {
      return obj.feature_slug === channelType;
    });

    if (result) {
      return result[0];
    }

    return false;
  };

  isAllowedConnectByChannelType = (
    channelType,
    featuresChannelMasterData,
    countConnectedChannel
  ) => {
    if (!featuresChannelMasterData) {
      return false;
    }

    const featureChannel = this.getFeatureByChannelType(featuresChannelMasterData, channelType);

    return (
      featureChannel?.enable === 1 &&
      (!featureChannel.option || featureChannel.option > countConnectedChannel)
    );
  };

  handleConnectChannel = (name, isConnected = true) => {
    let { channelsListViewModel } = this.props;

    if (isConnected) {
      channelsListViewModel.connectLoginUrl(name);
    } else {
      channelsListViewModel.disConnectChannel(name);
    }
  };

  handleNotifyChannel = (name, isConnected = true, idFanpage) => {
    let accepted = true;
    if (idFanpage) {
      switch (name) {
        case CHANNEL_TYPE.FACEBOOK_PAGE.NAME:
          accepted = this.isAllowedConnectChannel(
            CHANNEL_TYPE.FACEBOOK_PAGE.NAME,
            CHANNEL_TYPE.FACEBOOK_PAGE.TYPE
          );
          if (!accepted && isConnected === false) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.props.handleConnectedFanpage(name, idFanpage);
          break;
        case CHANNEL_TYPE.INSTAGRAM.NAME:
          accepted = this.isAllowedConnectChannel(
            CHANNEL_TYPE.INSTAGRAM.NAME,
            CHANNEL_TYPE.INSTAGRAM.TYPE
          );
          if (!accepted && isConnected === false) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.props.handleConnectedFanpage(name, idFanpage);
          break;
        case CHANNEL_TYPE.LINKEDIN_PAGE.NAME:
          accepted = this.isAllowedConnectChannel(
            CHANNEL_TYPE.LINKEDIN_PAGE.NAME,
            CHANNEL_TYPE.LINKEDIN_PAGE.TYPE
          );
          if (!accepted && isConnected === false) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.props.handleConnectedFanpage(name, idFanpage);
          break;

        case CHANNEL_TYPE.GOOGLE_ADS.NAME:
          accepted = this.isAllowedConnectChannel(
            CHANNEL_TYPE.GOOGLE_ADS.OTHERNAME,
            CHANNEL_TYPE.GOOGLE_ADS.TYPE
          );
          if (!accepted && isConnected === false) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.props.handleConnectedFanpage(name, idFanpage);
          break;

        default:
      }
    } else
      switch (name) {
        case CHANNEL_TYPE.FACEBOOK.NAME:
          accepted = this.isAllowedConnectChannel(
            CHANNEL_TYPE.FACEBOOK.NAME,
            CHANNEL_TYPE.FACEBOOK.TYPE
          );
          if (!accepted && isConnected === true) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.handleConnectChannel(name, isConnected);
          break;
        case CHANNEL_TYPE.YOUTUBE.NAME:
          accepted = this.isAllowedConnectChannel(
            CHANNEL_TYPE.YOUTUBE.NAME,
            CHANNEL_TYPE.YOUTUBE.TYPE
          );
          if (!accepted && isConnected === true) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.handleConnectChannel(name, isConnected);
          break;
        case CHANNEL_TYPE.TWITTER.NAME:
          accepted = this.isAllowedConnectChannel(
            CHANNEL_TYPE.TWITTER.NAME,
            CHANNEL_TYPE.TWITTER.TYPE
          );
          if (!accepted && isConnected === true) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.handleConnectChannel(name, isConnected);
          break;
        case CHANNEL_TYPE.INSTAGRAM.NAME:
          accepted = this.isAllowedConnectChannel(
            CHANNEL_TYPE.INSTAGRAM.NAME,
            CHANNEL_TYPE.INSTAGRAM.TYPE
          );
          if (!accepted && isConnected === true) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.handleConnectChannel(name, isConnected);
          break;
        case CHANNEL_TYPE.LINKEDIN.NAME:
          accepted = this.isAllowedConnectChannel(
            CHANNEL_TYPE.LINKEDIN.NAME,
            CHANNEL_TYPE.LINKEDIN.TYPE
          );
          if (!accepted && isConnected === true) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.handleConnectChannel(name, isConnected);
          break;
        case CHANNEL_TYPE.TUMBLR.NAME:
          accepted = this.isAllowedConnectChannel(
            CHANNEL_TYPE.TUMBLR.NAME,
            CHANNEL_TYPE.TUMBLR.TYPE
          );
          if (!accepted && isConnected === true) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.handleConnectChannel(name, isConnected);
          break;
        case CHANNEL_TYPE.MEDIUM.NAME:
          accepted = this.isAllowedConnectChannel(
            CHANNEL_TYPE.MEDIUM.NAME,
            CHANNEL_TYPE.MEDIUM.TYPE
          );
          if (!accepted && isConnected === true) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.props.handleModalCms(name, isConnected);
          break;
        case CHANNEL_TYPE.FACEBOOK_ADS.NAME:
          accepted = this.isAllowedConnectAdvertising(CHANNEL_TYPE.FACEBOOK_ADS.OTHERNAME);
          if (!accepted && isConnected === true) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.handleConnectChannel(name, isConnected);
          break;

        case CHANNEL_TYPE.GOOGLE_ADS.NAME:
          accepted = this.isAllowedConnectAdvertising(CHANNEL_TYPE.GOOGLE_ADS.OTHERNAME);
          if (!accepted && isConnected === true) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.handleConnectChannel(name, isConnected);
          break;

        case CHANNEL_TYPE.WORDPRESS.NAME:
          accepted = this.isAllowedConnectChannel(
            CHANNEL_TYPE.WORDPRESS.NAME,
            CHANNEL_TYPE.WORDPRESS.TYPE
          );
          if (!accepted && isConnected === true) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.props.handleModalCms(name, isConnected);
          break;
        case CHANNEL_TYPE.DRUPAL.NAME:
          accepted = this.isAllowedConnectChannel(
            CHANNEL_TYPE.DRUPAL.NAME,
            CHANNEL_TYPE.DRUPAL.TYPE
          );
          if (!accepted && isConnected === true) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.props.handleModalCms(name, isConnected);
          break;
        case CHANNEL_TYPE.JOOMLA.NAME:
          accepted = this.isAllowedConnectChannel(
            CHANNEL_TYPE.JOOMLA.NAME,
            CHANNEL_TYPE.JOOMLA.TYPE
          );
          if (!accepted && isConnected === true) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.props.handleModalCms(name, isConnected);
          break;
        case CHANNEL_TYPE.MAILCHIMP.NAME:
          accepted = this.isAllowedConnectChannel(
            CHANNEL_TYPE.MAILCHIMP.NAME,
            CHANNEL_TYPE.MAILCHIMP.TYPE
          );
          if (!accepted && isConnected === true) {
            this.setState({
              showModalUpgrade: true,
            });
            return;
          }
          this.handleConnectChannel(name, isConnected);
          break;

        default:
      }
  };

  closeModalUpgrade = () => {
    // this.props.channelsListViewModel.mustUpgrade = false;
    this.setState({
      showModalUpgrade: false,
    });
  };

  render() {
    const {
      listFaceBookFanpageView,
      facebookConnected,
      listFacebookAdsAccountView,
      facebookAdsConnected,
      youtubeConnected,
      twitterConnected,
      linkedinConnected,
      mailchimpConnected,
      instagramConnected,
      listInstagramFanpageView,
      listInstagramFanpageConnected,
      tumblrConnected,
      mediumConnected,
      joomlaConnected,
      handleModalCms,
      isModalCms,
      googleadsConnected,
      drupalConnected,
      wordpressConnected,
      listFacebookFanpageConnected,
      listLinkedinFanpageView,
      listLinkedinFanpageConnected,
      listGoogleAdsAccountView,
      listGoogleAdsAccountConnected,
    } = this.props;
    return (
      <div className="wrapper_tabs">
        <Tabs defaultActiveKey="1" id="connectContent-tab" className="bg-white border-0">
          <Tab eventKey={1} title={'Social Media'}>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/facebook.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Facebook</span>
                  </div>

                  <ButtonConnect
                    onClick={() => {
                      this.handleNotifyChannel(CHANNEL_TYPE.FACEBOOK.NAME, !facebookConnected);
                    }}
                    isConnected={facebookConnected}
                  />
                </div>
                {listFaceBookFanpageView && (
                  <div className="p-3">
                    <div className={`list_content`}>
                      <div className="py-2 px-3 bg-blue d-flex rounded-2">
                        <div className="col-4">Name</div>
                        <div className="col-6 text-end">Action</div>
                      </div>
                      <div className={`list_main `}>
                        {listFaceBookFanpageView.map((value, key) => {
                          return (
                            <div
                              key={key}
                              className={`item_accordion ${styles.item_accordion} p-3 border-bottom-1 d-flex align-items-center`}
                            >
                              <div className="col-4">
                                <div className="d-flex align-items-center">
                                  <img
                                    className="img-avatar rounded-circle"
                                    src={value.avatar}
                                    alt=""
                                  />
                                  <span className="ms-2">{value.name}</span>
                                </div>
                              </div>
                              <div className="col-6 text-end">
                                <button
                                  type="button"
                                  className={`cursor-pointer btn ct_btn_connect ${
                                    listFacebookFanpageConnected &&
                                    listFacebookFanpageConnected.indexOf(value.id) > -1
                                      ? 'btn-danger'
                                      : 'btn-success'
                                  }`}
                                  onClick={() => {
                                    this.handleNotifyChannel(
                                      CHANNEL_TYPE.FACEBOOK_PAGE.NAME,
                                      listFacebookFanpageConnected &&
                                        listFacebookFanpageConnected.indexOf(value.id) > -1,
                                      value.id
                                    );
                                  }}
                                >
                                  <span className="text-white">
                                    {listFacebookFanpageConnected &&
                                    listFacebookFanpageConnected.indexOf(value.id) > -1
                                      ? 'Disconnect'
                                      : 'Connect'}
                                  </span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/instagram.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Instagram</span>
                  </div>

                  <ButtonConnect
                    onClick={() => {
                      this.handleNotifyChannel(CHANNEL_TYPE.INSTAGRAM.NAME, !instagramConnected);
                    }}
                    isConnected={instagramConnected}
                  />
                </div>
                {listInstagramFanpageView && (
                  <div className="p-3">
                    <div className={`list_content`}>
                      <div className="py-2 px-3 bg-blue d-flex rounded-2">
                        <div className="col-4">Name</div>
                        <div className="col-6 text-end">Action</div>
                      </div>
                      <div className={`list_main `}>
                        {listInstagramFanpageView.map((value, key) => {
                          return (
                            <div
                              key={key}
                              className={`item_accordion ${styles.item_accordion} p-3 border-bottom-1 d-flex align-items-center`}
                            >
                              <div className="col-4">
                                <div className="d-flex align-items-center">
                                  <span className="ms-2">{value.name}</span>
                                </div>
                              </div>
                              <div className="col-6 text-end">
                                <button
                                  type="button"
                                  className={`cursor-pointer btn ct_btn_connect ${
                                    listInstagramFanpageConnected &&
                                    listInstagramFanpageConnected.indexOf(value.id) > -1
                                      ? 'btn-danger'
                                      : 'btn-success'
                                  }`}
                                  onClick={() => {
                                    this.handleNotifyChannel(
                                      CHANNEL_TYPE.INSTAGRAM.NAME,
                                      listInstagramFanpageConnected &&
                                        listInstagramFanpageConnected.indexOf(value.id) > -1,
                                      value.id
                                    );
                                  }}
                                >
                                  <span className="text-white">
                                    {listInstagramFanpageConnected &&
                                    listInstagramFanpageConnected.indexOf(value.id) > -1
                                      ? 'Disconnect'
                                      : 'Connect'}
                                  </span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/youtube.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Youtube</span>
                  </div>

                  <ButtonConnect
                    onClick={() => {
                      this.handleNotifyChannel(CHANNEL_TYPE.YOUTUBE.NAME, !youtubeConnected);
                    }}
                    isConnected={youtubeConnected}
                    className={youtubeConnected ? 'btn-danger' : 'btn-success'}
                  />
                </div>
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/twitter.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Twitter</span>
                  </div>

                  <ButtonConnect
                    onClick={() => {
                      this.handleNotifyChannel(CHANNEL_TYPE.TWITTER.NAME, !twitterConnected);
                    }}
                    isConnected={twitterConnected}
                  />
                </div>
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/linkedin.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Linkedin</span>
                  </div>

                  <ButtonConnect
                    onClick={() => {
                      this.handleNotifyChannel(CHANNEL_TYPE.LINKEDIN.NAME, !linkedinConnected);
                    }}
                    isConnected={linkedinConnected}
                  />
                </div>
                {listLinkedinFanpageView && (
                  <div className="p-3">
                    <div className={`list_content`}>
                      <div className="py-2 px-3 bg-blue d-flex rounded-2">
                        <div className="col-4">Name</div>
                        <div className="col-6 text-end">Action</div>
                      </div>
                      <div className={`list_main `}>
                        {Object.values(listLinkedinFanpageView).map((value, key) => {
                          return (
                            <div
                              key={key}
                              className={`item_accordion ${styles.item_accordion} p-3 border-bottom-1 d-flex align-items-center`}
                            >
                              <div className="col-4">
                                <div className="d-flex align-items-center">
                                  <img
                                    className="img-avatar rounded-circle"
                                    src={value.picture}
                                    alt=""
                                  />
                                  <span className="ms-2">{value.localizedName}</span>
                                </div>
                              </div>
                              <div className="col-6 text-end">
                                <button
                                  type="button"
                                  className={`cursor-pointer btn ct_btn_connect ${
                                    listLinkedinFanpageConnected &&
                                    listLinkedinFanpageConnected.indexOf(value.id.toString()) > -1
                                      ? 'btn-danger'
                                      : 'btn-success'
                                  }`}
                                  onClick={() => {
                                    this.handleNotifyChannel(
                                      CHANNEL_TYPE.LINKEDIN_PAGE.NAME,
                                      listLinkedinFanpageConnected &&
                                        listLinkedinFanpageConnected.indexOf(value.id.toString()) >
                                          -1,
                                      value.id.toString()
                                    );
                                  }}
                                >
                                  <span className="text-white">
                                    {listLinkedinFanpageConnected &&
                                    listLinkedinFanpageConnected.indexOf(value.id.toString()) > -1
                                      ? 'Disconnect'
                                      : 'Connect'}
                                  </span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/tumblr.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Tumblr</span>
                  </div>

                  <ButtonConnect
                    onClick={() => {
                      this.handleNotifyChannel(CHANNEL_TYPE.TUMBLR.NAME, !tumblrConnected);
                    }}
                    isConnected={tumblrConnected}
                  />
                </div>
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/medium.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Medium</span>
                  </div>

                  <ButtonConnect
                    onClick={() => {
                      this.handleNotifyChannel(CHANNEL_TYPE.MEDIUM.NAME, !mediumConnected);
                    }}
                    isConnected={mediumConnected}
                    className={mediumConnected ? 'btn-danger' : 'btn-success'}
                  />
                </div>
              </div>
            </div>
          </Tab>

          <Tab eventKey={2} title={'Advertising'}>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/fbad.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Facebook Ads</span>
                  </div>

                  <ButtonConnect
                    onClick={() => {
                      this.handleNotifyChannel(
                        CHANNEL_TYPE.FACEBOOK_ADS.NAME,
                        !facebookAdsConnected
                      );
                    }}
                    isConnected={facebookAdsConnected}
                  />
                </div>
                {listFacebookAdsAccountView && (
                  <div className="p-3">
                    <div className={`list_content`}>
                      <div className="py-2 px-3 bg-blue d-flex rounded-2">
                        <div className="col-4">Name</div>
                        <div className="col-6 text-end">Action</div>
                      </div>
                      <div className={`list_main `}>
                        {listFacebookAdsAccountView.map((value, key) => {
                          return (
                            <div
                              key={key}
                              className={`item_accordion ${styles.item_accordion} p-3 border-bottom-1 d-flex align-items-center`}
                            >
                              <div className="col-4">
                                <div className="d-flex align-items-center">
                                  <span className="ms-2">{value.name}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/google_ads.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Google Adwords</span>
                  </div>

                  <ButtonConnect
                    onClick={() => {
                      this.handleNotifyChannel(CHANNEL_TYPE.GOOGLE_ADS.NAME, !googleadsConnected);
                    }}
                    isConnected={googleadsConnected}
                  />
                </div>
                {typeof googleadsConnected == 'boolean' &&
                  googleadsConnected &&
                  (listGoogleAdsAccountView?.length > 0 ? (
                    <div className="p-3">
                      <div className={`list_content`}>
                        <div className="py-2 px-3 bg-blue d-flex rounded-2">
                          <div className="col-6">Name</div>
                          <div className="col-6 text-end">Action</div>
                        </div>
                        <div className={`list_main `}>
                          {listGoogleAdsAccountView.map((value, key) => (
                            <div
                              key={key}
                              className={`item_accordion ${styles.item_accordion} p-3 border-bottom-1 d-flex align-items-center`}
                            >
                              <div className="col-6">
                                <div className="d-flex align-items-center">
                                  <span className="ms-2">
                                    {value.name} (ID: {value.id})
                                  </span>
                                </div>
                              </div>
                              <div className="col-6 text-end">
                                <button
                                  type="button"
                                  className={`cursor-pointer btn ct_btn_connect ${
                                    listGoogleAdsAccountConnected &&
                                    listGoogleAdsAccountConnected.indexOf(value.id.toString()) > -1
                                      ? 'btn-danger'
                                      : 'btn-success'
                                  }`}
                                  onClick={() => {
                                    this.handleNotifyChannel(
                                      CHANNEL_TYPE.GOOGLE_ADS.NAME,
                                      listGoogleAdsAccountConnected &&
                                        listGoogleAdsAccountConnected.indexOf(value.id.toString()) >
                                          -1,
                                      value.id.toString()
                                    );
                                  }}
                                >
                                  <span className="text-white">
                                    {listGoogleAdsAccountConnected &&
                                    listGoogleAdsAccountConnected.indexOf(value.id.toString()) > -1
                                      ? 'Disconnect'
                                      : 'Connect'}
                                  </span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3">
                      Your channel have no Google Adsword account. Please go to{' '}
                      <a href="https://ads.google.com/">Google Ads</a> first. Or disconnect the
                      channel and choose a other Google Account.
                    </div>
                  ))}
              </div>
            </div>
          </Tab>
          <Tab eventKey={3} title={'CMS'}>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/wordpress.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Wordpress</span>
                  </div>

                  <ButtonConnect
                    onClick={() => {
                      this.handleNotifyChannel(CHANNEL_TYPE.WORDPRESS.NAME, !wordpressConnected);
                    }}
                    isConnected={wordpressConnected}
                    className={wordpressConnected ? 'btn-danger' : 'btn-success'}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/drupal.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Drupal</span>
                  </div>

                  <ButtonConnect
                    onClick={() => {
                      this.handleNotifyChannel(CHANNEL_TYPE.DRUPAL.NAME, !drupalConnected);
                    }}
                    isConnected={drupalConnected}
                    className={drupalConnected ? 'btn-danger' : 'btn-success'}
                  />
                </div>
              </div>
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/joomla.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Joomla</span>
                  </div>

                  <ButtonConnect
                    onClick={() => {
                      this.handleNotifyChannel(CHANNEL_TYPE.JOOMLA.NAME, !joomlaConnected);
                    }}
                    isConnected={joomlaConnected}
                    className={joomlaConnected ? 'btn-danger' : 'btn-success'}
                  />
                </div>
                <div className="text-end d-flex justify-content-end w-100 pb-3 pe-3 mt-3">
                  <a
                    href={AXIOS_CONFIGS.BASE_ENDPOINT_URL + '/extensions/redjwttoken.zip'}
                    download
                    className="py-1 px-3 bg-green d-flex"
                  >
                    <i className="text-white">
                      <FontAwesomeIcon icon={faDownload} />
                    </i>
                    <span className="text-white ps-2">Download Joomla</span>
                  </a>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey={4} title={'Email Marketing'}>
            <div className="mt-4">
              <div className="bg-white rounded-3 mb-4">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="d-flex align-items-center">
                    <img className="img-avatar" src={'/assets/images/mailchimp.png'} alt="" />
                    <span className="ms-2 fs-4 text-blue-0 text-capitalize">Mailchimp</span>
                  </div>

                  <ButtonConnect
                    onClick={() => {
                      this.handleNotifyChannel(CHANNEL_TYPE.MAILCHIMP.NAME, !mailchimpConnected);
                    }}
                    isConnected={mailchimpConnected}
                  />
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
        <LoginChannelCMSFormModal
          handleModalCms={handleModalCms}
          loginCMSChannelFormModalViewModel={this.loginCMSChannelFormModalViewModel}
          isModalCms={isModalCms}
        />
        <ModalComponent
          show={this.state.showModalUpgrade}
          onHide={this.closeModalUpgrade}
          header={'Please upgrade account'}
          body={<Upgrade></Upgrade>}
          key={Math.random(40, 200)}
        />
      </div>
    );
  }
}

export default ComponentConnectaChannel;
