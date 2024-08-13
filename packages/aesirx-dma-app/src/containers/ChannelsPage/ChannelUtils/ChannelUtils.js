/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { CHANNEL_CMS_FIELD_KEY, CHANNEL_FIELD_KEY } from '../../../constants/ChannelModule';
import { ChannelCategoryModel } from '../ChannelModel/ChannelModel';
import { fromUnixTime } from 'date-fns';

class ChannelUtils {
  transformChannelResponseIntoModel = (response) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          return new ChannelCategoryModel(item);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  connectedChannelGroupOptions = (data) => {
    let options = [];

    if (!data) {
      return options;
    }

    data.forEach((category) => {
      // Skip the category
      options = [
        ...options,
        ...category.getList().map((channelType) => ({
          alias: channelType.id,
          label: channelType.name,
          image: channelType.image,
          group: category.id,
          options: channelType
            .getPages()
            .filter(
              ({ connected, expired_token_time }) =>
                connected & this.checkTokenExpired(expired_token_time)
            )
            .map((channel) => channel.toDropdownSelectionItem()),
        })),
      ].filter((option) => option.options.length > 0);
    });

    return options;
  };

  getChannelByFilter(data, filter, operator = '') {
    if (!data) {
      return [];
    }

    const channels = data
      .map((category) => ({
        ...category,
        ...{
          list: category.list
            .map((channelType) => ({
              ...channelType,
              ...{
                pages: channelType.pages.filter(
                  (channel) =>
                    this.checkTokenExpired(channel[CHANNEL_FIELD_KEY.EXPIRED_TOKEN_TIME]) &&
                    (operator === 'not' ? !channel[filter] : channel[filter])
                ),
              },
            }))
            .filter(({ pages }) => pages.length > 0),
        },
      }))
      .filter(({ list }) => list.some(({ pages }) => pages.length > 0)); // Remove Category has Pages empty list

    return channels;
  }

  convertSubmittedDataToAPIService(data, channelType) {
    if (!data) {
      return null;
    }
    const result = {
      [CHANNEL_CMS_FIELD_KEY.ENDPOINT]: data.endpoint_url ?? null,
      [CHANNEL_CMS_FIELD_KEY.USERNAME]: data.username ?? null,
      [CHANNEL_CMS_FIELD_KEY.PASSWORD]: data.password ?? null,
      [CHANNEL_CMS_FIELD_KEY.TOKEN]: data?.token ?? null,
      [CHANNEL_CMS_FIELD_KEY.CHANNEL_TYPE]: channelType?.id ?? null,
      [CHANNEL_CMS_FIELD_KEY.BOT_USERNAME]: data.bot_username ?? null,
      [CHANNEL_CMS_FIELD_KEY.BOT_TOKEN]: data.bot_token ?? null,
      [CHANNEL_CMS_FIELD_KEY.CHAT_IDS]: data.chat_ids ?? null,
      [CHANNEL_CMS_FIELD_KEY.BLOG]: data.blog ?? null,
    };

    return result;
  }

  checkTokenExpired = (timestamp) => {
    if (!timestamp) {
      return true;
    }

    const a = new Date();
    const b = fromUnixTime(timestamp);

    if (a > b) {
      return false;
    }

    return true;
  };

  getChannelDetailById = (channelIds, channelData) => {
    let listChannelDetail = [];

    channelData.forEach((category) => {
      listChannelDetail = [
        ...listChannelDetail,
        ...category.getList().map((channelType) =>
          channelType
            .getPages()
            .filter(({ id }) => channelIds.includes(id))
            .map((channel) => channel.toDropdownSelectionItem())
        ),
      ].filter((option) => option.length > 0);
    });

    return listChannelDetail.flat(1);
  };
}

const utils = new ChannelUtils();

export default utils;
