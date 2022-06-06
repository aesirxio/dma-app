/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

// import "./index.module.scss";

import BannerLeft from '../../components/BannerLeft';

const dataSlider = [
  {
    text: 'Building a Global Media Content Marketing Team requires structure, process and automation we utilize technology to make this happen',
    title: 'Ronni K. Gothard Christiansen',
    subtitle: 'CEO & Founder R Digital',
  },
];

class WelcomePage extends React.Component {
  render() {
    const { t } = this.props;

    return (
      <div className="row">
        <div className="col-4 bg-primary p-0">
          <BannerLeft dataSlider={dataSlider} />
        </div>
        <div className="col-8 d-flex flex-column justify-content-center align-items-center">
          <div className="d-block text-center">
            <p>{t('txt_we_have_created_a_step_by_step_process')}</p>

            <div className="d-flex align-items-center justify-content-center">
              <a href="/" className="btn btn-outline-success w-25 me-3">
                Skip
              </a>
              <a href="/wizard" className="btn btn-success w-25">
                <span className="me-2">Wizard</span>
                <i>
                  <FontAwesomeIcon icon={faChevronRight} />
                </i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(WelcomePage);
