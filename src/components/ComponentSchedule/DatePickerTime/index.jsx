/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import '../index.scss';
import DatePicker from 'react-datepicker';

const DatePickerTime = ({ timeDate, handlChangeTime, startDateTime }) => {
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    if (Date.parse(startDateTime) > Date.parse(currentDate)) {
      return currentDate;
    } else {
      return currentDate.getTime() < selectedDate.getTime();
    }
  };

  return (
    <DatePicker
      selected={timeDate}
      onChange={(date) => handlChangeTime(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
      filterTime={filterPassedTime}
    />
  );
};

export default DatePickerTime;
