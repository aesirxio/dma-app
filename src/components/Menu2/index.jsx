/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import i18n from 'translations/i18n';
import { withTranslation } from 'react-i18next';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { Dropdown } from 'react-bootstrap';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';

class Menu2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'English',
      activeMenu: '',
      dataMenu: [
        {
          title: 'ACCOUNT SETTINGS',
          listMenu: [
            {
              name: 'profile',
              text: 'txt_menu_profile',
              link: '/profile',
              icons: faUser,
            },
          ],
        },
      ],
    };
  }

  checkActiveMenu = () => {};

  componentDidMount = () => {
    this.checkActiveMenu();
  };

  handleCheckActive = (name) => {
    this.checkActiveMenu(name);
  };

  render() {
    let { dataMenu } = this.state;
    const { t } = this.props;
    const listLanguages = Object.keys(i18n.options.resources).map(function (key) {
      return { language: key, title: i18n.options.resources[key].title };
    });
    return (
      <nav>
        <div className="py-1 px-3 item_menu item_menu_home">
          <a
            href="/"
            className="d-block text-blue-0 p-3 link_menu rounded-2 text-decoration-none  "
          >
            <i className="text-white">
              <FontAwesomeIcon icon={faArrowLeft} />
            </i>
            <span className="ms-3 text text-white">{t('txt_back_to_dashboard')}</span>
          </a>
        </div>
        {dataMenu.map((item, index) => {
          return (
            <div key={index}>
              <ul className="wr_list_menu_2 list-unstyled mb-0 py-1 px-3">
                {item.listMenu.map((value, key) => {
                  return (
                    <li
                      key={key}
                      onClick={() => this.handleCheckActive(value.link)}
                      className={`item_menu ${value.className ? value.className : ''}`}
                    >
                      <NavLink
                        to={value.link}
                        className={`d-block rounded-1 p-3 link_menu text-blue-0 text-decoration-none`}
                        activeClassName={`active`}
                      >
                        <i>
                          <FontAwesomeIcon icon={value.icons} />
                        </i>
                        <span className="ms-3 text">{t(value.text)}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <div className="position-absolute bottom-0 mb-3 border-top w-100 py-1">
          <Dropdown className="pt-2 ">
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="bg-transparent border-0"
            >
              <FontAwesomeIcon icon={faGlobe} /> {this.language ?? 'English'}
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
                      this.setState((this.language = item.title));
                    }}
                  >
                    {item.title}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    );
  }
}

export default withTranslation('common')(Menu2);
