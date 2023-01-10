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

import './index.scss';
import SwitchThemes from 'components/SwitchThemes';
import DropdownAvatar from '../DropdownAvatar';
import { Dropdown } from 'react-bootstrap';
import Helper from '../../utils/helper';
import ComponentHambuger from '../ComponentHambuger';
import ComponentImage from '../ComponentImage';

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
    let { isMini } = this.state;
    const listLanguages = Object.keys(i18n.options.resources).map(function (key) {
      return { language: key, title: i18n.options.resources[key].title };
    });
    let currentLanguage = listLanguages.filter((lang) => {
      if (lang.language == i18n.language) {
        return lang.title;
      }
    });
    return (
      <div
        id="all_header"
        className="wrapper_header d-flex position-fixed w-100 top-0 left-0 right-0 pr-3 align-items-center shadow-sm z-index-100 bg-white"
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
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          <div className="d-flex justify-content-between flex-1 align-items-center">
            <div>{/* <AllProjects /> */}</div>
            <div className="d-flex align-items-center">
              {/* <div className="input-group mb-0 pe-2 wr_input_search">
                <input
                  type="text"
                  placeholder={t("txt_search_for_something")}
                  aria-describedby="button-search"
                  className="form-control border-end-0 pe-2"
                />
                <button
                  type="button"
                  id="button-search"
                  className="btn btn_search border-1 border-start-0 border-gray text-green"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div> */}

              <div className="bottom-0 mb-2 py-1 button-language">
                <Dropdown className="pt-2 ">
                  <Dropdown.Toggle
                    variant="dark"
                    id="dropdown-basic"
                    className="bg-transparent border-0"
                  >
                    <FontAwesomeIcon icon={faGlobe} /> {currentLanguage[0].title}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {listLanguages.map((item, index) => {
                      return (
                        <Dropdown.Item
                          key={index}
                          href="#"
                          className=""
                          onClick={() => {
                            i18n.changeLanguage(item.language);
                          }}
                        >
                          {item.title}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="switch-theme-button ps-3 pe-3">
                <SwitchThemes />
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
