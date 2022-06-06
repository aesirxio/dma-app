/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import ComponentImage from '../ComponentImage';

import './index.scss';

const data = [
  {
    key: 1,
    image: '/assets/images/icon-gap.png',
    projectName: "Shop Gap for Casual Women's, Men's",
    task: '[Design_EN] Credential Digital Marketing',
    status: 'In progress',
    statusName: 'bg-status-1',
  },
  {
    key: 2,
    image: '/assets/images/icon-gap.png',
    projectName: "Shop Gap for Casual Women's, Men's",
    task: '[Design] Post 15 - Video Introduction',
    status: 'In progress',
    statusName: 'bg-status-1',
  },
  {
    key: 3,
    image: '/assets/images/icon-nikon.png',
    projectName: '[Design] Facebook - F&B Solution - Multi Photos',
    task: '[Design] Post 15 - Video Introduction',
    status: 'In progress',
    statusName: 'bg-status-1',
  },
  {
    key: 4,
    image: '/assets/images/icon-adidas.png',
    projectName: '[Design] Facebook - F&B Solution - Multi Photos',
    task: 'Upload Motion graphics Demo',
    status: 'To do',
    statusName: 'bg-status-2',
  },
];

class AssignedToMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { t } = this.props;
    return (
      <div className="bg-white p-3">
        <div className="d-flex justify-content-between mb-2">
          <h4>{t('txt_assigned_to_me')}</h4>
          <p className="mb-0 fs-14">{t('txt_more')}</p>
        </div>
        <div className="py-2 px-3 bg-blue">
          <div className="row">
            <div className="col-4">
              <span>Project</span>
            </div>
            <div className="col-6">
              <span>Task</span>
            </div>
            <div className="col-2">
              <span>Status</span>
            </div>
          </div>
        </div>
        <div className="px-3">
          {data.map((value, key) => {
            return (
              <div key={key} className="row py-3 border-bottom-1 item_project">
                <div className="col-4">
                  <div className="d-flex align-items-center">
                    <ComponentImage alt={value.image} src={value.image} className="img-avatar" />
                    <span className="ps-3">{value.projectName}</span>
                  </div>
                </div>
                <div className="col-6">
                  <span>{value.task}</span>
                </div>
                <div className="col-2">
                  <span
                    className={`mw-100 h-35 fs-14 d-table-cell align-middle text-center rounded-2 ${value.statusName}`}
                  >
                    {value.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(AssignedToMe);
