/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Image as ComponentImage } from 'aesirx-uikit';
import { Accordion, AccordionButton, Form } from 'react-bootstrap';

const ChannelChannelComponent = observer(({ channelData }) => {
  const [checked, setChecked] = useState(true);
  const logoSocial = channelData.img ? channelData.img : `/assets/images/${channelData.id}.png`;

  const channels = [...channelData?.pages];

  const handleOnClick = (target, channel) => {
    channel.removed = !target.checked;
  };

  const handleOnCheckAll = ({ target }) => {
    channels.forEach((channel) => {
      channel.removed = !target.checked;
    });

    setChecked(target.checked);
  };

  return (
    <Accordion defaultActiveKey="0" alwaysOpen>
      <Accordion.Item eventKey="0" className="mb-1 border-0">
        <div className="position-relative">
          <AccordionButton className="pe-6 bg-accordion-button rounded-3">
            <ComponentImage alt={channelData.name} src={logoSocial} className="img-avatar-32 me-3" />
            <span>{channelData.name}</span>
          </AccordionButton>

          <Form.Check
            className="position-absolute top-50 end-0 translate-middle-y z-index-10 pe-3 me-1"
            type="checkbox"
            onClick={handleOnCheckAll}
            checked={checked}
          />
        </div>
        <Accordion.Body className="bg-transparent">
          {channels.map((channel, index) => (
            <div className={`d-flex align-items-center py-2 my-1 `} key={index}>
              <ComponentImage
                alt={channel.name}
                src={channel.avatar ? channel.avatar : logoSocial}
                className="img-avatar-32 rounded me-3"
              />
              <span className="text-body">{channel.name}</span>

              <Form.Check
                type="checkbox"
                checked={!channel.removed}
                onChange={(event) => handleOnClick(event.target, channel)}
                className="ms-auto"
              />
            </div>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
});

export default ChannelChannelComponent;
