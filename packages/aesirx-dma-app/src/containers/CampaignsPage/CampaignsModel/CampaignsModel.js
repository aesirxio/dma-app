/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import { format } from 'date-fns';

import FIELD_TYPE from '../../../constants/FieldType';
import { FORMAT_DATE } from '../../../constants/FormFieldType';
import { ProgressModel } from './ProgressModel';
import getStatus from '../../../utils/status';
import moment from 'moment';
import { CAMPAIGNS_FIELD_KEY, CAMPAIGN_API_FIELD_KEY } from '../../../constants/CampaignsModule';

import { Helper } from 'aesirx-lib';

class CampaignsModel {
  constructor(data) {
    this.id = data[CAMPAIGN_API_FIELD_KEY.ID];
    this.name = data[CAMPAIGN_API_FIELD_KEY.NAME] ?? '';
    this.status = data[CAMPAIGN_API_FIELD_KEY.STATUS] ?? '';

    this.startdate =
      data[CAMPAIGN_API_FIELD_KEY.START_DATE] !== '0000-00-00 00:00:00' &&
      data[CAMPAIGN_API_FIELD_KEY.START_DATE] !== ''
        ? data[CAMPAIGN_API_FIELD_KEY.START_DATE]
        : '';

    this.enddate =
      data[CAMPAIGN_API_FIELD_KEY.END_DATE] !== '0000-00-00 00:00:00' &&
      data[CAMPAIGN_API_FIELD_KEY.END_DATE] !== ''
        ? data[CAMPAIGN_API_FIELD_KEY.END_DATE]
        : '';

    this.needtodo = data[CAMPAIGN_API_FIELD_KEY.NEED_TO_DO] ?? '';
    this.schedudepost = data[CAMPAIGN_API_FIELD_KEY.SCHEDUDE_POST] ?? '';
    this.publishedcontent = data[CAMPAIGN_API_FIELD_KEY.PUBLISHED_CONTENT] ?? '';

    this.project = data[CAMPAIGN_API_FIELD_KEY.PROJECT] ?? '';

    this.percentComplete = data[CAMPAIGN_API_FIELD_KEY.PERCENT_COMPLETE] ?? '';
    this.progress = this.percentComplete
      ? new ProgressModel({
          id: this.id,
          progress: this.percentComplete,
        })
      : 0;

    this.data = data[CAMPAIGN_API_FIELD_KEY.DATA] ?? '';
    this.published = parseInt(data[CAMPAIGN_API_FIELD_KEY.PUBLISHED]) ?? '';
  }

  getId = () => {
    return {
      value: this.id,
      type: FIELD_TYPE.READONLY,
      columnName: CAMPAIGNS_FIELD_KEY.ID,
      columnText: 'ID',
    };
  };

  getProjectId = () => (this.project ? this.project : null);

  getName = () => {
    return {
      value: this.name,
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.NAME,
      columnText: 'Name',
    };
  };

  getPercentComplete = () => {
    return {
      value: this.percentComplete,
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.PERCENT_COMPLETE,
      columnText: 'Percent Complete',
    };
  };

  getStatus = () => {
    return {
      value: getStatus(this.status),
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.STATUS,
      columnText: 'Status',
    };
  };
  getPublished = () => {
    return {
      value: this.published,
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.PUBLISHED,
      columnText: 'Status',
    };
  };

  getStartDate = () => {
    return {
      value: this.startdate ? format(new Date(this.startdate), FORMAT_DATE) : '',
      original: this.startdate,
      type: FIELD_TYPE.DATE,
      columnName: CAMPAIGNS_FIELD_KEY.START_DATE,
      columnText: 'Start Date',
    };
  };

  getEndDate = () => {
    return {
      value: this.enddate ? format(new Date(this.enddate), FORMAT_DATE) : '',
      original: this.enddate,
      type: FIELD_TYPE.DATE,
      columnName: CAMPAIGNS_FIELD_KEY.END_DATE,
      columnText: 'End Date',
    };
  };

  getNeedToDo = () => {
    return {
      value: this.needtodo,
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.NEED_TO_DO,
      columnText: 'Need To Do',
    };
  };

  getSchedudePost = () => {
    return {
      value: this.schedudepost,
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.SCHEDUDE_POST,
      columnText: 'Schedude post',
    };
  };

  getPublishedContent = () => {
    return {
      value: this.publishedcontent,
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.PUBLISHED_CONTENT,
      columnText: 'Published content',
    };
  };

  getProgress = () => {
    return {
      value: this.progress ? this.progress.getProgress() : '',
      type: FIELD_TYPE.TEXT,
      columnName: CAMPAIGNS_FIELD_KEY.PROGRESS,
      columnText: 'Progress',
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
      const needToDo = this.getNeedToDo();
      const schedudePost = this.getSchedudePost();
      const publishedContent = this.getPublishedContent();
      const progress = this.getProgress();
      const published = this.getPublished();

      const result = {
        [id.columnName]: id.value,
        [name.columnName]: name.value,
        [status.columnName]: status.value,
        [startDate.columnName]: startDate.value,
        [endDate.columnName]: endDate.value,
        [needToDo.columnName]: needToDo.value,
        [schedudePost.columnName]: schedudePost.value,
        [publishedContent.columnName]: publishedContent.value,
        [progress.columnName]: progress.value,
        [published.columnName]: published.value,
      };
      return result;
    } catch (error) {
      return null;
    }
  };

  static convertSubmittedDataToAPIService(campaignsData) {
    const result = campaignsData
      ? {
          [CAMPAIGN_API_FIELD_KEY.ID]: campaignsData[CAMPAIGN_API_FIELD_KEY.ID] ?? '',
          [CAMPAIGN_API_FIELD_KEY.NAME]: campaignsData[CAMPAIGNS_FIELD_KEY.NAME] ?? '',
          [CAMPAIGN_API_FIELD_KEY.START_DATE]:
            moment(campaignsData[CAMPAIGNS_FIELD_KEY.START_DATE]).format('YYYY/MM/DD h:mm') ?? '',
          [CAMPAIGN_API_FIELD_KEY.END_DATE]:
            moment(campaignsData[CAMPAIGNS_FIELD_KEY.END_DATE]).format('YYYY/MM/DD h:mm') ?? '',
          [CAMPAIGN_API_FIELD_KEY.PROJECT]: campaignsData[CAMPAIGNS_FIELD_KEY.PROJECT] ?? '',
          [CAMPAIGN_API_FIELD_KEY.NEED_TO_DO]: campaignsData[CAMPAIGNS_FIELD_KEY.NEED_TO_DO] ?? '',
          [CAMPAIGN_API_FIELD_KEY.SCHEDUDE_POST]:
            campaignsData[CAMPAIGNS_FIELD_KEY.SCHEDUDE_POST] ?? '',
          [CAMPAIGN_API_FIELD_KEY.PUBLISHED_CONTENT]:
            campaignsData[CAMPAIGNS_FIELD_KEY.PUBLISHED_CONTENT] ?? '',
          [CAMPAIGN_API_FIELD_KEY.PROGRESS]: campaignsData[CAMPAIGNS_FIELD_KEY.PROGRESS] ?? '',

          [CAMPAIGN_API_FIELD_KEY.PUBLISHED]: campaignsData[CAMPAIGNS_FIELD_KEY.PUBLISHED] ?? '',

          [CAMPAIGN_API_FIELD_KEY.DATA]:
            JSON.stringify(campaignsData[CAMPAIGN_API_FIELD_KEY.DATA]) ?? '',
        }
      : null;

    return result;
  }
}

export default CampaignsModel;
