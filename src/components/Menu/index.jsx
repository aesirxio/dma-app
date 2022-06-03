/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faMagic } from '@fortawesome/free-solid-svg-icons/faMagic';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons/faNetworkWired';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons/faVolumeUp';

import { authRoutes, mainRoutes } from '../../routes/routes';

import './index.scss';
import ComponentImage from '../ComponentImage';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMenu: [
        {
          name: 'home',
          text: 'Calendar',
          link: '/',
          icons: '/assets/images/icon_calendar.svg',
          icons_color: '/assets/images/icon_calendar_white.svg',
        },
        // {
        //   name: 'wizard',
        //   text: 'Wizard',
        //   link: '/wizard',
        //   icons: '/assets/images/icon_wizard.svg',
        //   icons_color: '/assets/images/icon_wizard_white.svg',
        // },
        {
          name: 'projects',
          text: 'Projects',
          link: '/projects',
          icons: '/assets/images/icon_projects.svg',
          icons_color: '/assets/images/icon_projects_white.svg',
        },
        {
          name: 'campaigns',
          text: 'Campaigns',
          link: '/campaigns',
          icons: '/assets/images/icon_campaigns.svg',
          icons_color: '/assets/images/icon_campaigns_white.svg',
        },
        // {
        //   name: 'personas',
        //   text: 'Personas',
        //   link: '/personas',
        //   icons: '/assets/images/icon_personas.svg',
        //   icons_color: '/assets/images/icon_personas_white.svg',
        //   className: 'fst-italic',
        // },
        {
          name: 'content',
          text: 'Content',
          link: '/content',
          icons: '/assets/images/icon_content.svg',
          icons_color: '/assets/images/icon_content_white.svg',
        },
        {
          name: 'channels',
          text: 'Channels',
          link: '/channels',
          icons: '/assets/images/icon_channles.svg',
          icons_color: '/assets/images/icon_channles_white.svg',
        },
        // {
        //   name: 'calendar',
        //   text: 'Calendar',
        //   link: '/calendar',
        //   icons: '/assets/images/icon_calendar.svg',
        //   icons_color: '/assets/images/icon_calendar_white.svg',
        // },
        // {
        //   name: 'analytics',
        //   text: 'Analytics',
        //   link: '/analytics',
        //   icons: '/assets/images/icon_analytics.svg',
        //   icons_color: '/assets/images/icon_analytics_white.svg',
        //   className: 'fst-italic',
        // },
        {
          name: 'digital',
          text: 'Digital Assets',
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
    return (
      <nav>
        <ul id="wr_list_menu" className="list-unstyled mb-0 py-3 pt-md-1">
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
                  <ComponentImage
                    src={value.icons_color}
                    alt={value.icons}
                    className="mb-1 img_menu"
                  />
                  <ComponentImage
                    src={value.icons_color}
                    alt={value.icons}
                    className="mb-1 img_menu_color"
                  />
                  <span className="ms-3 text py-1 d-inline-block">{value.text}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Menu;
