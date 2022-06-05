/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import { PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR } from '../../../constants/PersonaModule';

class ContentConnectedChannelsByOrganisationViewModel {
  contentsStore = null;

  formStatus = PAGE_STATUS.LOADING;

  connectedChannels = null;

  show = false;

  multi = false;

  isAdvanceMode = false;

  newArrayConnectChannels = [];

  getDataValueSelected = [];

  getValueSelectedChannels = [];

  arrayConnectedChannelsFinal = [];

  arrayConnectedChannelsFinalDelete = [];

  isDeselectAllSocial = false;

  isBackSaveData = false;

  isDeleteConnectChannel = false;

  getValueHeadline = '';

  getValueDescription = '';

  getDataPostChannelChannels = null;

  getImageSquare = '';

  getImageLandscape = '';

  dataContentDescriptionSingle = {
    advance_mode: false,
    list_channels: {
      facebook: {
        description: '',
        assets: {
          canvaAssets: [],
          damAssets: [],
        },
        selectedPage: [],
        publishedPlan: {
          publishingType: 'post_now',
          schedule: [],
        },
      },
      fbad: {
        description: '',
        assets: {
          canvaAssets: [],
          damAssets: ['https://api.dev.R Digital/dam/139ebfdc3a2a490b689a0607d593a967.jpg'],
        },
        selectedPage: [],
        publishedPlan: {
          publishingType: 'post_now',
          schedule: [],
        },
        setupAds: {
          campaign: {
            special_ad_categories: 'NONE',
            status: 'ACTIVE',
          },
          ad_set: {
            billing_event: 'IMPRESSIONS',
            targeting: {
              geo_locations: {
                countries: ['VN'],
              },
            },
            bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
            destination_type: 'WEBSITE',
          },
          ad_creative: {
            object_story_spec: {
              link_data: {
                call_to_action: {
                  type: 'LEARN_MORE',
                },
                page_welcome_message: [
                  {
                    message: {
                      text: '',
                      quick_replies: [
                        {
                          content_type: 'text',
                          title: '',
                          payload: '',
                        },
                      ],
                    },
                  },
                ],
                link: 'fb.com',
              },
            },
          },
          ad: {
            status: 'ACTIVE',
          },
        },
      },
      linkedin: {
        description: '',
        assets: {
          canvaAssets: [],
          damAssets: [],
        },
        selectedPage: [],
        publishedPlan: {
          publishingType: 'post_now',
          schedule: [],
        },
      },
      instagram: {
        description: '',
        assets: {
          canvaAssets: [],
          damAssets: [],
        },
        selectedPage: [],
        publishedPlan: {
          publishingType: 'post_now',
          schedule: [],
        },
      },
      twitter: {
        description: '',
        assets: {
          canvaAssets: [],
          damAssets: [],
        },
        selectedPage: [],
        publishedPlan: {
          publishingType: 'post_now',
          schedule: [],
        },
      },
      youtube: {
        description: '',
        assets: {
          videoAssets: [],
        },
        selectedPage: [],
        publishedPlan: {
          publishingType: 'post_now',
          schedule: [],
        },
      },
      joomla: {
        description: '',
        assets: {
          canvaAssets: [],
          damAssets: [],
        },
        selectedPage: [],
        publishedPlan: {
          publishingType: 'post_now',
          schedule: [],
        },
      },
      mailchimp: {
        description: '',
        assets: {
          canvaAssets: [],
          damAssets: [],
        },
        selectedPage: [],
        publishedPlan: {
          publishingType: 'post_now',
          schedule: [],
        },
      },
      google_my_business: {
        description: '',
        assets: {
          canvaAssets: [],
          damAssets: [],
        },
        selectedPage: [],
        publishedPlan: {
          publishingType: 'post_now',
          schedule: [],
        },
      },
      tumblr: {
        description: '',
        assets: {
          canvaAssets: [],
          damAssets: [],
        },
        selectedPage: [],
        publishedPlan: {
          publishingType: 'post_now',
          schedule: [],
        },
      },
      medium: {
        description: '',
        assets: {
          canvaAssets: [],
          damAssets: [],
        },
        selectedPage: [],
        publishedPlan: {
          publishingType: 'post_now',
          schedule: [],
        },
      },
      wordpress: {
        description: '',
        assets: {
          canvaAssets: [],
          damAssets: [],
        },
        selectedPage: [],
        publishedPlan: {
          publishingType: 'post_now',
          schedule: [],
        },
      },
      drupal: {
        description: '',
        assets: {
          canvaAssets: [],
          damAssets: [],
        },
        selectedPage: [],
        publishedPlan: {
          publishingType: 'post_now',
          schedule: [],
        },
      },
      google_ads: {
        description: '',
        assets: {
          canvaAssets: [],
          damAssets: [],
        },
        selectedPage: [],
        publishedPlan: {
          publishingType: 'post_now',
          schedule: [],
        },
        setupAds: {
          ads: {},
          campaign: {
            selectlocation: 'all',
            languages: { label: 'All Languages', value: 'all' },
          },
        },
      },
    },
  };

