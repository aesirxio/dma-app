/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { Form, Tabs } from 'react-bootstrap';
import { Tab } from 'bootstrap';
import ContentFormDescriptionMedia from './media';
import { CONTENT_DESCRIPTION_MODE, CONTENT_FIELD_KEY } from '../../../../constants/ContentModule';
import ContentUtils from '../../ContentUtils/ContentUtils';

const ContentFormDescriptionAdvanceChannel = observer(
  ({ channelType, formPropsData, onBlurDescription }) => {
    const list = channelType.list;
    const description = formPropsData[CONTENT_FIELD_KEY.DESCRIPTION];

    const handleOnChange = ({ target }, channelTypeId) => {
      ContentUtils.setDataForChannels(
        CONTENT_FIELD_KEY.DESCRIPTION,
        target.value,
        CONTENT_DESCRIPTION_MODE.ADVANCE,
        formPropsData,
        [channelTypeId]
      );
    };

    return (
      <>
        <Tabs defaultActiveKey="0" id="connectContent-tab" className="bg-white border-0">
          {list.map((channel, index) => (
            <Tab key={index} eventKey={index} title={channel.name}>
              <Form.Control
                as="textarea"
                required={true}
                defaultValue={description[channel.id]}
                rows="6"
                className="form-control rounded-0"
                onChange={(event) => handleOnChange(event, channel.id)}
                onBlur={onBlurDescription}
              />

              <ContentFormDescriptionMedia formPropsData={formPropsData} channel={channel} />
            </Tab>
          ))}
        </Tabs>
      </>
    );
  }
);

export default ContentFormDescriptionAdvanceChannel;
