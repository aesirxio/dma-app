import React, { useState, useEffect } from 'react';
import TimezoneSelect from 'react-timezone-select';
import Helper from '../../../utils/helper';

const TimezoneField = ({ field }) => {
  const fieldValue = Helper.isJson(field.value) ? JSON.parse(field.value) : field.value;
  const [selectedTimezone, setSelectedTimezone] = useState(fieldValue);

  useEffect(() => {
    field.changed(selectedTimezone);
  }, [selectedTimezone, field]);

  return (
    <div className="select-wrapper">
      <TimezoneSelect value={selectedTimezone} onChange={setSelectedTimezone} />
    </div>
  );
};

export default TimezoneField;
