/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { format } from 'date-fns';

import FIELD_TYPE from '../../../constants/FieldType';
import { FORMAT_DATE } from '../../../constants/FormFieldType';
import getStatus from '../../../utils/status';
import moment from 'moment';
import { GROUP_FIELD_KEY, GROUP_API_FIELD_KEY } from '../../../constants/GroupModule';

import { Helper } from 'aesirx-lib';

class GroupModel {
  constructor(data) {
    this.id = data[GROUP_API_FIELD_KEY.ID];
    this.name = data[GROUP_API_FIELD_KEY.NAME] ?? '';
    this.status = data[GROUP_API_FIELD_KEY.STATUS] ?? '';

    this.startdate =
      data[GROUP_API_FIELD_KEY.START_DATE] !== '0000-00-00 00:00:00' &&
      data[GROUP_API_FIELD_KEY.START_DATE] !== ''
        ? data[GROUP_API_FIELD_KEY.START_DATE]
        : '';

    this.enddate =
      data[GROUP_API_FIELD_KEY.END_DATE] !== '0000-00-00 00:00:00' &&
      data[GROUP_API_FIELD_KEY.END_DATE] !== ''
        ? data[GROUP_API_FIELD_KEY.END_DATE]
        : '';
    this.data = data[GROUP_API_FIELD_KEY.DATA] ?? '';
    this.published = data[GROUP_API_FIELD_KEY.PUBLISHED] ?? '';
  }

  getId = () => {
    return {
      value: this.id,
      type: FIELD_TYPE.READONLY,
      columnName: GROUP_FIELD_KEY.ID,
      columnText: 'ID',
    };
  };

  getGroupId = () => (this.group ? this.group : null);

  getName = () => {
    return {
      value: this.name,
      type: FIELD_TYPE.TEXT,
      columnName: GROUP_FIELD_KEY.NAME,
      columnText: 'Name',
    };
  };

  getPercentComplete = () => {
    return {
      value: this.percentComplete,
      type: FIELD_TYPE.TEXT,
      columnName: GROUP_FIELD_KEY.PERCENT_COMPLETE,
      columnText: 'Percent Complete',
    };
  };

  getStatus = () => {
    return {
      value: getStatus(this.status),
      type: FIELD_TYPE.TEXT,
      columnName: GROUP_FIELD_KEY.STATUS,
      columnText: 'Status',
    };
  };
  getPublished = () => {
    return {
      value: this.published,
      type: FIELD_TYPE.TEXT,
      columnName: GROUP_FIELD_KEY.PUBLISHED,
      columnText: 'Status',
    };
  };

  getStartDate = () => {
    return {
      value: this.startdate ? format(new Date(this.startdate), FORMAT_DATE) : '',
      original: this.startdate,
      type: FIELD_TYPE.DATE,
      columnName: GROUP_FIELD_KEY.START_DATE,
      columnText: 'Start Date',
    };
  };

  getEndDate = () => {
    return {
      value: this.enddate ? format(new Date(this.enddate), FORMAT_DATE) : '',
      original: this.enddate,
      type: FIELD_TYPE.DATE,
      columnName: GROUP_FIELD_KEY.END_DATE,
      columnText: 'End Date',
    };
  };

  getData = () => {
    return {
      value: Helper.isNull(this.data) ? {} : JSON.parse(this.data),
    };
  };

  toTableRowData = () => {
    try {
      const id = this.getId();
      const name = this.getName();
      const status = this.getStatus();
      const startDate = this.getStartDate();
      const endDate = this.getEndDate();
      const published = this.getPublished();

      const result = {
        [id.columnName]: id.value,
        [name.columnName]: name.value,
        [status.columnName]: status.value,
        [startDate.columnName]: startDate.value,
        [endDate.columnName]: endDate.value,
        [published.columnName]: published.value,
      };
      return result;
    } catch (error) {
      return null;
    }
  };

  static convertSubmittedDataToAPIService(groupData) {
    const result = groupData
      ? {
          [GROUP_API_FIELD_KEY.ID]: groupData[GROUP_API_FIELD_KEY.ID] ?? '',
          [GROUP_API_FIELD_KEY.NAME]: groupData[GROUP_FIELD_KEY.NAME] ?? '',
          [GROUP_API_FIELD_KEY.START_DATE]: moment
            .utc(groupData[GROUP_FIELD_KEY.START_DATE], 'YYYY-MM-DD HH:mm:ss [GMT]ZZ')
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
          [GROUP_API_FIELD_KEY.END_DATE]: moment
            .utc(groupData[GROUP_FIELD_KEY.END_DATE], 'YYYY-MM-DD HH:mm:ss [GMT]ZZ')
            .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
          [GROUP_API_FIELD_KEY.PUBLISHED]: groupData[GROUP_FIELD_KEY.PUBLISHED] ?? '',

          [GROUP_API_FIELD_KEY.DATA]: JSON.stringify(groupData[GROUP_API_FIELD_KEY.DATA]) ?? '',
        }
      : null;

    return result;
  }
}

export default GroupModel;
