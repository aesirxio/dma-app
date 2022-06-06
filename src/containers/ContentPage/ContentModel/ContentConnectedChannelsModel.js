/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { default as BaseModel } from '../../../store/Models/Abstract/BaseModel';
import BaseItemModel from '../../../store/Models/Abstract/BaseItemModel';
import {
  ESI_ORGANIZATION_CHANNEL_API_FIELD_KEY,
  ESI_ORGANIZATION_CHANNEL_FIELD_KEY,
} from '../../../constants/OrganizationChannelsModule';

class ContentConnectedChannelsModel extends BaseModel {
  items = [];
  unTransformedItems = [];
  constructor(entities) {
    super(entities);
    if (entities) {
      const organizationChannels = entities;
      this.unTransformedItems = organizationChannels;
      this.items = organizationChannels.map((element) => {
        return new ContentConnectedChannelItemModel(element);
      });
    }
  }

  toListConnectedChannelsOnContentForm = () => {
    if (!this.items) return null;
    return this.items.map((element) => {
      return element ? element.toConnectedChannelItemOnContentForm() : null;
    });
  };
}

class ContentConnectedChannelItemModel extends BaseItemModel {
  channelId = null;
  channelName = '';

  constructor(entity) {
    super(entity);
    if (entity) {
      this.channelId = entity[ESI_ORGANIZATION_CHANNEL_API_FIELD_KEY.ID] ?? [0];
      this.channelName = entity[ESI_ORGANIZATION_CHANNEL_API_FIELD_KEY.CHANNEL_NAME] ?? '';
    }
  }

  getChannelId = () => {
    return this.channelId;
  };

  toConnectedChannelItemOnContentForm = () => {
    let icoImage = null;
    switch (this.channelName.toLowerCase()) {
      case 'facebook':
        icoImage = '/assets/images/facebook.png';
        break;
      case 'fbad':
        icoImage = '/assets/images/fbad.png';
        break;
      case 'youtube':
        icoImage = '/assets/images/youtube.png';
        break;
      case 'twitter':
        icoImage = '/assets/images/twitter.png';
        break;
      case 'linkedin':
        icoImage = '/assets/images/linkedin.png';
        break;
      case 'mailchimp':
        icoImage = '/assets/images/mailchimp.png';
        break;
      case 'wordpress':
        icoImage = '/assets/images/wordpress.png';
        break;
      case 'instagram':
        icoImage = '/assets/images/instagram.png';
        break;
      case 'joomla':
        icoImage = '/assets/images/joomla.png';
        break;
      case 'medium':
        icoImage = '/assets/images/medium.png';
        break;
      case 'tumblr':
        icoImage = '/assets/images/tumblr.png';
        break;
      case 'google_ads':
        icoImage = '/assets/images/google_ads.png';
        break;
      case 'google_my_business':
        icoImage = '/assets/images/google_my_business.png';
        break;
      case 'drupal':
        icoImage = '/assets/images/drupal.png';
        break;
      default:
        icoImage = null;
    }
    return {
      images: icoImage,
      des: this.channelName,
    };
  };

  toObject = () => {
    return {
      [ESI_ORGANIZATION_CHANNEL_FIELD_KEY.ID]: this.channelId,
      [ESI_ORGANIZATION_CHANNEL_FIELD_KEY.CHANNEL_NAME]: this.channelName,
    };
  };
}

export { ContentConnectedChannelsModel, ContentConnectedChannelItemModel };
