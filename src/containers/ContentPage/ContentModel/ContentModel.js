/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import FIELD_TYPE from '../../../constants/FieldType';

import {
  CONTENT_FIELD_KEY,
  CONTENT_POST_TYPE,
  CONTENT_PUBLISH_MODE,
  ESI_CONTENT_API_RESPONSE_FIELD_KEY,
} from '../../../constants/ContentModule';

import { format } from 'date-fns';
import Helper from '../../../utils/helper';

import { CHANNEL_ADS_GOOGLE, CHANNEL_ADS_FACEBOOK } from '../../../constants/ChannelModule';
import ContentGoogleAdsModel from './ContentGoogleAdsModel';
import ContentAdsModel from './ContentAdsModel';

import ContentFacebookAdsModel from './ContentFacebookAdsModel';
import { formatDate } from '../../../utils/date';
import ContentUtils from '../ContentUtils/ContentUtils';

class ContentModel {
  channels = [];
  constructor(data) {
    const dataParse = Helper.isJson(data?.data) ? JSON.parse(data?.data) : data?.data;

    if (dataParse) {
      this.id = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.ID] ?? 0;
      this.categoryId = data.categoryId;

      this.name = dataParse?.general[ESI_CONTENT_API_RESPONSE_FIELD_KEY.HEADLINE] ?? '';

      this.project = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.PROJECT]
        ? JSON.parse(data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.PROJECT])
        : [];

      this.campaign = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.CAMPAIGN]
        ? JSON.parse(data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.CAMPAIGN])
        : [];

      this.persona = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.PERSONA]
        ? JSON.parse(data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.PERSONA])
        : [];

      this.channel_type = data?.[ESI_CONTENT_API_RESPONSE_FIELD_KEY.CHANNEL_TYPE] ?? '';
      this.picture = data?.picture ?? '';
      this.status = data?.[ESI_CONTENT_API_RESPONSE_FIELD_KEY.STATUS]
        ? JSON.parse(data?.[ESI_CONTENT_API_RESPONSE_FIELD_KEY.STATUS])
        : '';

      this.channels = dataParse[ESI_CONTENT_API_RESPONSE_FIELD_KEY.CHANNELS] ?? [];
      this.mode = dataParse?.general[ESI_CONTENT_API_RESPONSE_FIELD_KEY.MODE] ?? '';
      this.createDate = data?.created_date ?? '';
      this.createdAt = data?.created_at ?? '';
      this.channel_name = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.CHANNEL_NAME] ?? '';
      this.items = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.ITEMS] ?? [];
      this.entity = data[ESI_CONTENT_API_RESPONSE_FIELD_KEY.ENTITY] ?? 'category';
    }
  }

  getName = () => {
    return {
      value: this.name,
      type: FIELD_TYPE.TEXT,
      columnName: CONTENT_FIELD_KEY.NAME,
      columnText: 'Name',
    };
  };

  getProject = (projectMasterData) => {
    return projectMasterData
      ? projectMasterData.filter((option) => this.project?.includes(option.value))
      : '';
  };

  getCampaign = (campaignMasterData) => {
    return campaignMasterData
      ? campaignMasterData.filter((option) => this.campaign?.includes(option.value))
      : '';
  };

  getPersona = (personaMasterData) => {
    // Helper.isJson(this.persona) ? JSON.parse(this.persona) : this.persona
    return personaMasterData
      ? personaMasterData.filter((option) => this.persona?.includes(option.value))
      : '';
  };

  getDescription = () => {
    let description = {};

    Object.keys(this.channels).forEach(
      (key) => (description[key] = this.channels[key].description)
    );

    return description;
  };

  getCanvaAssets = () => {
    let canvaAssets = {};

    Object.keys(this.channels).forEach(
      (key) => (canvaAssets[key] = this.channels[key].assets.canvaAssets)
    );

    return canvaAssets;
  };

  getDamAssets = () => {
    let damAssets = {};

    Object.keys(this.channels).forEach(
      (key) => (damAssets[key] = this.channels[key].assets.damAssets)
    );

    return damAssets;
  };

  getChannelType = () => {
    return {
      value: this.channel_type ? this.channel_type : '',
      type: FIELD_TYPE.TEXT,
      columnName: CONTENT_FIELD_KEY.CHANNELS,
      columnText: 'Channels',
    };
  };

  getChannelPicture = () => {
    return {
      value: this.picture ? this.picture : '',
      type: FIELD_TYPE.TEXT,
      columnName: CONTENT_FIELD_KEY.CHANNELS,
      columnText: 'Channels',
    };
  };

  getStatus = () => {
    if (this.publishingType === CONTENT_POST_TYPE.DRAFT) {
      return this.publishingType;
    } else {
      return this.status;
    }
  };

  getChannels = () => (this.channels ? this.channels : []);

  getChannelName = () => {
    return {
      value: this.channel_name ? this.channel_name : '',
      type: FIELD_TYPE.TEXT,
      columnName: CONTENT_FIELD_KEY.CHANNELS,
      columnText: 'Channels',
    };
  };

  getMode = () => this.mode;

  getPublishType = () => {
    let publishType = {};

    Object.keys(this.channels).forEach(
      (key) => (publishType[key] = this.channels[key]?.publishedPlan?.publishingType)
    );

    return publishType;
  };

  convertDateTime = (date, time = null) => {
    if (!date) return undefined;
    const [year, month, day] = date.split('-');
    if (time) {
      const [hour, minute] = time.split(':');
      return new Date(year, month -1, day, hour, minute);
    }
    return new Date(year, month -1, day);
  };

  getPublishDate = () => {
    const f = Object.keys(this.channels)[0];
    console.log(this.convertDateTime(this.channels[f]?.publishedPlan?.schedule[0]?.date));
    return this.convertDateTime(this.channels[f]?.publishedPlan?.schedule[0]?.date);
  };

  getPublishTime = () => {
    const f = Object.keys(this.channels)[0];

    return this.convertDateTime(
      this.channels[f]?.publishedPlan?.schedule[0]?.date,
      this.channels[f]?.publishedPlan?.schedule[0]?.time
    );
  };
  
  getDate = () => {
    if (this.entity === 'category') {
      return formatDate(this.createDate, true);
    } else if (this.entity === 'item') {
      if (this.getStatus() === 'schedule') {
        return formatDate(this.getPublishTime(), true);
      } else {
        return formatDate(this.createDate, true);
      }
    } else {
      return '';
    }
  };

  getAds = () => {
    const result = {
      [CHANNEL_ADS_FACEBOOK]: new ContentFacebookAdsModel(
        this.channels[CHANNEL_ADS_FACEBOOK]?.setupAds
      ).getDataAds(),
      [CHANNEL_ADS_GOOGLE]: new ContentGoogleAdsModel(
        this.channels[CHANNEL_ADS_GOOGLE]?.setupAds
      ).getDataAds(),
    };

    return result;
  };

  getPageChannels = () => {
    const pageIds = Object.keys(this.channels)
      .map((key) => this.channels[key].selectedPage)
      .reduce((arr, el) => [...arr, ...el], [])
      .map(({ pageId }) => pageId);

    return pageIds;
  };

  toTableRowData = () => {
    return {
      categoryId: this.categoryId,
      [CONTENT_FIELD_KEY.ID]: this.id,
      [CONTENT_FIELD_KEY.NAME]: this.name,
      [CONTENT_FIELD_KEY.CHANNELS]: this.getPageChannels(),
      [CONTENT_FIELD_KEY.DATE]: this.getDate(),
      [CONTENT_FIELD_KEY.STATUS]: this.getStatus(),
      [CONTENT_FIELD_KEY.ENTITY]: this.entity,
      [CONTENT_FIELD_KEY.MODE]: this.mode,
    };
  };

  static convertSubmittedDataToAPIService(contentData, channelMasterData) {
    const general = contentData
      ? {
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.ID]: contentData[CONTENT_FIELD_KEY.ID] ?? 0,
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.HEADLINE]: contentData[CONTENT_FIELD_KEY.NAME],
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.MODE]: contentData[CONTENT_FIELD_KEY.MODE],

          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.PROJECT]: ContentUtils.getValueFromSelection(
            contentData[CONTENT_FIELD_KEY.PROJECT]
          ),
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CAMPAIGN]: ContentUtils.getValueFromSelection(
            contentData[CONTENT_FIELD_KEY.CAMPAIGN]
          ),
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.PERSONA]: ContentUtils.getValueFromSelection(
            contentData[CONTENT_FIELD_KEY.PERSONA]
          ),
        }
      : null;

    // channels
    let channels = {};

    channelMasterData.forEach(({ list }) => {
      list.forEach(({ id, pages }) => {
        // selectedPage
        const _id = id;
        let selectedPage = [];
        if (contentData?.items.length > 0) {
          selectedPage = contentData.items
            .map(
              ({ id, data }) =>
                JSON.parse(data)?.channels[_id] && {
                  pageId: JSON.parse(data)?.channels[_id]?.selectedPage[0].pageId,
                  contentId: id,
                }
            )
            .filter((item) => item)
            .reduce((acc, current) => {
              const x = acc.find((item) => item.pageId === current.pageId);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
        } else {
          selectedPage = pages
            .filter(({ removed }) => !removed)
            .map(({ id }) => ({ pageId: id, contentId: 0 }));
        }
        if (selectedPage.length > 0) {
          // channels
          const description = contentData[CONTENT_FIELD_KEY.DESCRIPTION][id];
          const canvaAssets = contentData[CONTENT_FIELD_KEY.CANVA][id];

          // DAM
          const damData = contentData[CONTENT_FIELD_KEY.DAM][id];
          const damAssets = damData.filter((data) => !['mp4', 'mov'].includes(data.extension));
          const videoAssets = damData.filter((data) => ['mp4', 'mov'].includes(data.extension));

          // Publish
          const publishDate = contentData[CONTENT_FIELD_KEY.PUBLISH_DATE][id];
          const publishTime = contentData[CONTENT_FIELD_KEY.TIME][id];
          const publishMode = contentData[CONTENT_FIELD_KEY.PUBLISH_MODE][id];
          
          // Ads
          const setupAds = ContentAdsModel.convertSubmittedDataToAPIService(
            contentData[CONTENT_FIELD_KEY.ADS],
            id
          );

          channels = {
            ...channels,
            ...{
              [id]: {
                description: description,
                assets: {
                  canvaAssets: canvaAssets,
                  damAssets: damAssets,
                  videoAssets: videoAssets,
                },
                selectedPage: selectedPage,
                publishedPlan: {
                  publishingType: publishMode,
                  schedule:
                    publishMode === CONTENT_PUBLISH_MODE.SCHEDULE
                      ? [
                          {
                            date: format(publishDate, 'yyyy-MM-dd'),
                            time: format(publishTime, 'HH:mm'),
                            timezone: Helper.getTimezoneDefault(),
                          },
                        ]
                      : [],
                },

                setupAds: setupAds,
              },
            },
          };
        }
      });
    });

    const result = {
      [ESI_CONTENT_API_RESPONSE_FIELD_KEY.GENERAL]: general,
      [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CHANNELS]: channels,
    };

    return JSON.stringify(result);
  }

  static convertSubmittedIntegrationDataToAPIService(
    contentData,
    channelMasterData,
    channel,
    pageId
  ) {
    const general = contentData
      ? {
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.ID]: contentData[CONTENT_FIELD_KEY.ID] ?? 0,
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.HEADLINE]: contentData[CONTENT_FIELD_KEY.NAME],
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.MODE]: contentData[CONTENT_FIELD_KEY.MODE],

          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.PROJECT]: ContentUtils.getValueFromSelection(
            contentData[CONTENT_FIELD_KEY.PROJECT]
          ),
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CAMPAIGN]: ContentUtils.getValueFromSelection(
            contentData[CONTENT_FIELD_KEY.CAMPAIGN]
          ),
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.PERSONA]: ContentUtils.getValueFromSelection(
            contentData[CONTENT_FIELD_KEY.PERSONA]
          ),
        }
      : null;

    // channels
    let channels = {};
    let selectedPage = [];
    channelMasterData.forEach(({ list }) => {
      list.forEach(({ id, pages }) => {
        // selectedPage
        if (id === channel) {
          pages.forEach((page) => {
            if (page.id === pageId) {
              selectedPage = [{ pageId: id, contentId: 0 }];
            }
          });
        }
      });
    });
    // channels
    const description = contentData[CONTENT_FIELD_KEY.DESCRIPTION];
    const canvaAssets = contentData[CONTENT_FIELD_KEY.CANVA][channel];

    // DAM
    const damData = contentData[CONTENT_FIELD_KEY.DAM];
    const damAssets = damData.filter((data) => !['mp4', 'mov'].includes(data.extension));
    const videoAssets = damData.filter((data) => ['mp4', 'mov'].includes(data.extension));

    // Publish
    const publishDate = contentData[CONTENT_FIELD_KEY.PUBLISH_DATE];
    const publishTime = contentData[CONTENT_FIELD_KEY.TIME];
    const publishMode = contentData[CONTENT_FIELD_KEY.PUBLISH_MODE];

    // Ads
    const setupAds = ContentAdsModel.convertSubmittedDataToAPIService(
      contentData[CONTENT_FIELD_KEY.ADS],
      channel
    );

    channels = {
      ...{
        [channel]: {
          description: description,
          assets: {
            canvaAssets: canvaAssets,
            damAssets: damAssets,
            videoAssets: videoAssets,
          },
          selectedPage: selectedPage,
          publishedPlan: {
            publishingType: publishMode,
            schedule:
              publishMode === CONTENT_PUBLISH_MODE.SCHEDULE
                ? [
                    {
                      date: format(publishDate, 'dd-MM-yyyy'),
                      time: format(publishTime, 'HH:mm'),
                      timezone: Helper.getTimezoneDefault(),
                    },
                  ]
                : [],
          },

          setupAds: setupAds,
        },
      },
    };

    const result = {
      [ESI_CONTENT_API_RESPONSE_FIELD_KEY.GENERAL]: general,
      [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CHANNELS]: channels,
    };

    return JSON.stringify(result);
  }
}

export default ContentModel;
