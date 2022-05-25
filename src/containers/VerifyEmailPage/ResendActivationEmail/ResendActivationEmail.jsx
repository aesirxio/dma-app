import React from 'react';
import { observer } from 'mobx-react';
import { withVerifyEmailViewModel } from '../VerifyEmailViewModel/VerifyEmailViewModelContextProvider';
import ButtonNormal from '../../../components/ButtonNormal';
import TitleAccount from '../../../components/TitlePageAccount';

const ResendActionEmail = observer(
  class ResendActionEmail extends React.Component {
    resendActivationEmailViewModel = null;

    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.resendActivationEmailViewModel = viewModel
        ? viewModel.getResendActivationEmailViewModel()
        : null;
    }

    resendActivationEmailHandler = (memberId) => {
      this.resendActivationEmailViewModel.loadingStatus = true;
      if (memberId) {
        this.setState({ loading: true });
        this.resendActivationEmailViewModel.resendActivationEmailOnPage(memberId);
      }
    };

    render() {
      const { t, memberInfo = {} } = this.props;
      let loadingStatus = this.resendActivationEmailViewModel
        ? this.resendActivationEmailViewModel.loadingStatus
        : null;
      let mailString = memberInfo.email;
      return (
        <>
          <TitleAccount title={t('txt_verify_your_email_address')} />
          <div className="mb-4">
            {t('txt_a_verification_email_has_been_sent_to_your_email')}
            {mailString && (
              <a href={`mailto:${mailString}`} className="d-block">
                {mailString}
              </a>
            )}
          </div>

          <div className="mb-4">{t('txt_please_check_your_email', { characters: '"' })}</div>

          <div className="mb-4">{t('txt_if_you_do_not_receive_the_email')}</div>

          {loadingStatus ? (
            <button className="btn btn-success" disabled={loadingStatus}>
              <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </button>
          ) : (
            <ButtonNormal
              text={t('txt_resend_email')}
              onClick={() => {
                this.resendActivationEmailHandler(memberInfo.id);
              }}
              disabled={!memberInfo}
            />
          )}
        </>
      );
    }
  }
);

export default withVerifyEmailViewModel(ResendActionEmail);
