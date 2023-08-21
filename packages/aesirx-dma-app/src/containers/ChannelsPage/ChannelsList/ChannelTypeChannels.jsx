/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext, useState } from 'react';

import { observer } from 'mobx-react';

import ChannelTypeChannelsAction from './ChannelTypeChannelsAction';
import { ChannelsViewModelContext } from '../ChannelsViewModels/ChannelsViewModelContextProvider';

import { Helper } from 'aesirx-lib';
import { Image as ComponentImage } from 'aesirx-uikit';
import ChannelTypeChannelToken from './ChannelTypeChannelToken';
import ChannelTypeChannelsEnable from './ChannelTypeChannelsEnable';
import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';

const ChannelTypeChannels = observer(({ channelType }) => {
  const context = useContext(ChannelsViewModelContext);

  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const pages = channelType.getPages();

  if (pages.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center m-2">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleRemoveChannel = async (channel) => {
    if (Helper.confirmDeleteItem()) {
      setLoading(true);
      await context.getChannelsListViewModel().actions('removeChannel', channelType, channel);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-1 mb-4 border-bottom"> </div>
      <div className="list_content ms-3 me-3">
        <div className="py-2 px-3 d-flex rounded-2 border-bottom ">
          <div className="col col-md-4">{t('txt_name_personas')}</div>
          <div className="col-2 d-none d-md-block">{t('txt_type')}</div>
          {channelType.id === 'linkedin_group' && (
            <div className="col-1 d-none d-md-block">{t('txt_group_type')}</div>
          )}
          <div
            className={channelType.id === 'linkedin_group' ? 'col-3' : 'col-4 d-none d-md-block'}
          >
            {t('txt_status')}
          </div>
          <div className="col-md-1 text-center">{t('txt_enable')}</div>
          <div className="col-md-1 pe-4">{t('txt_action')}</div>
        </div>

        {pages.map((channel, index) => (
          <div
            className={`p-3 d-flex align-items-center ${index ? 'border-top-1' : ''}`}
            key={Math.random(40, 200)}
          >
            <div className="col col-md-4">
              <div className="d-flex align-items-center">
                <ComponentImage
                  width={40}
                  hieght={40}
                  placeholderSrc={'/assets/images/default_channel_image.png'}
                  className="img-avatar rounded"
                  src={
                    channel.avatar
                      ? channel.avatar
                      : `/assets/images/${channel.channelTypeName}.png`
                  }
                  alt={channel.name}
                />
                <span className="ms-2">{channel.name}</span>
              </div>
            </div>
            <div className="col-2 d-none d-md-block">{channel.type}</div>
            {channel.groupType && (
              <div className="col-1 d-none d-md-block">{channel.groupType}</div>
            )}
            <div className={`col ${channel.groupType ? 'col-3' : 'col-4'} `}>
              {channel.connected ? 'Connected' : <ChannelTypeChannelToken channel={channel} />}
            </div>
            <div className="col-md-1">
              {' '}
              <ChannelTypeChannelsEnable channel={channel} channelType={channelType} />
            </div>
            <div className="col-md-1 text-end">
              <ChannelTypeChannelsAction
                channelType={channelType}
                channel={channel}
                removeChannel={handleRemoveChannel}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
});

export default withTranslation()(ChannelTypeChannels);
