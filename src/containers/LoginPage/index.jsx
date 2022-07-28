/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import SimpleReactValidator from 'simple-react-validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';

import './index.scss';

import BannerLeft from '../../components/BannerLeft';

import { login } from '../../auth';
import InputPassword from '../../components/inputPassword';

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

    return (
      <div className="row">
        <BannerLeft dataSlider={dataSlider} />
        <div className="col-md-8 d-flex flex-column justify-content-center align-items-center ">
          <div className="d-block">
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
              <div className="mt-4 mb-3 d-flex justify-content-between"></div>
              <button
                type="button"
                className={`btn w-100 fw-medium btn-success position-relative d-flex align-item-center justify-content-center wr_btn_login`}
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
