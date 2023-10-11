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
import { Form } from 'react-bootstrap';

const ChannelTypeChannels = observer(({ channelType }) => {
  const context = useContext(ChannelsViewModelContext);

  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const channels = [...channelType?.pages];

  const [selected, setSelected] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  if (channels.length === 0) {
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

  const handleOnSelectAll = ({ target }) => {
    channels.forEach((channel) => {
      handleOnSelect(target, channel);
    });
    setSelectAllChecked(target.checked);
    if (target.checked) {
      channels.map((channel) => channel.id);
    }
  };

  const handleOnSelect = (target, channel) => {
    channel.selected = target.checked;

    if (target.checked) {
      setSelected([...selected, channel.id]);
    } else {
      setSelected(selected.filter((item) => item != channel.id));
    }
    const allChannelsSelected = channels.every((channel) => channel.selected);
    setSelectAllChecked(allChannelsSelected);
  };

  return (
    <>
      <div className="mt-1 mb-4 border-bottom"> </div>
      <div className="list_content">
        <div
          className={`py-2 px-3 d-flex rounded-2 border-bottom ${
            selectAllChecked ? 'select-all-checked' : ''
          }`}
        >
          <div className="col col-md-3 col-xl-4">
            <div className="d-flex align-items-center">
              <div className="text-start me-3">
                <Form.Check
                  type="checkbox"
                  className="ms-auto checkbox-channel"
                  onChange={handleOnSelectAll}
                  checked={selectAllChecked}
                />
              </div>
              {t('txt_name_personas')}
            </div>
          </div>
          <div className="col-1 d-none d-md-block">{t('txt_type')}</div>
          {channelType.id === 'linkedin_group' && (
            <div className="col-2 d-none d-md-block">{t('txt_group_type')}</div>
          )}
          <div className={`col`}>{t('txt_status')}</div>
          <div className="col-1 text-end">{t('txt_enable')}</div>
          <div className="col-3 col-lg-2 text-center">{t('txt_action')}</div>
        </div>

        {channels.map((channel, index) => (
          <div
            className={`p-3 d-flex align-items-center content-item ${
              selectAllChecked || selected.includes(channel.id) ? 'selected-item' : ''
            } ${index ? 'border-top-1' : ''}`}
            key={Math.random(40, 200)}
          >
            <div className="col col-md-3 col-xl-4">
              <div className="d-flex align-items-center">
                <div className="text-start me-3">
                  <Form.Check
                    type="checkbox"
                    className="ms-auto checkbox-channel"
                    onChange={(event) => handleOnSelect(event.target, channel)}
                    checked={channel.selected}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <ComponentImage
                    width={40}
                    height={40}
                    placeholderSrc={'/assets/images/default_channel_image.png'}
                    className="img-avatar rounded"
                    src={
                      channel.avatar
                        ? channel.avatar
                        : `/assets/images/${channel.channelTypeName}.png`
                    }
                    alt={channel.name}
                  />
                  <span className="space-img ms-14">{channel.name}</span>
                </div>
              </div>
            </div>
            <div className="col-1 d-none d-md-block">{channel.type}</div>
            {channel.groupType && (
              <div className="col-2 d-none d-md-block text-capitalize">{channel.groupType}</div>
            )}
            <div className={`col`}>
              {channel.connected ? 'Connected' : <ChannelTypeChannelToken channel={channel} />}
            </div>
            <div className="col-1 text-end">
              <ChannelTypeChannelsEnable channel={channel} channelType={channelType} />
            </div>
            <div className="col-3 col-lg-2 type-channel-action-custom">
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
