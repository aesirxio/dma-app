/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { NavLink } from 'react-router-dom';

import './index.scss';
import { withTranslation } from 'react-i18next';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'English',
      dataMenu: [
        {
          name: 'home',
          text: 'txt_menu_calendar',
          link: '/',
          icons: '/assets/images/icon_calendar.svg',
          icons_color: '/assets/images/icon_calendar_white.svg',
        },
        {
          name: 'projects',
          text: 'txt_menu_projects',
          link: '/projects',
          icons: '/assets/images/icon_projects.svg',
          icons_color: '/assets/images/icon_projects_white.svg',
        },
        {
          name: 'campaigns',
          text: 'txt_menu_campaigns',
          link: '/campaigns',
          icons: '/assets/images/icon_campaigns.svg',
          icons_color: '/assets/images/icon_campaigns_white.svg',
        },
        {
          name: 'content',
          text: 'txt_menu_content',
          link: '/content',
          icons: '/assets/images/icon_content.svg',
          icons_color: '/assets/images/icon_content_white.svg',
        },
        {
          name: 'channels',
          text: 'txt_menu_channels',
          link: '/channels',
          icons: '/assets/images/icon_channles.svg',
          icons_color: '/assets/images/icon_channles_white.svg',
        },
        {
          name: 'digital',
          text: 'txt_menu_digital_assets',
          link: '/digital-assets',
          icons: '/assets/images/icon_digital_assets.svg',
          icons_color: '/assets/images/icon_digital_assets_white.svg',
        },
      ],
    };
  }

  // checkActiveMenu = (name) => {
  // if (window.location.pathname === '/') {
  //   document.getElementById('wr_list_menu').classList.remove('wr_list_menu');
  // } else {
  //   document.getElementById('wr_list_menu').classList.add('wr_list_menu');
  // }
  // if (name === '/' || name === '/analytics' || name === '/calendar') {
  //   document.getElementById('all_header').classList.add('all_header');
  // } else {
  //   document.getElementById('all_header').classList.remove('all_header');
  // }
  // };

  // componentDidMount = () => {
  // this.checkActiveMenu();
  // if (window.location.pathname === '/') {
  //   document.getElementById('all_header').classList.add('all_header');
  // } else {
  //   document.getElementById('all_header').classList.remove('all_header');
  // }
  // };

  // handleCheckActive = (name) => {
  //   this.checkActiveMenu(name);
  // };

  render() {
    let { dataMenu } = this.state;
    const { t } = this.props;
    return (
      <nav>
        <ul id="wr_list_menu" className="list-unstyled mb-0 p-3 pt-md-1">
          {dataMenu.map((value, key) => {
            return (
              <li
                key={key}
                className={`item_menu ${value.className ? value.className : ''}`}
                // onClick={(e) => this.handleCheckActive(value.link)}
              >
                <NavLink
                  exact={value.name === 'content' ? false : true}
                  to={value.link}
                  className={`d-block rounded-1 px-3 py-2 mb-1 link_menu text-white text-decoration-none `}
                  activeClassName={`active`}
                >
                  <span
                    className="icon d-inline-block align-text-bottom"
                    style={{
                      WebkitMaskImage: `url(${value.icons_color})`,
                      WebkitMaskRepeat: 'no-repeat',
                    }}
                  ></span>
                  <span className="ms-3 text py-1 d-inline-block">{t(value.text)}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default withTranslation('common')(Menu);
