/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';

import ItemComplete from './ItemComplete';

const data = [
  {
    key: 1,
    title: 'Marketing Vietnam Suntory PepsiCo',
    complete: [
      {
        key: 1,
        name: 'green',
        number: '50',
        text: 'Completed',
      },
      {
        key: 2,
        name: 'yellow',
        number: '30',
        text: 'In Progress',
      },
      {
        key: 3,
        name: 'red',
        number: '20',
        text: 'To Do',
      },
    ],
  },
  {
    key: 2,
    title: "Marketing Vietnam Levi's",
    complete: [
      {
        key: 1,
        name: 'green',
        number: '40',
        text: 'Completed',
      },
      {
        key: 2,
        name: 'yellow',
        number: '30',
        text: 'In Progress',
      },
      {
        key: 3,
        name: 'red',
        number: '40',
        text: 'To Do',
      },
    ],
  },
  {
    key: 3,
    title: 'Marketing Vietnam Nikon',
    complete: [
      {
        key: 1,
        name: 'green',
        number: '50',
        text: 'Completed',
      },
      {
        key: 2,
        name: 'yellow',
        number: '10',
        text: 'In Progress',
      },
      {
        key: 3,
        name: 'red',
        number: '40',
        text: 'To Do',
      },
    ],
  },
  {
    key: 4,
    title: 'Marketing Vietnam Dunkin Donuts',
    complete: [
      {
        key: 1,
        name: 'green',
        number: '20',
        text: 'Completed',
      },
      {
        key: 2,
        name: 'yellow',
        number: '20',
        text: 'In Progress',
      },
      {
        key: 3,
        name: 'red',
        number: '60',
        text: 'To Do',
      },
    ],
  },
  {
    key: 5,
    title: 'Marketing Vietnam Dunkin Donuts',
    complete: [
      {
        key: 1,
        name: 'green',
        number: '35',
        text: 'Completed',
      },
      {
        key: 2,
        name: 'yellow',
        number: '35',
        text: 'In Progress',
      },
      {
        key: 3,
        name: 'red',
        number: '30',
        text: 'To Do',
      },
    ],
  },
  {
    key: 6,
    title: 'Marketing Vietnam Casablanca',
    complete: [
      {
        key: 1,
        name: 'green',
        number: '45',
        text: 'Completed',
      },
      {
        key: 2,
        name: 'yellow',
        number: '35',
        text: 'In Progress',
      },
      {
        key: 3,
        name: 'red',
        number: '30',
        text: 'To Do',
      },
    ],
  },
];

class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t } = this.props;
    return (
      <div className="bg-white p-3">
        <div className="d-flex justify-content-between mb-2">
          <h4>{t('txt_task_complete')}</h4>
          <p className="mb-0 fs-14">{t('txt_more')}</p>
        </div>
        <div className="wrapper_line_complete row d-flex flex-wrap">
          {data.map((value, key) => {
            return (
              <div key={key} className="item_line_complete col-4 mb-4">
                <ItemComplete value={value} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(Complete);
