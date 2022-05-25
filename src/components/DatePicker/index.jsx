import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const CustomizedDatePicker = ({ handleOnChange, defaultDate }) => {
  const [startDate, setStartDate] = useState(defaultDate ? new Date(defaultDate) : null);
  return (
    <DatePicker
      dateFormat={'MMM d, yyyy'}
      selected={startDate}
      showYearDropdown
      maxDate={new Date("12-31-" + (moment().year() - 10))}
      wrapperClassName="w-100"
      onChange={(date) => {
        handleOnChange(date);
        setStartDate(date);
      }}
      className='m-0 p-0 border-0 outline-none'
    />
  );
};

export default CustomizedDatePicker;
