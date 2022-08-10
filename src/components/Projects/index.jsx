/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import ComponentNoData from '../ComponentNoData';
import ComponentAccordion from '../ComponentAccordion';
import './index.scss';
import { withTranslation } from 'react-i18next';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { projects, PROJECT_COLUMN_INDICATOR } = this.props;
    const {t} = this.props;
    return (
      <ComponentAccordion id="project" title="Projects">
        {projects ? (
          <>
            <div className="py-2 px-3 bg-blue">
              <div className="row">
                <div className="col-9">
                  <span>{t("project_name")}</span>
                </div>
                <div className="col-3 d-none">
                  <span>{t("txt_lead")}</span>
                </div>
              </div>
            </div>
            <div className="px-3">
              {projects.map((value, key) => {
                return (
                  <div key={key} className="row py-3 border-bottom-1 item_project">
                    <div className="col-9">
                      <div className="d-flex align-items-center">
                        <span>{value[PROJECT_COLUMN_INDICATOR.NAME]}</span>
                      </div>
                    </div>
                    <div className="col-3 d-none">
                      <div className="d-flex align-items-center">
                        <img src={'/assets/images/avatar-4.png'} alt="" className="img-avatar" />
                        <span className="ps-3">{t("txt_peter_stanbridge")}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {projects.length >= 5 && (
              <div className="text-end mt-3">
                <a href="/projects" className="mb-0 text-decoration-underline">
                 {t("txt_show_more")}
                </a>
              </div>
            )}
          </>
        ) : (
          <ComponentNoData
            icons="/assets/images/ic_project.svg"
            title="Create your 1st project"
            linlText="Create project"
            link="/projects"
            width="w-50"
          />
        )}
      </ComponentAccordion>
    );
  }
}

export default withTranslation('common') (Projects);
