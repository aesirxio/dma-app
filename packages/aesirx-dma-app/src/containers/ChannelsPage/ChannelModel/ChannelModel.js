/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import {
  CHANNEL_FIELD_KEY,
  CHANNEL_TYPE_FIELD_KEY,
  CHANNEL_CATEGORY_FIELD_KEY,
  CHANNEL_REQUIREMENT_FIELD_KEY
} from '../../../constants/ChannelModule';

class ChannelCategoryModel {
  constructor(data) {
    this.id = data[CHANNEL_CATEGORY_FIELD_KEY.ID] ?? 0;
    this.name = data[CHANNEL_CATEGORY_FIELD_KEY.NAME] ?? '';
    this.list =
      data[CHANNEL_CATEGORY_FIELD_KEY.LIST]?.map((item) => new ChannelTypeModel(item)) ?? [];
  }

  getList = () => this.list.map((item) => new ChannelTypeModel(item));
}

class ChannelTypeModel {
  constructor(data) {
    this.id = data[CHANNEL_TYPE_FIELD_KEY.ID] ?? 0;
    this.name = data[CHANNEL_TYPE_FIELD_KEY.NAME] ?? '';
    this.image = data[CHANNEL_TYPE_FIELD_KEY.IMAGE] ?? '';
    this.pages = data[CHANNEL_TYPE_FIELD_KEY.PAGES]?.map((item) => new ChannelModel(item)) ?? [];
    this.status = data[CHANNEL_TYPE_FIELD_KEY.STATUS] ?? 100;
    this.requirements = data[CHANNEL_TYPE_FIELD_KEY.REQUIREMENTS] ? new ChannelRequirementModel(data[CHANNEL_TYPE_FIELD_KEY.REQUIREMENTS]) : null;
  }

  getPages = () => this.pages.map((item) => new ChannelModel(item));
}

class ChannelModel {
  constructor(data) {
    this.id = data[CHANNEL_FIELD_KEY.ID] ?? 0;
    this.name = data[CHANNEL_FIELD_KEY.NAME] ?? '';
    this.type = data[CHANNEL_FIELD_KEY.TYPE] ?? '';
    this.groupType = data[CHANNEL_FIELD_KEY.GROUP_TYPE] ?? '';
    this.avatar = data[CHANNEL_FIELD_KEY.AVATAR] ?? '';
    this.connected = data[CHANNEL_FIELD_KEY.CONNECTED] ?? false;
    this.channelTypeName = data[CHANNEL_FIELD_KEY.CHANNEL_TYPE] ?? '';
    this.expired_token_time = data[CHANNEL_FIELD_KEY.EXPIRED_TOKEN_TIME] ?? '';
  }

  toDropdownSelectionItem = () => ({
    value: this.id,
    label: this.name,
    avatar: this.avatar,
    connected: this.connected,
  });
}

class ChannelRequirementModel {
  constructor(data) {
    this.description = data[CHANNEL_REQUIREMENT_FIELD_KEY.DESCRIPTION] ?? 0;
    this.disableHeadline = data[CHANNEL_REQUIREMENT_FIELD_KEY.DISABLE_HEADLINE] ?? false;
    this.hashtag = data[CHANNEL_REQUIREMENT_FIELD_KEY.HASHTAG] ?? 0;
    this.headline = data[CHANNEL_REQUIREMENT_FIELD_KEY.HEADLINE] ?? 0;
    this.image = data[CHANNEL_REQUIREMENT_FIELD_KEY.IMAGE] ?? false;
    this.media = data[CHANNEL_REQUIREMENT_FIELD_KEY.MEDIA] ?? false;
    this.video = data[CHANNEL_REQUIREMENT_FIELD_KEY.VIDEO] ?? false;
  }
}

export { ChannelModel, ChannelTypeModel, ChannelCategoryModel };
