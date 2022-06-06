/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { observer } from 'mobx-react';
import ComponentImage from '../ComponentImage';
import ComponentTooltip from '../ComponentTooltip';

const ChannelChannelComponent = observer(({ channelData, removeChannel, handleOnSelect }) => {
  const [selected, setSelected] = useState([]);
  const logoSocial = channelData.img ? channelData.img : `/assets/images/${channelData.id}.png`;

  const channels = [...channelData?.pages];

  const handleOnClick = (channel) => {
    handleOnSelect(channel);

    if (selected.includes(channel.id)) {
      setSelected(selected.filter((val) => val !== channel.id));
    } else {
      setSelected([...selected, channel.id]);
    }
  };

  return (
    <>
      {channels.map((channel, index) => (
        <div
          className={`position-relative m-2 d-flex align-items-center justify-content-center cursor-pointer rounded-2 border border-3 ${
            selected.indexOf(channel.id) !== -1 ? `border-success` : 'border-transparent'
          }`}
          key={index}
          onClick={() => handleOnSelect && handleOnClick(channel)}
        >
          {removeChannel && (
            <span
              className="cursor-pointer position-absolute end-0 top-0 text-red-1"
              onClick={() => (channel.removed = true)}
            >
              <i>
                <FontAwesomeIcon icon={faTimesCircle} />
              </i>
            </span>
          )}
          <ComponentTooltip title={channel.name}>
            {logoSocial && (
              <ComponentImage
                alt={channel.name}
                src={logoSocial}
                className="position-absolute bottom-0 end-0 w-20"
              />
            )}

            <ComponentImage
              alt={channel.name}
              src={channel.avatar ? channel.avatar : logoSocial}
              className="img-avatar rounded"
            />
          </ComponentTooltip>
        </div>
      ))}
    </>
  );
});

export default ChannelChannelComponent;
