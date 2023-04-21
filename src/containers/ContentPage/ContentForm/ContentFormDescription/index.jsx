/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useTranslation, withTranslation } from 'react-i18next';
import ComponentSwitch from '../../../../components/ComponentSwitch';
import { CONTENT_FIELD_KEY, CONTENT_DESCRIPTION_MODE } from '../../../../constants/ContentModule';
import ContentFormDescriptionBasic from './basic';
import ContentFormDescriptionAdvance from './advance';

import './index.scss';

const ContentFormDescription = observer(({ formPropsData, onBlurDescription }) => {
  const [mode, setMode] = useState(
    formPropsData[CONTENT_FIELD_KEY.MODE] === CONTENT_DESCRIPTION_MODE.BASIC ? false : true
  );

  const handChangeAdvanceMode = (event) => {
    setMode(event.target.checked, () => {
      if (!event.target.checked) {
        formPropsData[CONTENT_FIELD_KEY.MODE] = CONTENT_DESCRIPTION_MODE.BASIC;
      } else {
        formPropsData[CONTENT_FIELD_KEY.MODE] = CONTENT_DESCRIPTION_MODE.ADVANCE;
      }
    });
  };

  useEffect(() => {
    formPropsData[CONTENT_FIELD_KEY.MODE] = mode
      ? CONTENT_DESCRIPTION_MODE.ADVANCE
      : CONTENT_DESCRIPTION_MODE.BASIC;
  }, [formPropsData, mode]);
  const { t } = useTranslation();
  return (
    <>
      <div className="d-flex mb-2">
        <label className="w-100 form-label">
          <span className="text-blue-0">{t('content_description')}</span>
          <span className="text-red-1">*</span>
        </label>
        <ComponentSwitch
          handleChange={handChangeAdvanceMode}
          checked={mode}
          textLeft={t('txt_advance_mode')}
        />
      </div>

      {!mode ? (
        <ContentFormDescriptionBasic
          formPropsData={formPropsData}
          onBlurDescription={onBlurDescription}
        />
      ) : (
        <ContentFormDescriptionAdvance
          formPropsData={formPropsData}
          onBlurDescription={onBlurDescription}
        />
      )}
    </>
  );
});

export default withTranslation()(ContentFormDescription);
