/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import ChannelTypeConnectButton from './ChannelTypeConnectButton';
import ChannelTypeChannels from './ChannelTypeChannels';
import RemoveSelectedChannelsButton from './RemoveSelectedChannelsButton';
import { Image as ComponentImage } from 'aesirx-uikit';
import { useTranslation } from 'react-i18next';
import { notify } from 'aesirx-uikit';
import {
  useSelectedChannels,
  useChannelsViewModel,
} from '../ChannelsViewModels/ChannelsViewModelContextProvider';
import { Helper } from 'aesirx-lib';

const ChannelType = observer(({ channelTypeIndex, channelCategory }) => {
  const list = channelCategory.getList();
  const { channelsListViewModel } = useChannelsViewModel();
  const [loading, setLoading] = useState(false);
  if (list.length === 0) {
    return null;
  }
  const { t } = useTranslation();
  const { selectedChannels, setSelectedChannels } = useSelectedChannels();

  if (loading) {
    return (
      <div className="d-flex justify-content-center m-2">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  const handleRemoveSelectedChannels = async (channelName, channel) => {
    if (!selectedChannels || selectedChannels.length === 0) {
      notify('Please choose one of the channels', 'error');
      return;
    }
    try {
      if (Helper.confirmDeleteItem()) {
        setLoading(true);
        const removeSuccess = await channelsListViewModel.bulkRemoveChannel(channelName, channel);

        if (removeSuccess) {
          setSelectedChannels([]);
          setLoading(false);
          notify('Removed successfully', 'success');
        }
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      notify('Remove failed', 'error');
    }
  };

  return (
    <div className="accordion mt-4" id={`accordionChannelType${channelTypeIndex}`}>
      {list.map((channelType, index) => (
        <div
          className="accordion-item mt-3 bg-blue-5 rounded-2 border-0"
          key={Math.random(40, 200)}
        >
          <h3 className="accordion-header" id={`flush-heading${index}`}>
            <div
              className={`p-3 d-flex align-items-center`}
              data-bs-toggle="collapse"
              data-bs-target={`#flush-collapse${index}`}
            >
              <div className="w-100 ">
                {channelType.image && (
                  <ComponentImage
                    className="img-avatar"
                    src={channelType.image}
                    alt={channelType.name}
                  />
                )}
                <span className="ms-2 fs-4 text-body text-capitalize">{channelType.name}</span>
              </div>
              {channelType.pages > '0' && (
                <div className="me-3 text-center">
                  {loading ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <RemoveSelectedChannelsButton
                      selectedChannels={selectedChannels}
                      bulkRemoveChannel={(channel) =>
                        handleRemoveSelectedChannels(channelType.id, channel)
                      }
                    />
                  )}
                </div>
              )}
              {(() => {
                switch (channelType.status) {
                  case '100':
                    return <div className="fs-14 text-nowrap">{t('txt_coming_soon')}</div>;
                  case '1':
                    return (
                      <ChannelTypeConnectButton
                        channelCategory={channelCategory}
                        channelType={channelType}
                      />
                    );
                  case '2':
                    return <div className="fs-6 text-nowrap">{t('txt_ maintenance')}</div>;
                  default:
                    break;
                }
              })()}
            </div>
          </h3>
          <div
            id={`flush-collapse${index}`}
            className={`accordion-collapse collapse show border-0`}
            data-bs-parent={`#accordionChannelType${channelTypeIndex}`}
            key={Math.random(40, 200)}
          >
            <div className="accordion-body p-0">
              <ChannelTypeChannels channelType={channelType} selectedChannels={selectedChannels} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default withTranslation()(ChannelType);
