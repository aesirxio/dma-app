/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import ChannelTypeConnectButton from './ChannelTypeConnectButton';
import ChannelTypeChannels from './ChannelTypeChannels';
import { Image as ComponentImage } from 'aesirx-uikit';
import { useTranslation } from 'react-i18next';
import ChannelTypeAction from './ChannelTypeAction';
import { ChannelsViewModelContext } from '../ChannelsViewModels/ChannelsViewModelContextProvider';
import { Helper } from 'aesirx-lib';

const ChannelType = observer(({ channelTypeIndex, channelCategory }) => {
  const list = channelCategory.list;
  const [loading, setLoading] = useState(false);

  if (list.length === 0) {
    return null;
  }

  const context = useContext(ChannelsViewModelContext);

  const handleOnRemove = async (channelType) => {
    if (Helper.confirmDeleteItem()) {
      setLoading(true);
      const selectedChannels = channelType?.pages.filter((channel) => channel.selected);
      const channelIds = selectedChannels.map((channel) => channel.id);

      await context.getChannelsListViewModel().bulk('removeChannel', channelType, channelIds);
      setLoading(false);
    }
  };

  const { t } = useTranslation();

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
              <div className="flex-grow-1">
                {channelType.image && (
                  <ComponentImage
                    className="img-avatar"
                    src={channelType.image}
                    alt={channelType.name}
                  />
                )}
                <span className="ms-2 fs-4 text-body text-capitalize space-img">
                  {channelType.name}
                </span>
              </div>

              {channelType.pages > '0' && (
                <div className="me-3 text-center">
                  {loading ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <ChannelTypeAction channelType={channelType} handleOnRemove={handleOnRemove} />
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
              <ChannelTypeChannels channelType={channelType} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default withTranslation()(ChannelType);
