/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const CONTENT_FIELD_KEY = {
  ID: 'content-id',
  NAME: 'content-name',
  DESCRIPTION: 'content-description',
  THEME: 'content-theme',
  CUSTOMIZE_SCHEDULE_FOR_EACH_CHANNEL: 'content-customize-schedule-for-each-channel',
  PUBLISH_DATE: 'content-publish-date',
  PUBLISH_REGULARLY: 'content-publish-regularly',
  SCHEDULE_CHANNEL: 'content-schedule-channel',
  DATE_FROM: 'content-date-from',
  DATE_UNTIL: 'content-date-until',
  TIME: 'content-time',
  PERSONA: 'content-persona',
  PROJECT: 'content-project',
  CAMPAIGN: 'content-campaign',
  CHANNELS: 'content-channels',
  STATUS: 'content-status',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
  APPROVAL: 'content-approval',
  CONTENT_THEMES: 'content-themes',
  CANVA_EXPORTED_URL: 'canva-exported-url',
  CANVA_DESIGN_ID: 'canva-design-id',
  DAM: 'damAssets',
  EDIT: 'content-edit',
  MODE: 'mode',
  CANVA: 'canva',
  PUBLISH_MODE: 'publishingType',
  DESELECTED: 'deselected',
  DATE: 'date',
  ADS: 'content-ads',
  ENTITY: 'entity',
};

const CONTENT_PUBLISH_MODE = {
  NOW: 'post_now',
  SCHEDULE: 'schedule_post',
};

const CONTENT_POST_TYPE = {
  POST: 'post',
  DRAFT: 'save_as_draft',
};

const CONTENT_DESCRIPTION_MODE = {
  BASIC: 'basic',
  ADVANCE: 'advance',
};

const CONTENT_STATUS = {
  save_as_draft: 'Draft',
  processing: 'Processing',
  posted: 'Posted',
  failed: 'Failed',
  schedule: 'Scheduled',
};

const ESI_CONTENT_API_RESPONSE_FIELD_KEY = {
  ID: 'id',
  HEADLINE: 'headline',
  DESCRIPTION: 'description',
  THEME: 'theme',
  CUSTOMIZE_SCHEDULE_FOR_EACH_CHANNEL: 'customize_schedule_for_each_channel',
  PUBLISH_DATE: 'publish_date',
  PUBLISH_REGULARLY: 'publish_regularly',
  SCHEDULE_CHANNEL: 'schedule_channel',
  DATE_FROM: 'date_from',
  DATE_UNTIL: 'date_until',
  TIME: 'time',
  PERSONA: 'persona',
  CAMPAIGN: 'campaign',
  PROJECT: 'project',
  STATUS: 'status',
  CHANNEL_ATTACHMENTS: 'channel_attachments',
  CONTENT_THEMES: 'content_themes',
  CONTENT_TO_POST: 'content_to_post',
  CANVA_EXPORTED_URL: 'canva_exported_url',
  CANVA_DESIGN_ID: 'canva_design_id',
  DAM: 'damAssets',
  CHANNELS: 'channels',
  MODE: 'mode',
  GENERAL: 'general',
  PUBLISH_TYPE: 'publishing_type',
  DATE: 'date',
  CHANNEL_TYPE: 'channel_type',
  CHANNEL_NAME: 'channel_name',
  ITEMS: 'items',
  ENTITY: 'entity',
};

export {
  CONTENT_FIELD_KEY,
  ESI_CONTENT_API_RESPONSE_FIELD_KEY,
  CONTENT_DESCRIPTION_MODE,
  CONTENT_PUBLISH_MODE,
  CONTENT_POST_TYPE,
  CONTENT_STATUS,
};