  dataContentDescriptionSocial = {
    advance_mode: true,
    list_channels: {
      social: {
        facebook: {
          description: '',
          assets: {
            canvaAssets: [],
            damAssets: [],
          },
          selectedPage: [],
          publishedPlan: {
            publishingType: 'post_now',
            schedule: [],
          },
        },
        instagram: {
          description: '',
          assets: {
            canvaAssets: [],
            damAssets: [],
          },
          selectedPage: [],
          publishedPlan: {
            publishingType: 'post_now',
            schedule: [],
          },
        },
        linkedin: {
          description: '',
          assets: {
            canvaAssets: [],
            damAssets: [],
          },
          selectedPage: [],
          publishedPlan: {
            publishingType: 'post_now',
            schedule: [],
          },
        },
        youtube: {
          description: '',
          assets: {
            videoAssets: [],
          },
          selectedPage: [],
          publishedPlan: {
            publishingType: 'post_now',
            schedule: [],
          },
        },
        google_my_business: {
          description: '',
          assets: {
            canvaAssets: [],
            damAssets: [],
          },
          selectedPage: [],
          publishedPlan: {
            publishingType: 'post_now',
            schedule: [],
          },
        },
        tumblr: {
          description: '',
          assets: {
            canvaAssets: [],
            damAssets: [],
          },
          selectedPage: [],
          publishedPlan: {
            publishingType: 'post_now',
            schedule: [],
          },
        },
        medium: {
          description: '',
          assets: {
            canvaAssets: [],
            damAssets: [],
          },
          selectedPage: [],
          publishedPlan: {
            publishingType: 'post_now',
            schedule: [],
          },
        },
        twitter: {
          description: '',
          assets: {
            canvaAssets: [],
            damAssets: [],
          },
          selectedPage: [],
          publishedPlan: {
            publishingType: 'post_now',
            schedule: [],
          },
        },
      },
      cms: {
        joomla: {
          description: '',
          assets: {
            canvaAssets: [],
            damAssets: [],
          },
          selectedPage: [],
          publishedPlan: {
            publishingType: 'post_now',
            schedule: [],
          },
        },
        wordpress: {
          description: '',
          assets: {
            canvaAssets: [],
            damAssets: [],
          },
          selectedPage: [],
          publishedPlan: {
            publishingType: 'post_now',
            schedule: [],
          },
        },
        drupal: {
          description: '',
          assets: {
            canvaAssets: [],
            damAssets: [],
          },
          selectedPage: [],
          publishedPlan: {
            publishingType: 'post_now',
            schedule: [],
          },
        },
      },
      mail: {
        mailchimp: {
          description: '',
          assets: {
            canvaAssets: [],
            damAssets: [],
          },
          selectedPage: [],
          publishedPlan: {
            publishingType: 'post_now',
            schedule: [],
          },
        },
      },
      ads: {
        fbad: {
          description: '',
          assets: {
            canvaAssets: [],
            damAssets: ['https://api.dev.R Digital/dam/139ebfdc3a2a490b689a0607d593a967.jpg'],
          },
          selectedPage: [],
          publishedPlan: {
            publishingType: 'post_now',
            schedule: [],
          },
          setupAds: {
            campaign: {
              special_ad_categories: 'NONE',
              status: 'ACTIVE',
            },
            ad_set: {
              billing_event: 'IMPRESSIONS',
              targeting: {
                geo_locations: {
                  countries: ['VN'],
                },
              },
              bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
              destination_type: 'WEBSITE',
            },
            ad_creative: {
              object_story_spec: {
                link_data: {
                  call_to_action: {
                    type: 'LEARN_MORE',
                  },
                  page_welcome_message: [
                    {
                      message: {
                        text: '',
                        quick_replies: [
                          {
                            content_type: 'text',
                            title: '',
                            payload: '',
                          },
                        ],
                      },
                    },
                  ],
                  link: 'fb.com',
                },
              },
            },
            ad: {
              status: 'ACTIVE',
            },
          },
        },
        google_ads: {
          description: '',
          assets: {
            canvaAssets: [],
            damAssets: [],
          },
          selectedPage: [],
          publishedPlan: {
            publishingType: 'post_now',
            schedule: [],
          },
          setupAds: {
            ads: {},
            campaign: {
              selectlocation: 'all',
              languages: { label: 'All Languages', value: 'all' },
            },
          },
        },
      },
    },
  };

