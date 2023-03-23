/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import i18n from 'translations/i18n';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AUTHORIZATION_KEY, Storage } from 'aesirx-dma-lib';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';

import './index.scss';
import SwitchThemes from 'components/SwitchThemes';
import DropdownAvatar from '../DropdownAvatar';
import Select from 'components/Select/index';
import Helper from '../../utils/helper';
import ComponentHambuger from '../ComponentHambuger';
import ComponentImage from '../ComponentImage';
import 'moment/locale/vi';
import 'moment/locale/es';
import 'moment/locale/uk';
import 'moment/locale/de';
import 'moment/locale/th';
import 'moment/locale/hr';
import 'moment/locale/fr';
import moment from 'moment';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMini: false,
    };
  }

  handleCollap = () => {
    let { isMini } = this.state;
    document.body.classList.toggle('mini_left');
    this.setState({
      isMini: !isMini,
    });
  };

  handleMenuLeft = () => {
    document.body.classList.toggle('show_menu_left');
  };

  render() {
    const { t } = this.props;
    let { isMini } = this.state;
    const listLanguages = Object.keys(i18n.options.resources).map(function (key) {
      return {
        value: key,
        label: i18n.options.resources[key].title,
        icon: i18n.options.resources[key].icon,
      };
    });
    console.log(listLanguages);
    let currentLanguage = listLanguages.filter((lang) => {
      if (lang.value == i18n.language) {
        return lang;
      }
    });
    moment.locale(i18n.language);

    return (
      <div
        id="all_header"
        className="wrapper_header d-flex position-fixed w-100 top-0 left-0 right-0 pr-3 align-items-center border-bottom border-color-2 z-index-100 bg-white"
      >
        <ComponentHambuger handleAction={this.handleMenuLeft} />
        <div className="wrapper_header_logo bg-dark w-280 h-80 d-flex align-items-center">
          <a href="/" className={`header_logo d-block px-3`}>
            {isMini ? (
              <ComponentImage
                className="logo_white pe-0"
                src={
                  Helper.isValidUrl(Storage.getItem(AUTHORIZATION_KEY.LOGO))
                    ? Storage.getItem(AUTHORIZATION_KEY.LOGO)
                    : '/assets/images/logo/logo-white.svg'
                }
                alt="R Digital"
              />
            ) : (
              <ComponentImage
                className="logo_white pe-6"
                src={
                  Helper.isValidUrl(Storage.getItem(AUTHORIZATION_KEY.LOGO))
                    ? Storage.getItem(AUTHORIZATION_KEY.LOGO)
                    : '/assets/images/logo/logo-white.svg'
                }
                alt="R Digital"
              />
            )}
          </a>
        </div>
        <div className="content_header h-80 border-start-1 flex-1 d-flex align-items-center ps-4 pr-4 position-relative">
          <span
            className="
              item_collap
              d-flex
              position-absolute
              text-green
              bg-blue-1
              rounded-circle
              align-items-center
              justify-content-center
              fs-12
              cursor-pointer
            "
            onClick={this.handleCollap}
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-green" />
          </span>
          <div className="d-flex flex-1 align-items-center">
            {/* <Search /> */}
            <div className="ms-auto d-flex align-items-center button-language ">
              <FontAwesomeIcon icon={faGlobe} className="text-body" />
              <Select
                isClearable={false}
                isSearchable={false}
                isBorder={false}
                isShadow={false}
                options={listLanguages}
                getOptionLabel={(options) => (
                  <div className="language-option d-flex align-items-center">
                    <img
                      className="me-2 rounded-3"
                      width={20}
                      height={20}
                      src={options.icon}
                      alt={options.label}
                    />
                    <span>{options.label}</span>
                  </div>
                )}
                className="shadow-none text-gray-5"
                onChange={(data) => {
                  i18n.changeLanguage(data.value);
                }}
                defaultValue={currentLanguage}
              />
            </div>
            <div className="switch-theme-button col-auto py-2 px-3">
              <SwitchThemes />
            </div>
            <div className="d-flex align-items-center">
              <div className="wr_help_center ps-3 pe-3 d-none">
                <span className="item_help d-flex align-items-center text-blue-0 cursor-pointer">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                  <span className="text white-spacing-nowrap ps-2">{t('txt_help_center')}</span>
                </span>
              </div>

              <div className="ps-3 pe-3">
                <DropdownAvatar />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('common')(Header);
