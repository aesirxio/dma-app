/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from '../../../constants/PageStatus';
import * as datesUtility from 'react-big-calendar/lib/utils/dates';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer(moment);
class CalendarListViewModel {
  calendarStore = null;
  showView = 'month';
  showDate = new Date();

  tableStatus = PAGE_STATUS.LOADING;
  list = [];
  constructor(calendarStore) {
    makeAutoObservable(this);
    this.calendarStore = calendarStore;
  }

  initializeData = () => {
    this.calendarStore.fetchPlanning(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      this.buildFilter()
    );
  };

  resetObservableProperties = () => {
    this.tableStatus = PAGE_STATUS.LOADING;
    this.list = [];
  };

  onFilter = (date, view) => {
    this.showDate = date;
    this.showView = view;

    this.tableStatus = PAGE_STATUS.LOADING;

    this.calendarStore.fetchPlanning(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHander,
      this.buildFilter()
    );
  };

  buildFilter = () => ({
    startDate: datesUtility.firstVisibleDay(this.showDate, localizer).toISOString(),
    endDate: datesUtility.lastVisibleDay(this.showDate, localizer).toISOString(),
  });

  callbackOnErrorHander = () => {
    this.tableStatus = PAGE_STATUS.READY;
  };

  toModelEvents = (data) => {
    let event = [];

    data.forEach(function (elememt) {
      let data = JSON.parse(elememt.data);
      let schedule = data.content.publishedPlan.schedule[0];
      let headline = data.general.headline;

      var dateParts = schedule.date.split('-');
      let date = dateParts[0] + '/' + dateParts[1] + '/' + dateParts[2] + ' ' + schedule.time;
      let dateTime = new Date(date);
      let dateTimeEnd = new Date(date);
      dateTimeEnd.setHours(dateTimeEnd.getHours() + 1);

      let hours = dateTime.getHours();
      let minutes = dateTime.getMinutes();
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      let strTime = hours + ':' + minutes + ' ' + ampm;
      let titlte = strTime + ' | ' + data.content.description;
      // let schedule_time =
      // dateParts[0] + '/' + dateParts[1] + '/' + dateParts[2] + ' | ' + schedule.time + ' ' + ampm;
      let schedule_time =
        dateParts[0] + '/' + dateParts[1] + '/' + dateParts[2] + ' | ' + schedule.time + ' ' + ampm;

      event.push({
        id: elememt.id,
        headline: headline,
        title: titlte,
        description: data.content.description,
        allDay: true,
        start: dateTime,
        end: dateTimeEnd,
        channel: elememt.channel_type,
        schedule_time: schedule_time,
      });
    });

    return event;
  };

  callbackOnSuccessHandler = (calendarModelData) => {
    if (calendarModelData) {
      this.tableStatus = PAGE_STATUS.READY;
      const rowDataTransformed = this.toModelEvents(calendarModelData.event);
      this.list = rowDataTransformed;
    } else {
      this.tableStatus = PAGE_STATUS.ERROR;
    }
  };
}

export default CalendarListViewModel;