  constructor(contentsStore) {
    makeAutoObservable(this);
    this.contentsStore = contentsStore;
  }

  setMulti = (multi) => {
    this.multi = multi;
  };

  openModal = () => {
    this.show = true;
  };

  closeModal = () => {
    this.show = false;
  };

  resetObservableProperties() {
    this.connectedChannels = null;
    this.isBackSaveData = false;
  }

  disableConnectSoMePage = (name, id) => {
    let getDataContentDescriptionConnectFBPage,
      getDataContentDescriptionConnectInstagramPage,
      getDataContentDescriptionConnectLIPage;

    switch (name) {
      case 'facebook':
        getDataContentDescriptionConnectFBPage = this.isAdvanceMode
          ? this.dataContentDescriptionSocial.list_channels.social.facebook.selectedPage
          : this.dataContentDescriptionSingle.list_channels.facebook.selectedPage;

        if (id) {
          const indexFB = getDataContentDescriptionConnectFBPage.includes(id);

          if (indexFB) {
            const getIdFB = getDataContentDescriptionConnectFBPage.indexOf(id);
            getDataContentDescriptionConnectFBPage.splice(getIdFB, 1);
          } else {
            getDataContentDescriptionConnectFBPage.push(id);
          }
        }
        break;
      case 'instagram':
        getDataContentDescriptionConnectInstagramPage = this.isAdvanceMode
          ? this.dataContentDescriptionSocial.list_channels.social.instagram.selectedPage
          : this.dataContentDescriptionSingle.list_channels.instagram.selectedPage;

        if (id) {
          const indexInstagram = getDataContentDescriptionConnectInstagramPage.includes(id);

          if (indexInstagram) {
            const getIdInstagram = getDataContentDescriptionConnectInstagramPage.indexOf(id);
            getDataContentDescriptionConnectInstagramPage.splice(getIdInstagram, 1);
          } else {
            getDataContentDescriptionConnectInstagramPage.push(id);
          }
        }
        break;
      case 'linkedin':
        getDataContentDescriptionConnectLIPage = this.isAdvanceMode
          ? this.dataContentDescriptionSocial.list_channels.social.linkedin.selectedPage
          : this.dataContentDescriptionSingle.list_channels.linkedin.selectedPage;

        if (id) {
          const indexLI = getDataContentDescriptionConnectLIPage.includes(id);

          if (indexLI) {
            const getIdLI = getDataContentDescriptionConnectLIPage.indexOf(id);
            getDataContentDescriptionConnectLIPage.splice(getIdLI, 1);
          } else {
            getDataContentDescriptionConnectLIPage.push(id);
          }
        }
        break;

      default:
    }
  };

