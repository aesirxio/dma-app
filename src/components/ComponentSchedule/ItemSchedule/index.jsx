/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import DatePickerDay from '../DatePickerDay';
import DatePickerTime from '../DatePickerTime';
import { withTranslation, useTranslation } from 'react-i18next';

import '../index.scss';

class ItemSchedule extends Component {
  render() {
    let { startDateTime, timeDate, handlChangeDay, handlChangeTime } = this.props;
    const { t } = useTranslation('common');
    return (
      <>
        <div className="">
          <p className="mb-2">{t('txt_publish_date/time')}</p>
          <div className="d-flex mb-3">
            <div className="item w-50">
              <DatePickerDay startDateTime={startDateTime} handlChangeDay={handlChangeDay} />
            </div>
            <div className="item w-50">
              <DatePickerTime timeDate={timeDate} handlChangeTime={handlChangeTime} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withTranslation('common')(ItemSchedule);
