/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import NumberFormat from 'react-number-format';
import SETTINGS from '../../../constants/Settings';

const FormPriceField = ({ field }) => {
  let prefix = `${SETTINGS.CURRENCY_SYMBOL} `;
  let suffix = '';

  if (SETTINGS.CURRENCY_SYMBOL_POSITION === 'behind') {
    suffix = ` ${SETTINGS.CURRENCY_SYMBOL}`;
    prefix = '';
  }
  const configPrice = {
    value: `${field.value ?? 0}`,
    displayType: 'input',
    thousandSeparator: `${SETTINGS.THOUSAND_SEPERATOR}`,
    decimalSeparator: `${SETTINGS.DECIMAL_SEPERATOR}`,
    suffix: `${suffix}`,
    prefix: `${prefix}`,
    allowNegative: false,
    className: 'form-control',
    placeholder: `${field.placeholder}`,
  };

  const configNumber = {
    value: `${field.value ?? 0}`,
    displayType: 'input',
    allowNegative: false,
    className: 'form-control',
    placeholder: `${field.placeholder}`,
  };
  return (
    <>
      <NumberFormat
        {...(field.isPrice === false ? configNumber : configPrice)}
        onValueChange={field.changed}
        readOnly={field.readOnly}
      />
    </>
  );
};

export default FormPriceField;
