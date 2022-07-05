/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { observer } from 'mobx-react';
import { withTranslation } from 'react-i18next';
import ChannelTypeConnectButton from './ChannelTypeConnectButton';
import ChannelTypeChannels from './ChannelTypeChannels';
import ComponentImage from '../../../components/ComponentImage';
import { useTranslation } from 'react-i18next';

const ChannelType = observer(({ channelTypeIndex, channelCategory }) => {
  const list = channelCategory.getList();

  if (list.length === 0) {
    return null;
  }
  const {t}= useTranslation("common");
  return (
    <div className="accordion mt-4" id={`accordionChannelType${channelTypeIndex}`}>
      {list.map((channelType, index) => (
        <div className="accordion-item mt-3 bg-white" key={Math.random(40, 200)}>
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
                <span className="ms-2 fs-4 text-blue-0 text-capitalize">{channelType.name}</span>
              </div>
              {channelType.status !== '100' ? (
                <ChannelTypeConnectButton
                  channelCategory={channelCategory}
                  channelType={channelType}
                />
              ) : (
                <div className="fs-6 text-nowrap">{t("txt_coming_soon")}</div>
              )}
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

export default withTranslation('common')(ChannelType);
