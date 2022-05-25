import React from 'react';
import { observer } from 'mobx-react';
import { SIGNUP_FIELD_KEY } from '../../../constants/SignUpModule';
import { withSignUpViewModel } from '../SignUpViewModel/SignUpViewModelContextProvider';
import ButtonNormal from '../../../components/ButtonNormal';
import SimpleReactValidator from 'simple-react-validator';
import { notify } from '../../../components/Toast';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { AesirxMemberApiService } from 'aesirx-dma-lib';
import _ from 'lodash';
import InputPassword from '../../../components/inputPassword';

const SignUpForm = observer(
  class SignUpForm extends React.Component {
    signupFormViewModel = null;

    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        formPropsData: {
          [SIGNUP_FIELD_KEY.USERNAME]: '',
          [SIGNUP_FIELD_KEY.EMAIL]: '',
          [SIGNUP_FIELD_KEY.PASSWORD]: '',
        },
        isChecking: false,
        isUsernameInUse: false,
        isEmailInUse: false,
      };
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      const { viewModel } = props;
      this.signupFormViewModel = viewModel ? viewModel.getSignUpFormViewModel() : null;
      this.handleInputChange = this.handleInputChange.bind(this);
      this.validateInfoBeforeSending = this.validateInfoBeforeSending.bind(this);
      this.signupAPIService = new AesirxMemberApiService();
      this.onCheckFieldHandler = this.onCheckFieldHandler.bind(this);
    }

    onCheck = _.debounce((e, fieldName) => {
      this.setState({ isChecking: true });
      this.onCheckFieldHandler(fieldName, e);
      console.log('Debounced Event:', fieldName);
    }, 1000);

    resetValue(content_id) {
      if (content_id === 'existed_email') {
        notify('Email existed. Choose another email', 'error');
        this.setState({ formPropsData: { email: '', password: '', username: '' } });
        this.setState({ loading: false });
      } else if (content_id === 'duplicated_username') {
        notify('Username existed. Choose another username', 'error');
        this.setState({ formPropsData: { email: '', password: '', username: '' } });
        this.setState({ loading: false });
      }
      this.signupFormViewModel.successResponse.state = true;
    }

    handleInputChange(value, fieldName) {
      if (fieldName === 'password') {
        this.setState({ formPropsData: { ...this.state.formPropsData, password: value } });
      } else if (fieldName === 'username') {
        this.setState({ formPropsData: { ...this.state.formPropsData, username: value } });
      } else if (fieldName === 'email') {
        this.setState({ formPropsData: { ...this.state.formPropsData, email: value } });
      }
      this.onCheck(value, fieldName);
      console.log(this.state);
    }

    async onCheckFieldHandler(fieldName, value) {
      if (fieldName === 'email') {
        this.setState({ formPropsData: { ...this.state.formPropsData, email: value } });
        const result = await this.signupAPIService.checkEmail({ email: value });

        if (!result.result.result) {
          this.setState({ isEmailInUse: true });
        } else {
          this.setState({ isEmailInUse: false });
        }
        console.error('RESULT', result);
      } else if (fieldName === 'username') {
        this.setState({ formPropsData: { ...this.state.formPropsData, username: value } });
        const result = await this.signupAPIService.checkUsername({ username: value });
        if (!result.result.result) {
          this.setState({ isUsernameInUse: true });
        } else {
          this.setState({ isUsernameInUse: false });
        }
        console.error('RESULT', result);
      }
      console.error(this.state);
      this.setState({ isChecking: false });
    }

    saveMemberHandler = () => {
      if (this.state.isChecking || this.state.isEmailInUse || this.state.isUsernameInUse) {
        this.setState({ loading: false });
        return;
      }
      this.signupFormViewModel.saveMemberOnPage(this.state.formPropsData);
    };

    onKeyPress = (e) => {
      if (e.which === 13) {
        this.validateInfoBeforeSending();
      }
    };

    blurringFieldHandler = () => {
      this.validator.hideMessageFor('username');
    };

    validateInfoBeforeSending = () => {
      if (this.validator.allValid()) {
        if (this.state.loading) {
          return;
        }
        this.setState({ loading: true });
        this.saveMemberHandler();
      } else {
        this.validator.showMessages();
      }
    };

    componentDidMount() {}

    render() {
      const { handleInputChange } = this;
      const t = this.props.t;
      let successResponse = this.signupFormViewModel
        ? this.signupFormViewModel.successResponse
        : null;
      let stateLoading = this.state.loading && successResponse.state;
      if (!successResponse.state) this.resetValue(successResponse.content_id);
      this.validator.purgeFields();
      return (
        <>
          <form>
            <label className="form-label" htmlFor="username">
              {t('txt_username')} <span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              disabled={this.state.loading}
              autoFocus={true}
              name="username"
              onChange={(e) => handleInputChange(e.target.value, 'username')}
              value={this.state.formPropsData[SIGNUP_FIELD_KEY.USERNAME]}
              onBlur={() => {
                this.validator.showMessageFor('username');
              }}
            />
            {this.state.isUsernameInUse ? (
              <div className="text-danger">{t('txt_already_exists')}</div>
            ) : (
              this.validator.message(
                'username',
                this.state.formPropsData[SIGNUP_FIELD_KEY.USERNAME],
                'required|min:6|max:30',
                { className: 'text-danger' }
              )
            )}
            <label className="form-label mt-3" htmlFor="email">
              {t('txt_email')} <span>*</span>
            </label>
            <input
              type="email"
              className="form-control"
              disabled={this.state.loading}
              name="email"
              value={this.state.formPropsData[SIGNUP_FIELD_KEY.EMAIL]}
              onChange={(e) => handleInputChange(e.target.value, 'email')}
              id="email"
              onBlur={() => {
                this.validator.showMessageFor('email');
              }}
            />
            {this.state.isEmailInUse ? (
              <div className="text-danger">{t('txt_email_already_exists')}</div>
            ) : (
              this.validator.message(
                'email',
                this.state.formPropsData[SIGNUP_FIELD_KEY.EMAIL],
                'required|email',
                { className: 'text-danger' }
              )
            )}
            <label className="form-label mt-3" htmlFor="password">
              {t('txt_password')} <span>*</span>
            </label>
            <InputPassword
              type="password"
              className="form-control"
              disabled={this.state.loading}
              onChange={(event) => handleInputChange(event.target.value, 'password')}
              id="password"
              name="password"
              value={this.state.formPropsData[SIGNUP_FIELD_KEY.PASSWORD]}
              onKeyPress={this.onKeyPress}
              onBlur={() => {
                this.validator.showMessageFor('password');
              }}
            />
            {this.validator.message(
              'password',
              this.state.formPropsData[SIGNUP_FIELD_KEY.PASSWORD],
              'required|min:6|max:30',
              { className: 'text-danger' }
            )}
            <ButtonNormal
              iconEnd={faChevronRight}
              text={
                stateLoading ? (
                  <>
                    Sign up
                    <div className="ps-2 btn_loading">
                      <div
                        className="spinner-border"
                        style={{ width: '1.7rem', height: '1.7rem' }}
                        role="status"
                      >
                        <span className="visually-hidden">{t('txt_loading')}...</span>
                      </div>
                    </div>
                  </>
                ) : (
                  'Sign up'
                )
              }
              onClick={this.validateInfoBeforeSending}
              disabled={this.state.loading}
              className={
                'btn w-100 fw-medium btn-success position-relative d-flex align-item-center justify-content-center wr_btn_login mt-3'
              }
            />
            <div className="mt-3">
              {t('txt_you_agree_to_our')}{' '}
              <a target={`_blank`} href="https://redweb.digital/terms-of-service">
                {t('txt_terms_of_service')}{' '}
              </a>{' '}
              {t('txt_and')}{' '}
              <a target={`_blank`} href="https://redweb.digital/privacy-policy">
                {t('txt_privacy_policy')}
              </a>
              .
            </div>
            <a href="/login" className="d-flex justify-content-center mt-1 mb-4">
              {t('txt_already_have_an_account')}
            </a>
          </form>
        </>
      );
    }
  }
);

export default withSignUpViewModel(SignUpForm);
