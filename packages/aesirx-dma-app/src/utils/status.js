/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const STATUS = {
  POSTED: {
    id: 1,
    slug: 'published',
    text: 'Posted',
    className: 'bg-status-1',
  },
  SCHEDULED: {
    id: 2,
    slug: 'scheduled',
    text: 'Scheduled',
    className: 'bg-status-2',
  },
  DRAFT: {
    id: 3,
    slug: 'draft',
    text: 'Draft',
    className: 'bg-status-3',
  },
  PROCESSING: {
    id: 4,
    slug: 'processing',
    text: 'Processing',
    className: 'bg-status-4',
  },
};

const getStatus = (status) => {
  return Object.keys(STATUS)
    .filter((index) => STATUS[index].slug === status)
    .reduce((obj, key) => {
      obj = STATUS[key];
      return obj;
    }, {});
};

export default getStatus;
