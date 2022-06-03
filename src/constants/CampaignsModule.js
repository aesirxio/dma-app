/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const CAMPAIGNS_FIELD_KEY = {
  ID: 'campaigns-id',
  PROJECT: 'campaigns-project',
  NAME: 'campaigns-name',
  STATUS: 'campaigns-status',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  NEED_TO_DO: 'campaigns-todo',
  SCHEDUDE_POST: 'campaigns-schedude-post',
  PUBLISHED_CONTENT: 'campaigns-published-content',
  PROGRESS: 'campaigns-progress',
  PERCENT_COMPLETE: 'campaigns-percent-complete',
  VALUE: 'value',
  DATA: 'data',
};

const CAMPAIGN_API_FIELD_KEY = {
  ID: 'id',
  NAME: 'title',
  STATUS: 'status',
  PROJECT: 'project',
  START_DATE: 'start_date',
  END_DATE: 'end_date',
  PERCENT_COMPLETE: 'percent_complete',
  NEED_TO_DO: 'no_to_do_posts',
  SCHEDUDE_POST: 'no_scheduled_posts',
  PUBLISHED_CONTENT: 'no_published_posts',
  DATA: 'data',
};

export { CAMPAIGNS_FIELD_KEY, CAMPAIGN_API_FIELD_KEY };
