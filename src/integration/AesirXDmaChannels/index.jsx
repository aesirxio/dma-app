import React from 'react';
import { Toast } from 'aesirx-uikit';
import ErrorBoundary from 'layouts/ErrorBoundary';
import i18n from 'translations/i18n';
import { I18nextProvider } from 'react-i18next';
import ChannelsPage from 'containers/ChannelsPage';

const AesirXDmaChannels = (props) => {
  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <Toast />
        <ChannelsPage {...props} />
      </I18nextProvider>
    </ErrorBoundary>
  );
};

export default AesirXDmaChannels;
