/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useContext, useRef, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Form } from 'react-bootstrap';
import SimpleReactValidator from 'simple-react-validator';

import { CONTENT_DESCRIPTION_MODE, CONTENT_FIELD_KEY } from '../../../../constants/ContentModule';
import ContentFormDescriptionMedia from './media';
import ContentUtils from '../../ContentUtils/ContentUtils';

const ContentFormDescriptionBasic = observer(({ formPropsData, onBlurDescription }) => {
  const descriptionObj = formPropsData[CONTENT_FIELD_KEY.DESCRIPTION];

  const description = descriptionObj[Object.keys(descriptionObj)[0]];

  const handleOnChange = ({ target }) => {
    ContentUtils.setDataForChannels(
      CONTENT_FIELD_KEY.DESCRIPTION,
      target.value,
      CONTENT_DESCRIPTION_MODE.BASIC,
      formPropsData
    );
  };

  return (
    <>
      <Form.Control
        name="Description"
        as="textarea"
        defaultValue={description}
        required={true}
        rows="6"
        className="form-control rounded-0"
        onChange={handleOnChange}
        onBlur={onBlurDescription}
      />
      <ContentFormDescriptionMedia formPropsData={formPropsData} />
    </>
  );
});

export default ContentFormDescriptionBasic;
