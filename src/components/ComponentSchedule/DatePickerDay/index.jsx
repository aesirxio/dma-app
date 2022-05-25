import React, { useState, lazy } from 'react';
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
