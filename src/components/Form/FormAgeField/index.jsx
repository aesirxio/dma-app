/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useState } from 'react';

import SelectComponent from '../../Select';

const dataSelectOptionsAgeFrom = [
  { value: '18', label: '18' },
  { value: '24', label: '24' },
  { value: '35', label: '35' },
  { value: '44', label: '44' },
  { value: '55', label: '55' },
  { value: '65+', label: '65+' },
];

const dataSelectOptionsGGAgeFrom = [
  { value: '18_to_24', label: '18 - 24' },
  { value: '25_to_34', label: '25 - 34' },
  { value: '35_to_44', label: '35 - 44' },
  { value: '45_to_54', label: '45 - 54' },
  { value: '55_to_64', label: '55 - 64' },
  { value: '65_up', label: '65+' },
  { value: 'unknown', label: 'Unknown' },
];

const dataSelectOptionsAgeTo = [
  { value: '18', label: '18' },
  { value: '24', label: '24' },
  { value: '35', label: '35' },
  { value: '44', label: '44' },
  { value: '55', label: '55' },
  { value: '65+', label: '65+' },
];

const dataSelectOptionsGGAgeTo = [
  { value: '18_to_24', label: '18 - 24' },
  { value: '25_to_34', label: '25 - 34' },
  { value: '35_to_44', label: '35 - 44' },
  { value: '45_to_54', label: '45 - 54' },
  { value: '55_to_64', label: '55 - 64' },
  { value: '65_up', label: '65+' },
  { value: 'unknown', label: 'Unknown' },
];

const FormAgeField = ({ field }) => {
  const [getDataSelectOptionsAge, setDataSelectOptionsAge] = useState(dataSelectOptionsAgeTo);

  const handleOnChange = (data, target) => {
    field.changed(data, target);

    if (target.name === 'age_from') {
      if (data?.value) {
        let getAgeFrom = getDataSelectOptionsAge.filter((item) => item.value > data.value);
        setDataSelectOptionsAge(getAgeFrom);
      }
    }
  };

  return (
    <div className="d-flex justify-content-start position-relative z-index-5">
      <SelectComponent
        defaultValue={field.valueFrom}
        onChange={handleOnChange}
        options={field.isAgeGG ? dataSelectOptionsGGAgeFrom : dataSelectOptionsAgeFrom}
        className="text-green w-110 "
        isBorder={true}
        plColor="rgba(8, 18, 64, 0.8)"
        isMulti={field.isMulti ?? false}
        components={field.isComponents ? { Option } : null}
        async={field.async ?? false}
        loadOptions={field.loadOptions ?? null}
        name="age_from"
      />

      <div className="align-self-center m-1">-</div>
      <SelectComponent
        defaultValue={field.valueTo}
        onChange={handleOnChange}
        options={field.isAgeGG ? dataSelectOptionsGGAgeTo : getDataSelectOptionsAge}
        className="text-green w-110 "
        isBorder={true}
        plColor="rgba(8, 18, 64, 0.8)"
        isMulti={field.isMulti ?? false}
        components={field.isComponents ? { Option } : null}
        async={field.async ?? false}
        loadOptions={field.loadOptions ?? null}
        name="age_to"
      />
    </div>
  );
};

export default FormAgeField;
