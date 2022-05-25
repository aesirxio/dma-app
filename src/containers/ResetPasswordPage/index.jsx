import React from 'react';
import './index.scss';
import BannerLeft from '../../components/BannerLeft';
import TitleAccount from '../../components/TitlePageAccount';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { AesirxMemberApiService } from 'aesirx-dma-lib';
import { notify } from '../../components/Toast';
import history from '../../routes/history';
import SimpleReactValidator from 'simple-react-validator';

const dataSlider = [
  {
    text: 'Building a Global Media Content Marketing Team requires structure, process and automation we utilize technology to make this happen',
    title: 'Ronni K. Gothard Christiansen',
    subtitle: 'CEO & Founder R Digital',
  },
];

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: { activation_code: '', username: '' },
      password: '',
      confirmPassword: '',
      isProcessing: false,
    };
    this.onResetPasswordHandler = this.onResetPasswordHandler.bind(this);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }

  componentDidMount() {
    this.setState({
      data: {
        activation_code: this.props.match.params.activation,
        username: this.props.match.params.username,
      },
    });
  }

  async onResetPasswordHandler(event) {
    if (this.state.isPasswordNotMatch) {
      notify('Passwords do not match', 'error');
      return;
    }

    if (this.state.isProcessing) {
      return;
    }

    if (this.validator.allValid()) {
      this.setState({ ...this.state, isProcessing: true });
      event.target.classList.add('wr_btn_submitting');

      const signupAPIService = new AesirxMemberApiService();
      const result = await signupAPIService.checkToResetPassword(this.state.data);
      console.log(result);

      if (result.result.success) {
        this.setState({
          ...this.state,
          data: {
            activation: result.result.activation,
            id: result.result.user_id,
            new_password: this.state.password,
          },
        });
        const newResult = await signupAPIService.newPasswordToResetPassword(this.state.data);
        console.log(newResult);
        if (newResult.result.success) {
          notify('We have changed your password.');
          history.push('/login');
        } else {
          notify('Something is wrong. Please try another request!', 'error');
        }
      } else {
        notify('Something is wrong. Please try another request!', 'error');
        console.log(result);
      }

      this.setState({ ...this.state, isProcessing: false });
      event.target.classList.remove('wr_btn_submitting');
      console.log(this.state);
    } else {
      this.validator.showMessages();
    }
  }

  onChangePassword = (event) => {
    this.setState({ ...this.state, password: event.target.value });
    console.log(this.state);
  };

  onChangeConfirmPassword = (event) => {
    if (this.state.password !== event.target.value) {
      this.setState({
        ...this.state,
        confirmPassword: event.target.value,
        isPasswordNotMatch: true,
      });
    } else {
      this.setState({
        ...this.state,
        confirmPassword: event.target.value,
        isPasswordNotMatch: false,
      });
    }
    console.log(this.state);
  };

  render() {
    const { t } = this.props;
    const { onResetPasswordHandler, onChangePassword, onChangeConfirmPassword } = this;
    return (
      <div className="row">
        <BannerLeft dataSlider={dataSlider} />
        <div className="col-md-8 d-flex flex-column justify-content-center align-items-center">
          <div className="d-block page-data-submit w-40">
            <TitleAccount title={t('txt_reset_password')} mb={'mb-3'} />
            <form>
              <label className="form-label mb-2" htmlFor="password">
                {t('txt_password')} <span>*</span>
              </label>
              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  onChange={onChangePassword}
                  onBlur={() => {
                    this.validator.showMessageFor('password');
                  }}
                />
                {this.validator.message('password', this.state.password, 'required', {
                  className: 'text-danger',
                })}
              </div>
              <label className="form-label mb-2" htmlFor="password">
                {t('txt_confirm_password')} <span>*</span>
              </label>
              <div className="mb-1">
                <input
                  type="password"
                  className="form-control"
                  onChange={onChangeConfirmPassword}
                  onBlur={() => {
                    this.validator.showMessageFor('confirmPassword');
                  }}
                />
                {this.validator.message('confirmPassword', this.state.password, 'required', {
                  className: 'text-danger',
                })}
                <span className="text-danger password-error">
                  {this.state.isPasswordNotMatch ? 'Passwords do not match' : ' '}
                </span>
              </div>
              <button
                type="button"
                className={`btn w-100 fw-medium btn-success position-relative d-flex align-item-center justify-content-center mt-1`}
                onClick={onResetPasswordHandler}
              >
                {t('txt_reset_password')}
                <div className="ps-2 btn_loading">
                  <div
                    className="spinner-border"
                    style={{ width: '1.7rem', height: '1.7rem' }}
                    role="status"
                  ></div>
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

export default withTranslation('common')(withRouter(ResetPasswordPage));
