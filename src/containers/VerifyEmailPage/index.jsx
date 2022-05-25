import React from 'react';
import { withTranslation } from 'react-i18next';
import BannerLeft from '../../components/BannerLeft';
import history from '../../routes/history';
import { DataSlider } from './DataSlider';
import LeftLayout from './Layout/LeftLayout';
import RightLayout from './Layout/RightLayout';
import ResendActionEmail from './ResendActivationEmail/ResendActivationEmail';
import VerifyEmailStore from './VerifyEmailStore/VerifyEmailStore';
import VerifyEmailViewModel from './VerifyEmailViewModel/VerifyEmailViewModel';
import { VerifyEmailViewModelContextProvider } from './VerifyEmailViewModel/VerifyEmailViewModelContextProvider';

const verifyEmailStore = new VerifyEmailStore();
const verifyEmailViewModel = new VerifyEmailViewModel(verifyEmailStore);

class VerifyEmail extends React.Component {
  render() {
    const { t, i18n } = this.props;
    const memberInfo = history.location.state;
    return (
      <VerifyEmailViewModelContextProvider viewModel={verifyEmailViewModel}>
        <div className="row">
          <BannerLeft dataSlider={DataSlider} />
          <RightLayout>
            <ResendActionEmail memberInfo={memberInfo} t={t} />
          </RightLayout>
        </div>
      </VerifyEmailViewModelContextProvider>
    );
  }
}

export default withTranslation('common')(VerifyEmail);
