/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy, useEffect, useState } from 'react';

import _ from 'lodash';

import { AesirxFacebookDataApiService, AesirxGoogleDataApiService } from 'aesirx-lib';

const FormRadio = lazy(() => import('../FormRadio'));
const SelectComponent = lazy(() => import('../../Select'));

const FormLocationField = ({ field, validator }) => {
  const [locations] = useState([]);
  const [fieldSelect, setFieldSelect] = useState({
    label: 'Location',
    key: 'selectlocation',
    classNameInput: 'btn-outline-primary',
    option: field.isAll
      ? [
          { label: 'All countries', value: 'yes' },
          { label: 'Enter another location', value: 'no' },
        ]
      : [{ label: 'Enter another location', value: 'no' }],
    value: field.all,
    required: true,
    validation: 'required',
    changed: (event) => {
      setFieldSelect({ ...fieldSelect, value: event.target.value });

      field.changedAll(event.target.value);
    },
  });

  // GET DATA FACEBOOKADS
  const fetchSearchLocationFromFacebookData = async (inputValue) => {
    if (inputValue.length > 3) {
      const facebookDataAPIService = new AesirxFacebookDataApiService();
      let response = await facebookDataAPIService.getLocationsFromFacebookData(inputValue);

      return filterLocation(inputValue, response?.data);
    }

    return [];
  };

  // GET DATA GOOGLEADS
  const fetchSearchLocationFromGoggleData = async (inputValue) => {
    if (inputValue.length > 3) {
      const googleDataAPIService = new AesirxGoogleDataApiService();
      let response = await googleDataAPIService.getSearchLocationFromGoogleData(inputValue);
      return filterLocation(inputValue, response?.google_ad_user_locations);
    }

    return [];
  };

  useEffect(() => {
    return () => {};
  }, []);

  const filterLocation = (value, dataLocation) => {
    return Array.isArray(dataLocation)
      ? dataLocation
          // .filter((i) => i.name.toLowerCase().includes(value.toLowerCase()))
          .map((location) => ({
            label: location.name,
            value: field.name === 'googleads' ? location.id : location.key,
          }))
      : [];
  };

  const debouncedChangeHandler = _.throttle(
    field.name === 'googleads'
      ? fetchSearchLocationFromGoggleData
      : fetchSearchLocationFromFacebookData,
    500
  );

  if (!locations) {
    return null;
  }

  return (
    <div className="position-relative z-index-10">
      <FormRadio field={fieldSelect} />

      {fieldSelect.value !== 'yes' && (
        <>
          <SelectComponent
            defaultValue={field.value}
            onChange={field.changed}
            className="text-green w-100"
            isBorder={true}
            plColor="rgba(8, 18, 64, 0.8)"
            isMulti={field.isMulti ?? false}
            async={true}
            loadOptions={debouncedChangeHandler}
            cacheOptions
          />
          {field.validation &&
            validator.message(field.label, field.value, field.validation, {
              className: 'text-danger',
            })}
        </>
      )}
    </div>
  );
};

export default FormLocationField;
