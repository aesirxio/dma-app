/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const PERSONA_FIELD_KEY = {
  ID: 'personal-id',
  NAME: 'personal-name',
  DG_NAME: 'personal-dg-name',
  CHANNELS: 'personal-channel',
  AGE: 'personal-age',
  GENDER: 'personal-gender',
  LOCATION: 'personal-location',
  ALL_COUNTRIES: 'personal-all-countries',
  TOOLS: 'personal-tools',
  JOB_TITLE: 'personal-job-title',
  WEBSITE: 'personal-job-website',
  SECTOR: 'personal-job-sector',
  VENDOR_RESEARCH: 'personal-vendor-research',
  INTEREST: 'personal-interest',
  GOALS: 'personal-goals',
  MARITAL_STATUS: 'personal-marital-status',
  CHALLENGES: 'personal-challenges',
  PAINT_POINT: 'personal-paint-point',
  AVATAR: 'personal-avatar',
  AVATAR_2: 'personal-avatar',
  BIO: 'personal-bio',
  CREATED_DATE: 'created-date',
  UPDATED_DATE: 'updated-date',
  IMAGE: 'personal-image',
  EDUCATION: 'personal-education',
  DEMOGRAPHICS_SELECT: 'personal-demographics-select',
  DEMOGRAPHICS_TYPE: 'personal-demographics-type',
  INTERESTS_SELECT: 'personal-interests-select',
  INTERESTS_TYPE: 'personal-interests-type',
  BEHAVIORS_SELECT: 'personal-behaviors-select',
  BEHAVIORS_TYPE: 'personal-behaviors-type',
  AGE_FROM: 'personal-age-from',
  AGE_TO: 'personal-age-to',
};

const ESI_PERSONA_FIELD_KEY = {
  ID: 'id',
  NAME: 'title',
  DG_NAME: 'name',
  CHANNEL: 'channels',
  AGE: 'age',
  GENDER: 'gender',
  LOCATION: 'location',
  ALL_COUNTRIES: 'location_all_contries',
  TOOLS: 'tools',
  JOB_TITLE: 'job_title',
  WEBSITE: 'website',
  SECTOR: 'sector',
  VENDOR_RESEARCH: 'vendor_research',
  INTEREST: 'interests',
  GOALS: 'goals',
  MARITAL_STATUS: 'marital_status',
  CHALLENGES: 'challenges',
  PAINT_POINT: 'paint_point',
  AVATAR: 'avatar',
  AVATAR_2: 'avatar_2',
  BIO: 'bio',
  CREATED_DATE: 'created_date',
  MODIFIED_DATE: 'modified_date',
  EDUCATION: 'education',
  DEMOGRAPHICS_SELECT: 'demographics_select',
  DEMOGRAPHICS_TYPE: 'demographics_type',
  INTERESTS_SELECT: 'interests_select',
  INTERESTS_TYPE: 'interests_type',
  BEHAVIORS_SELECT: 'behaviors_select',
  BEHAVIORS_TYPE: 'behaviors_type',
  AGE_FROM: 'age_from',
  AGE_TO: 'age_to',
};

// Todo: get from API
const GENDER = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

// Todo: get from API
const MARITAL_STATUS = [
  { value: 'maritalStatus', label: 'Marital Status' },
  { value: 'maritalStatus2', label: 'Marital Status2' },
];

const PERSONA_COLUMN_INDICATOR = {
  ID: 'id',
  NAME: 'name',
};

const PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR = {
  ID: 'id',
  NAME: 'name',
  LABEL: 'label',
  VALUE: 'value',
};

export {
  PERSONA_FIELD_KEY,
  ESI_PERSONA_FIELD_KEY,
  GENDER,
  MARITAL_STATUS,
  PERSONA_COLUMN_INDICATOR,
  PERSONA_TABLE_SELECTION_MODAL_COLUMN_INDICATOR,
};
