/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import StepWizard from 'react-step-wizard';
import Ads from './Ads';
import Campaign from './Campaign';

const ContentFormAdsFacebookAds = (props) => {
  return (
    <div className="pt-3">
      <StepWizard
        isLazyMount={true}
        transitions={{
          enterRight: '',
          enterLeft: '',
          exitRight: '',
          exitLeft: '',
        }}
        initialStep={1}
      >
        <Ads stepName={'ads'} formPropsData={props.formPropsData} />
        <Campaign stepName={'campaign'} formPropsData={props.formPropsData} />
      </StepWizard>
    </div>
  );
};

export default ContentFormAdsFacebookAds;
