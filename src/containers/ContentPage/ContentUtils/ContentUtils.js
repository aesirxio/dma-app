/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import { CONTENT_FIELD_KEY, CONTENT_DESCRIPTION_MODE } from '../../../constants/ContentModule';
import ContentModel from '../ContentModel/ContentModel';

class ContentUtils {
  constructor() {
    if (!ContentUtils.instance) {
      ContentUtils.instance = this;
    }

    return ContentUtils.instance;
  }

  transformContentResponseIntoModel = (response, categoryId = 0) => {
    return Object.keys(response)
      .map((index) => {
        return [...Array(response[index])].map((item) => {
          item.categoryId = categoryId;
          return new ContentModel(item);
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  transformContentModelIntoTableDataRow = (contentModels) => {
    return contentModels
      .map((item) => {
        return item.toTableRowData();
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  };

  hasAdvertising = (channelsData) => channelsData.some((group) => group.id === 'advertising');

  hasAdvertisingAds = (channelsData, channelType) =>
    channelsData.some(
      (group) => group.id === 'advertising' && group.list.some((item) => item.id === channelType)
    );

  setDataForChannels = (key, value, mode, formPropsData, channelTypeIds = []) => {
    const channelsData = formPropsData[CONTENT_FIELD_KEY.CHANNELS];
    if (mode === CONTENT_DESCRIPTION_MODE.BASIC) {
      let data = {};

      channelsData.forEach(({ list }) => {
        list.forEach(({ id }) => {
          data[id] = value;
        });
      });

      formPropsData[key] = data;
    } else if (mode === CONTENT_DESCRIPTION_MODE.ADVANCE) {
      if (channelTypeIds.length > 0) {
        channelTypeIds.forEach((channelType) => (formPropsData[key][channelType] = value));
      }
    }

  };

  getListSelectChannel = (contentData, channelMasterData, personaKey = false) => {
    const channelsData = !personaKey && contentData.getChannels();
    const selectedPage = !personaKey
      ? Object.keys(channelsData)
          .map((key) => channelsData[key].selectedPage.map(({ pageId }) => pageId))
          .reduce((arr, el) => [...arr, ...el], [])
      : contentData;

    return channelMasterData
      .map((category) => ({
        ...category,
        ...{
          list: category.list
            .map((channelType) => ({
              ...channelType,
              ...{
                pages: channelType.pages.map((channel) => {
                  if (!selectedPage.includes(channel.id)) {
                    channel.removed = true;
                  }

                  return channel;
                }),
              },
            }))
            .filter(({ pages }) => pages.length > 0),
        },
      }))
      .filter(({ list }) => list.some(({ pages }) => pages.length > 0)); // Remove Category has Pages empty list
  };

  hasMediaChannel = (channelsData) => {
    let data = {
      video: false,
      dam: true,
    };

    const groupSocical = channelsData
      .filter(({ id }) => id === 'social_media')
      .reduce((arr, el) => [...arr, ...el.list], []);

    if (groupSocical.filter(({ id }) => id === 'youtube').length > 0) {
      data.video = true;

      // Only Youtube Video
      if (groupSocical.length === 1) {
        data.dam = false;
      }
    }

    // Only advertising
    const groups = channelsData.map(({ id }) => id).reduce((arr, el) => [...arr, el], []);

    if (groups.length === 1 && groups.includes('advertising')) {
      data = {
        video: false,
        dam: false,
      };
    }

    return data;
  };

  getValueFromSelection = (data) => {
    if (data) {
      if (Array.isArray(data)) {
        return data.map((item) => item.value);
      } else {
        return [data.value];
      }
    }

    return '';
  };

  getPageDetail = (pageId, channeData) => {
    let data = [];
    channeData.forEach((category) => {
      // Skip the category
      data = [
        ...data,
        ...category.getList().map((channelType) => ({
          alias: channelType.id,
          label: channelType.name,
          image: channelType.image,
          options: channelType
            .getPages()
            .filter(({ id }) => pageId.includes(id))
            .map((channel) => channel.toDropdownSelectionItem()),
        })),
      ].filter((option) => option.options.length > 0);
    });

    return data;
  };
}

const instance = new ContentUtils();
Object.freeze(instance);

export default instance;
