/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

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
