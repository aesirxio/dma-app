/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';
import ComponentImage from '../ComponentImage';

class Upgrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="wrapper_upgrade text-center pb-3">
        <div className="item_upgrade mb-2">
          <ComponentImage src="/assets/images/annotation.png" alt="annotation" />
        </div>
        <p className="item_upgrade mb-2">
          <span>Unlock more features now! Upgrade to </span>
          <span className="text-uppercase text-green fw-bold cursor-pointer">OTHER PLAN</span>
        </p>
        <div>
          <a href="/billing-plan" className="link_upgrade btn btn-success w-100">
            <i>
              <FontAwesomeIcon icon={faCog} />
            </i>
            <span className="ms-2">Upgrade</span>
          </a>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(Upgrade);
