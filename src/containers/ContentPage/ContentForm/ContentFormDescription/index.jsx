import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

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

    console.log(
      'formPropsData[CONTENT_FIELD_KEY.MODE]11111',
      formPropsData[CONTENT_FIELD_KEY.MODE]
    );
  }, [formPropsData, mode]);

  console.log('ContentFormDescription render', mode);

  return (
    <>
      <div className="d-flex mb-2">
        <label className="w-100 form-label">
          <span className="text-black">Content Description</span>
          <span className="text-red-1">*</span>
        </label>
        <ComponentSwitch
          handleChange={handChangeAdvanceMode}
          checked={mode}
          textLeft={'Advance mode'}
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

export default ContentFormDescription;
