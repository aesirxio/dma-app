/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import ComponentNoData from '../ComponentNoData';
import ComponentAccordion from '../ComponentAccordion';
export default class Feature extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    const { campaigns, CAMPAIGNS_FIELD_KEY } = this.props;

    return (
      <ComponentAccordion id="feature" title="Feature will be released in Q3/2021">
        {campaigns ? (
          <>
            <div className="py-2 px-3 bg-blue">
              <div className="row">
                <div className="col-6">
                  <span>Feature</span>
                </div>
                <div className="col-3">
                  <span>Type</span>
                </div>
                <div className="col-3">
                  <span>Category</span>
                </div>
              </div>
            </div>
            <div className="px-3">
              {campaigns.map((value, key) => {
                return (
                  <div key={key} className="row py-3 border-bottom-1 item_project">
                    <div className="col-6">
                      <div className="d-flex align-items-center">
                        <span>{value[CAMPAIGNS_FIELD_KEY.NAME]}</span>
                      </div>
                    </div>
                    <div className="col-3">
                      <span>{value[CAMPAIGNS_FIELD_KEY.START_DATE]}</span>
                    </div>
                    <div className="col-3">
                      <span>{value[CAMPAIGNS_FIELD_KEY.END_DATE]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {campaigns.length >= 5 && (
              <div className="text-end mt-3">
                <a href="/campaigns" className="mb-0 text-decoration-underline">
                  Show more
                </a>
              </div>
            )}
          </>
        ) : (
          <ComponentNoData
            icons="/assets/images/ic_campaigns.svg"
            title="Create your 1st campaigns"
            linlText="Create campaign"
            link="/campaigns"
            width="w-50"
          />
        )}
      </ComponentAccordion>
    );
  }
}
