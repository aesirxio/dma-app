import React from 'react';
import { withTranslation } from 'react-i18next';
import { AesirxMemberApiService } from 'aesirx-dma-lib';

import './index.scss';

import BannerLeft from '../../components/BannerLeft';
import TitleAccount from '../../components/TitlePageAccount';
import { notify } from '../../components/Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import history from '../../routes/history';
import SimpleReactValidator from 'simple-react-validator';

const dataSlider = [
  {
    text: 'Building a Global Media Content Marketing Team requires structure, process and automation we utilize technology to make this happen',
    title: 'Ronni K. Gothard Christiansen',
    subtitle: 'CEO & Founder R Digital',
  },
];

class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { email: '' },
      isSubmitting: false,
    };
    this.onResetPasswordHandler = this.onResetPasswordHandler.bind(this);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }

  async onResetPasswordHandler(event) {
    if (this.state.isSubmitting) {
      return;
    }

    if (this.validator.allValid()) {
      this.setState({ isSubmitting: true });
      event.target.classList.add('wr_btn_submitting');
      console.log(this.state.data);
      const signupAPIService = new AesirxMemberApiService();
      const result = await signupAPIService.sendResetPasswordEmail(this.state.data);
      console.log(result);
      if (!result.result.success) {
        if (result.result.content_id === 'COM_USERS_INVALID_EMAIL') {
          notify('email not exist', 'error');
        }
      } else {
        notify(
          'We have sent you an email with the details to reset your password. Follow steps there to finish registration.'
        );
        history.push('/');
      }

      this.setState({ isSubmitting: false });
      event.target.classList.remove('wr_btn_submitting');
    } else {
      this.validator.showMessages();
    }
  }

  onEmailFieldHandler = (event) => {
    this.setState({ data: { email: event.target.value } });
  };

  render() {
    const { onResetPasswordHandler, onEmailFieldHandler } = this;
    const { t, i18n } = this.props;

    return (
      <div className="row">
        <BannerLeft dataSlider={dataSlider} />
        <div className="col-md-8 d-flex flex-column justify-content-center align-items-center mt-5">
          <div className="d-block page-data-submit">
            <TitleAccount title={t('txt_forgot_your_password')} mb={'mb-1'}/>

            <div className="description_reset text-black mb-3">
              {t('txt_well_email_you_instructions_on_how_to_reset_your_password')}
            </div>

            <form>
              <label className="form-label mb-3 text-black" htmlFor="email">
                {t('txt_email')} <code>*</code>
              </label>
              <div className="mb-4">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={onEmailFieldHandler}
                  onBlur={() => {
                    this.validator.showMessageFor('email');
                  }}
                />
                {this.validator.message('email', this.state.data.email, ['required', 'email'], {
                  className: 'text-danger',
                })}
              </div>
              <button
                type="button"
                className={`btn w-100 fw-medium btn-success position-relative d-flex align-item-center justify-content-center`}
                onClick={onResetPasswordHandler}
              >
                {t('txt_reset_password')}
                <div className="ps-2 btn_loading">
                  <div
                    className="spinner-border"
                    style={{ width: '1.7rem', height: '1.7rem' }}
                    role="status"
                  />
                </div>
                <i className="ms-1 btn_icon_submit">
                  <FontAwesomeIcon icon={faChevronRight} />
                </i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(ForgotPasswordPage);