  renderChannelByOrganizationID = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.contentsStore.getConnectedChannelsByOrganizationID(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander
    );
  };

  renderConnectedChannelByPersonaIds = (personaIds) => {
    this.contentsStore.getConnectedChannelByPersonaIds(
      this.callbackOnSuccessHandlerPersonaIds,
      this.callbackOnErrorHander,
      personaIds
    );
  };

  getSelectedIDs = () => {
    if (!this.getDataValueSelected) return null;
    const convertedInArray = this.getDataValueSelected
      .map((item) => {
        return item[PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR.VALUE];
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);

    let result = convertedInArray;

    return result;
  };

  getArrayConnectedChannelsFinal = () => {
    this.arrayConnectedChannelsFinal =
      this.getValueSelectedChannels.length > 0
        ? this.getValueSelectedChannels
        : this.connectedChannels;

    this.arrayConnectedChannelsFinal = Object.values(
      this.arrayConnectedChannelsFinal.reduce(
        (acc, cur) => Object.assign(acc, { [cur.des]: cur }),
        {}
      )
    );
  };

  handleBackSaveData = () => {
    this.isBackSaveData = true;
  };

  handleDeleteConnectChannel = (index) => {
    this.isDeleteConnectChannel = true;

    if (this.isBackSaveData) {
      if (this.isDeleteConnectChannel) {
        if (this.arrayConnectedChannelsFinalDelete.length >= 1) {
          this.arrayConnectedChannelsFinal = this.arrayConnectedChannelsFinalDelete;
          this.arrayConnectedChannelsFinal.splice(index, 1);
          this.arrayConnectedChannelsFinal = [...this.arrayConnectedChannelsFinal];
        } else {
          this.arrayConnectedChannelsFinal.splice(index, 1);
          this.arrayConnectedChannelsFinal = [...this.arrayConnectedChannelsFinal];
          this.arrayConnectedChannelsFinalDelete = [...this.arrayConnectedChannelsFinal];
        }
      }
    } else {
      if (this.isDeleteConnectChannel) {
        this.arrayConnectedChannelsFinal.splice(index, 1);
        this.arrayConnectedChannelsFinal = [...this.arrayConnectedChannelsFinal];
        this.arrayConnectedChannelsFinalDelete = [...this.arrayConnectedChannelsFinal];
      }
    }
  };

  getDataWhenBackGeneral = () => {
    if (this.isBackSaveData && this.isDeleteConnectChannel) {
      this.arrayConnectedChannelsFinal = this.arrayConnectedChannelsFinalDelete;
    }
  };

  callbackOnErrorHander = () => {
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (contentConnectedChannelsModel) => {
    const resultInModel = contentConnectedChannelsModel ? contentConnectedChannelsModel : null;
    this.connectedChannels = resultInModel
      ? resultInModel.toListConnectedChannelsOnContentForm()
      : null;

    this.formStatus = PAGE_STATUS.READY;
    this.getArrayConnectedChannelsFinal();
  };

  callbackOnSuccessHandlerPersonaIds = (contentConnectedChannelsModel) => {
    const resultInModel = contentConnectedChannelsModel ? contentConnectedChannelsModel : null;

    this.getValueSelectedChannels = resultInModel
      ? resultInModel.toListConnectedChannelsOnContentForm()
      : null;
    this.formStatus = PAGE_STATUS.READY;
    this.getArrayConnectedChannelsFinal();
  };

  handleAdvanceMode = () => {
    this.isAdvanceMode = !this.isAdvanceMode;
  };

  getDataContent = (type, channel, isAdvanceMode) => {
    if (isAdvanceMode) {
      return this.dataContentDescriptionSocial.list_channels?.[type]?.[channel];
    } else {
      return this.dataContentDescriptionSingle.list_channels?.[channel];
    }
  };
}

export default ContentConnectedChannelsByOrganisationViewModel;
