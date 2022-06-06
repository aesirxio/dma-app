/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import '../index.scss';

import DatePicker from 'react-datepicker';

const DatePickerDay = ({ startDateTime, handlChangeDay }) => {
  return (
    <DatePicker
      dateFormat={'MMM d, yyyy'}
      selected={startDateTime}
      onChange={(date) => handlChangeDay(date)}
      minDate={new Date()}
    />
  );
};

export default DatePickerDay;
