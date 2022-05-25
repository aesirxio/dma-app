import React from 'react';

import StepWizard from 'react-step-wizard';
import Ads from './Ads';
import Campaign from './Campaign';

const ContentFormAdsFacebookAds = (props) => {
  console.log('ContentFormAdsFacebookAds', props.channelData);

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
