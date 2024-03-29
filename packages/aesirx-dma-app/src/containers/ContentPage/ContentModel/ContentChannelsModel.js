/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import FIELD_TYPE from '../../../constants/FieldType';

import {
  CONTENT_FIELD_KEY,
  ESI_CONTENT_API_RESPONSE_FIELD_KEY,
} from '../../../constants/ContentModule';

import getStatus from '../../../utils/status';

class ContentChannelsModel {
  constructor(data) {
    const dataParse = JSON.parse(data.data);
    this.id = dataParse.general[ESI_CONTENT_API_RESPONSE_FIELD_KEY.ID] ?? 0;
    this.name = dataParse.general[ESI_CONTENT_API_RESPONSE_FIELD_KEY.HEADLINE] ?? '';
    this.status = data.status ?? '';
    this.channels = data.channel_type ?? '';
    this.link_post = dataParse.general[ESI_CONTENT_API_RESPONSE_FIELD_KEY.LINK_POST] ?? '';
    this.campaign = dataParse.general[ESI_CONTENT_API_RESPONSE_FIELD_KEY.CAMPAIGN] ?? '';
  }

  getId = () => {
    return {
      value: this.id,
      type: FIELD_TYPE.READONLY,
      columnName: CONTENT_FIELD_KEY.ID,
      columnText: 'ID',
    };
  };

  getName = () => {
    return {
      value: this.name,
      type: FIELD_TYPE.TEXT,
      columnName: CONTENT_FIELD_KEY.NAME,
      columnText: 'Name',
    };
  };

  getStatus = () => {
    return {
      value: getStatus(this.status),
      type: FIELD_TYPE.TEXT,
      columnName: CONTENT_FIELD_KEY.STATUS,
      columnText: 'Status',
    };
  };

  getChannels = () => {
    return {
      value: this.channel,
      type: FIELD_TYPE.TEXT,
      columnName: CONTENT_FIELD_KEY.CHANNELS,
      columnText: 'Channels',
    };
  };
  getLinks = () => {
    return {
      value: this.link_post,
      type: FIELD_TYPE.TEXT,
      columnName: CONTENT_FIELD_KEY.LINK_POST,
      columnText: 'Link',
    };
  };
  getCampaigns = () => {
    return {
      value: this.campaign,
      type: FIELD_TYPE.TEXT,
      columnName: CONTENT_FIELD_KEY.CAMPAIGN,
      columnText: 'campaign',
    };
  };

  toTableRowData = () => {
    const id = this.getId();
    const name = this.getName();
    const status = this.getStatus();
    const channels = this.getChannels();
    const links = this.getLinks();

    return {
      [id.columnName]: id.value,
      [name.columnName]: name.value,
      [status.columnName]: status.value,
      [channels.columnName]: channels.value,
      [links.columnName]: links.value,
    };
  };

  static convertSubmittedDataToAPIService(contentData) {
    const contentId = contentData[CONTENT_FIELD_KEY.ID] ? contentData[CONTENT_FIELD_KEY.ID] : 0;
    // hard code "1" as project-id for demo purpose
    const result = contentData
      ? {
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.ID]: contentId,
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.PROJECT]: 1,
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CAMPAIGN]: contentData[CONTENT_FIELD_KEY.CAMPAIGN],
          [ESI_CONTENT_API_RESPONSE_FIELD_KEY.PERSONA]: JSON.stringify(
            contentData[CONTENT_FIELD_KEY.PERSONA]
          ),
          // [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CONTENT_TO_POST]: {
          //   [ESI_CONTENT_API_RESPONSE_FIELD_KEY.HEADLINE]: contentData[CONTENT_FIELD_KEY.NAME],
          //   [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CANVA_EXPORTED_URL]:
          //     contentData[CONTENT_FIELD_KEY.CANVA_EXPORTED_URL],
          //   [ESI_CONTENT_API_RESPONSE_FIELD_KEY.CANVA_DESIGN_ID]:
          //     contentData[CONTENT_FIELD_KEY.CANVA_DESIGN_ID],
          // },
        }
      : null;
    return result;
  }
}

export default ContentChannelsModel;
