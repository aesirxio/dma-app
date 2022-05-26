/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
*/

import React from 'react';
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

import TitleAccount from '../../components/TitlePageAccount';

import './index.scss';

import Line from '../../components/Line';
import Checkbox from '../../components/Checkbox';
import BannerLeft from '../../components/BannerLeft';
import Social from '../../components/Social';

import { login, socialLogin } from '../../auth';
import InputPassword from '../../components/inputPassword';
import { notify } from '../../components/Toast';
import history from '../../routes/history';

const dataSlider = [
  {
    text: 'Building a Global Media Content Marketing Team requires structure, process and automation we utilize technology to make this happen',
    title: 'Ronni K. Gothard Christiansen',
    subtitle: 'CEO & Founder R Digital',
  },
];

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false,
      isProcessing: false,
    };

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.usernameInput = React.createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.usernameInput.current.focus();
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
      console.log('[is Form Valid]');

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
    const { t, i18n } = this.props;

    console.log('[LoginPage] render...');

    return (
      <div className="row">
        <BannerLeft dataSlider={dataSlider} />
        <div className="col-md-8 d-flex flex-column justify-content-center align-items-center ">
          <div className="d-block">
            {/* <Social /> */}

            {/* <Line text={t('txt_or_continue_with')} /> */}

            <form>
              <label className="form-label mb-3" htmlFor="email">
                Email <span>*</span>
              </label>
              <input
                type="text"
                className="form-control"
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
              <label className="form-label mt-4 mb-3" htmlFor="password">
                Password <span>*</span>
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
              <div className="mt-4 mb-3 d-flex justify-content-between">
                {/* <Checkbox
                  name="remember"
                  text={t('txt_remember_me')}
                  checked={this.state.remember}
                  onCheckBoxChange={this.handleInputChange}
                /> */}
                {/* <a href="/forgot-password">{t('txt_forgot_password')}</a> */}
              </div>
              <button
                type="button"
                className={`btn w-100 fw-medium btn-success position-relative d-flex align-item-center justify-content-center wr_btn_login`}
                onClick={this.handleSubmit}
                // ref={this.submitButtonRef}
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
                <i className="ms-1 btn_icon_login">
                  <FontAwesomeIcon icon={faChevronRight} />
                </i>
              </button>
              <a
                href="https://dma.aesirx.io"
                target="_blank"
                rel="noreferrer"
                className="d-flex justify-content-center mt-4"
              >
                {t('txt_do_not_have_an_account')}
              </a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(LoginPage);
