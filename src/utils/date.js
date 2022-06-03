/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { FORMAT_DATE, FORMAT_TIME } from '../constants/FormFieldType';
import { addMilliseconds, format, fromUnixTime } from 'date-fns';
import { getTimezoneOffset } from 'date-fns-tz';
import Helper from './helper';

const timezone = Helper.getTimezoneDefault();

const formatDate = (date, withTime = false, convert = true) => {
  date = new Date(date);

  if (convert) {
    const offset = getTimezoneOffset(timezone);
    date = addMilliseconds(date, offset);
  }

  const f = `${FORMAT_DATE} ${withTime ? ` ${FORMAT_TIME}` : ''}`;
  return format(date, f);
};

const formatUnix = (timestamp, withTime = false) => {
  return formatDate(fromUnixTime(timestamp), withTime, false);
};

export { formatDate, formatUnix };
