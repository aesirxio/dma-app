/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import SelectComponentAds from './SelectComponentAds';

class ComponentFBITads extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { getDataValueSelectedPersona } = this.props;

    return (
      <div className="wrapper_tabs wrapper_tabs_2">
        <Tabs
          defaultActiveKey={
            getDataValueSelectedPersona && getDataValueSelectedPersona.indexOf('fbad') > -1
              ? '1'
              : '2'
          }
          id="fbit-tab"
          className={`${
            getDataValueSelectedPersona &&
            (getDataValueSelectedPersona.indexOf('fbad') > -1 ||
              getDataValueSelectedPersona.indexOf('google_ads') > -1)
              ? 'border-bottom-1 border-color'
              : ''
          }`}
        >
          {getDataValueSelectedPersona && getDataValueSelectedPersona.indexOf('fbad') > -1 && (
            <Tab eventKey={1} title={'Facebook/Instagram Ads'}>
              <SelectComponentAds
                title={'Demographics'}
                getDataSelectOptions={this.props.getDataSelectOptionsFBITDemographics}
              />
              <SelectComponentAds
                title={'Interests'}
                getDataSelectOptions={this.props.getDataSelectOptionsFBITInterests}
              />
              <SelectComponentAds
                title={'Behaviours'}
                getDataSelectOptions={this.props.getDataSelectOptionsFBITBehaviours}
              />
            </Tab>
          )}
          {getDataValueSelectedPersona && getDataValueSelectedPersona.indexOf('google_ads') > -1 && (
            <Tab eventKey={2} title={'Google Ads'}>
              <SelectComponentAds
                title={'Demographics'}
                getDataSelectOptions={this.props.getDataSelectOptionsGGemographics}
              />
              <SelectComponentAds
                title={'Interests'}
                getDataSelectOptions={this.props.getDataSelectOptionsGGInterests}
              />
              <SelectComponentAds
                title={'Behaviours'}
                getDataSelectOptions={this.props.getDataSelectOptionsGGBehaviours}
              />
            </Tab>
          )}
        </Tabs>
      </div>
    );
  }
}

export default ComponentFBITads;
