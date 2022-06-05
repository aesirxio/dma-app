/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

import DatePickerDay from '../DatePickerDay';
import DatePickerTime from '../DatePickerTime';

import '../index.scss';

class ItemSchedule extends Component {
  render() {
    let { startDateTime, timeDate, handlChangeDay, handlChangeTime } = this.props;
    return (
      <>
        <div className="">
          <p className="mb-2">Publish date/time</p>
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

export default ItemSchedule;
