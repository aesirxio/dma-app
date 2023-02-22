/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

import './index.scss';

// import BannerLeft from '../../components/BannerLeft';
import Checkbox from 'components/Checkbox';
import { login } from '../../auth';
import InputPassword from '../../components/inputPassword';
import { SSOButton } from 'aesirx-sso';
import { AesirxAuthenticationApiService, Storage } from 'aesirx-dma-lib';
// const dataSlider = [
//   {
//     text: 'Building a Global Media Content Marketing Team requires structure, process and automation we utilize technology to make this happen',
//     title: 'Ronni K. Gothard Christiansen',
//     subtitle: 'CEO & Founder R Digital',
//   },
// ];
import { env } from 'env';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: env.REACT_APP_DEMO_USER ?? '',
      password: env.REACT_APP_DEMO_PASSWORD ?? '',
      remember: false,
      isProcessing: false,
    };

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.usernameInput = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit() {
    if (this.validator.allValid()) {
      await login(this.state);
    } else {
      this.validator.showMessages();
      return;
    }
  }

  onKeyPress = (e) => {
    if (e.which === 13) {
      this.handleSubmit();
    }
  };

  render() {
    const { t } = this.props;
    const onGetData = async (response) => {
      const authService = new AesirxAuthenticationApiService();
      await authService.setTokenUser(response, false);
      Storage.setItem('auth', true);
      window.location.reload();
    };
    return (
      <div className="vh-100 bg-blue-9">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-lg-7 col-xxl-4">
            <div className="d-block p-2 p-lg-5">
              <p className="fs-2 fw-semibold mb-2 text-center text-blue-5">
                {t('txt_welcome_to')}
                <img
                  className="pe-2"
                  style={{ verticalAlign: 'inherit' }}
                  alt="aesirx"
                  src="/assets/images/logo/welcome-logo.png"
                />
                DMA.
              </p>
              <p className="fs-2 fw-semibold text-center text-blue-5">
                {t('txt_sign_in_to_getting_started')}
              </p>

              <form>
                <SSOButton
                  className="btn w-100 fw-bold btn-sso position-relative d-flex align-item-center justify-content-center my-3  px-6"
                  text={t('txt_sign_in_with_sso')}
                  onGetData={onGetData}
                />
                {/* <div className="d-flex align-items-center flex-nowrap">
                  <div className="border-bottom-2 w-50"></div>
                  <span className="px-2 text-gray-4 text-uppercase">or</span>
                  <div className="border-bottom-2 w-50"></div>
                </div>
                <label className="form-label mb-16 fw-semibold text-black">
                  Email <span className="text-red-1">*</span>
                </label>
                <input
                  type="text"
                  className="form-control border"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  ref={this.usernameInput}
                  onBlur={() => {
                    this.validator.showMessageFor('Email or username');
                  }}
                />
                {this.validator.message('Email or username', this.state.username, 'required', {
                  className: 'text-danger',
                })}
                <label className="form-label mt-2 mb-16 fw-semibold text-black" htmlFor="password">
                  Password <span className="text-red-1">*</span>
                </label>
                <InputPassword
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  onKeyPress={this.onKeyPress}
                  onBlur={() => {
                    this.validator.showMessageFor('password');
                  }}
                />
                {this.validator.message('password', this.state.password, 'required', {
                  className: 'text-danger',
                })}
                <div className="d-flex justify-content-between pt-4 text-black">
                  <Checkbox text={t('txt_remember_me')} />
                  <a
                    href="https://dam.aesirx.io/auth/forgotpassword"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex fw-semibold fs-6 text-blue-3"
                  >
                    {t('txt_forgot_password')}
                  </a>
                </div>
                <button
                  type="button"
                  className={`btn w-100 fw-medium btn-success position-relative d-flex align-item-center text-uppercase justify-content-center wr_btn_login mt-3`}
                  onClick={this.handleSubmit}
                >
                  {t('txt_sign_in')}
                  <div className="ps-2 btn_loading">
                    <div
                      className="spinner-border"
                      style={{ width: '1.7rem', height: '1.7rem' }}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(LoginPage);
