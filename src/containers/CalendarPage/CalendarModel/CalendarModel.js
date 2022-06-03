/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { CALENDAR_FIELD_KEY } from '../../../constants/CalendarConstant';

class CalendarModel {
  id = 0;
  name = '';
  startDate = '0000-00-00 00:00:00';
  endDate = '0000-00-00 00:00:00';
  background = 'blue';
  desc = '';

  constructor(data) {
    if (data) {
      this.id = data[CALENDAR_FIELD_KEY.ID] ?? this.id;
      this.name = data[CALENDAR_FIELD_KEY.NAME] ?? this.name;
      this.startDate = new Date(data[CALENDAR_FIELD_KEY.STARTDATE]) ?? this.startDate;
      this.endDate = new Date(data[CALENDAR_FIELD_KEY.ENDDATE]) ?? this.endDate;
      this.background = data[CALENDAR_FIELD_KEY.BACKGROUND] ?? this.background;
      this.desc = data[CALENDAR_FIELD_KEY.DESC] ?? this.desc;
    }
  }

  toCalendarEvent = () => {
    return {
      id: this.id,
      title: this.name,
      start: this.startDate,
      end: this.endDate,
      background: this.background,
      text: this.desc,
    };
  };
}

export default CalendarModel;
