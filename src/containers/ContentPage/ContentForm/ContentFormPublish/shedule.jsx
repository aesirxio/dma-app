/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React, { useEffect, useState, useCallback } from 'react';
import { observer } from 'mobx-react';

import {
  CONTENT_FIELD_KEY,
  CONTENT_PUBLISH_MODE,
  CONTENT_DESCRIPTION_MODE,
} from '../../../../constants/ContentModule';
import ContentUtils from '../../ContentUtils/ContentUtils';

import DatePickerDay from '../../../../components/ComponentSchedule/DatePickerDay';
import DatePickerTime from '../../../../components/ComponentSchedule/DatePickerTime';
import ChannelUtils from '../../../ChannelsPage/ChannelUtils/ChannelUtils';

const ContentFormPublishShedule = observer(({ formPropsData, channelCategory = null }) => {
  const mode = formPropsData[CONTENT_FIELD_KEY.MODE];

  let htmlId = '';
  if (mode === CONTENT_DESCRIPTION_MODE.BASIC) {
    htmlId = 'basic';
  } else {
    htmlId = channelCategory.id;
  }

  const channelTypesIds = useCallback(() => {
    if (channelCategory) {
      return channelCategory.list?.map(({ id }) => id);
    } else {
      return ChannelUtils.connectedChannelGroupOptions(
        formPropsData[CONTENT_FIELD_KEY.CHANNELS]
      ).map(({ alias }) => alias);
    }
  }, [formPropsData, channelCategory]);

  const getDetault = (key, de) => {
    const firstChannel = channelTypesIds()[0];

    if (formPropsData[key][firstChannel]) {
      return formPropsData[key][firstChannel];
    } else {
      return de;
    }
  };

  const [publishMode, setPublishMode] = useState(
    getDetault(CONTENT_FIELD_KEY.PUBLISH_MODE, CONTENT_PUBLISH_MODE.NOW)
  );

  const [startDate, setDate] = useState(getDetault(CONTENT_FIELD_KEY.PUBLISH_DATE, new Date()));
  const [startTime, setTime] = useState(getDetault(CONTENT_FIELD_KEY.TIME, new Date()));

  const handleRadio = (value) => {
    setPublishMode(value);
  };

  const handlChangeDay = (date) => {
    setDate(date);
  };

  const handlChangeTime = (date) => {
    setTime(date);
  };

  useEffect(() => {
    ContentUtils.setDataForChannels(
      CONTENT_FIELD_KEY.PUBLISH_MODE,
      publishMode,
      mode,
      formPropsData,
      channelTypesIds()
    );
  }, [formPropsData, mode, publishMode, channelTypesIds]);

  useEffect(() => {
    ContentUtils.setDataForChannels(
      CONTENT_FIELD_KEY.PUBLISH_DATE,
      startDate,
      mode,
      formPropsData,
      channelTypesIds()
    );
  }, [formPropsData, mode, startDate, channelTypesIds]);

  useEffect(() => {
    ContentUtils.setDataForChannels(
      CONTENT_FIELD_KEY.TIME,
      startTime,
      mode,
      formPropsData,
      channelTypesIds()
    );
  }, [formPropsData, mode, startTime, channelTypesIds]);

  console.log('ContentFormPublishShedule render', formPropsData, channelTypesIds());

  return (
    <>
      <div className="d-flex mb-3">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            onChange={() => handleRadio(CONTENT_PUBLISH_MODE.NOW)}
            checked={publishMode === CONTENT_PUBLISH_MODE.NOW}
            id={`now_${htmlId}`}
          />
          <label className="form-check-label" htmlFor={`now_${htmlId}`}>
            Post now
          </label>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id={`schedule_${htmlId}`}
              checked={publishMode === CONTENT_PUBLISH_MODE.SCHEDULE}
              onChange={() => handleRadio(CONTENT_PUBLISH_MODE.SCHEDULE)}
            />
            <label className="form-check-label" htmlFor={`schedule_${htmlId}`}>
              Schedule
            </label>
          </div>
        </div>
        {publishMode === CONTENT_PUBLISH_MODE.SCHEDULE && (
          <>
            <p className="mb-2">Publish date/time</p>{' '}
            <div className="d-flex mb-3">
              <div className="item w-50 wr_item_schedule">
                <DatePickerDay
                  startDateTime={startDate}
                  handlChangeDay={(date) => handlChangeDay(date)}
                />
              </div>
              <div className="item w-50 wr_item_schedule">
                <DatePickerTime
                  timeDate={startTime}
                  handlChangeTime={(date) => handlChangeTime(date)}
                  startDateTime={startDate}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
});

export default ContentFormPublishShedule;
