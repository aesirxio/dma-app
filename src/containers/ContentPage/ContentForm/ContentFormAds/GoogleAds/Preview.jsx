import { observer } from 'mobx-react';
import React, { lazy } from 'react';

const DisplayAdsPreview = lazy(() => import('./DisplayAds/Preview'));

const Preview = observer(({ format, previewData }) => {
  console.log('Preview render', previewData);
  const getAdsPreview = (format) => {
    switch (format) {
      default:
        return <DisplayAdsPreview previewData={previewData} />;
    }
  };

  return (
    <>
      <h4>Preview</h4>
      {getAdsPreview()}
    </>
  );
});

export default Preview;
