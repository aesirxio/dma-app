/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons/faUserMinus';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons/faNetworkWired';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons/faUserFriends';
import { faUserTag } from '@fortawesome/free-solid-svg-icons/faUserTag';
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart';
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons/faEnvelopeOpenText';

class Menu2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: '',
      dataMenu: [
        {
          title: 'ACCOUNT SETTINGS',
          listMenu: [
            {
              name: 'profile',
              text: 'Profile',
              link: '/profile',
              icons: faUserMinus,
            },
            // {
            //   name: 'billingplan',
            //   text: 'Billing & Plan',
            //   link: '/billing-plan',
            //   icons: faFileAlt,
            // },
            // {
            //   name: "quotas",
            //   text: "Quotas",
            //   link: "/billing-plan-quotas",
            //   icons: faFileAlt,
            // },
            // {
            //   name: 'invoices',
            //   text: 'Invoices',
            //   link: '/billing-plan-invoices',
            //   icons: faFileAlt,
            // },
          ],
        },
        // {
        //   title: 'Members',
        //   listMenu: [
        //     {
        //       name: 'organisations',
        //       text: 'Organisations',
        //       link: '/organisations',
        //       icons: faNetworkWired,
        //       className: 'fst-italic',
        //     },
        //     {
        //       name: 'teammembers',
        //       text: 'Team Members',
        //       link: '/team-members',
        //       icons: faUserFriends,
        //       className: 'fst-italic',
        //     },
        //     {
        //       name: 'roles',
        //       text: 'Roles',
        //       link: '/roles',
        //       icons: faUserTag,
        //       className: 'fst-italic',
        //     },
        //   ],
        // },
        // {
        //   title: 'WORKFLOW',
        //   listMenu: [
        //     {
        //       name: 'workflowschemes',
        //       text: 'Workflow Schemes',
        //       link: '/workflow-schemes',
        //       icons: faHome,
        //       className: 'fst-italic',
        //     },
        //   ],
        // },
        // {
        //   title: 'Connect a Channel',
        //   listMenu: [
        //     {
        //       name: 'socialmedia',
        //       text: 'Social Media',
        //       link: '/social-media',
        //       icons: faHome,
        //     },
        //     {
        //       name: 'advertising',
        //       text: 'Advertising',
        //       link: '/advertising',
        //       icons: faHome,
        //     },
        //     {
        //       name: 'cms',
        //       text: 'CMS',
        //       link: '/cms',
        //       icons: faHome,
        //     },
        //     {
        //       name: 'emailmarketing',
        //       text: 'Email Marketing',
        //       link: '/emailmarketing',
        //       icons: faEnvelopeOpenText,
        //     },
        //   ],
        // },
        // {
        //   title: 'miscellaneous',
        //   listMenu: [
        //     {
        //       name: 'mycollections',
        //       text: 'My collections',
        //       link: '/my-collections',
        //       icons: faHeart,
        //       className: 'fst-italic',
        //     },
        //   ],
        // },
      ],
    };
  }

  checkActiveMenu = (name) => {};

  componentDidMount = () => {
    this.checkActiveMenu();
  };

  handleCheckActive = (name) => {
    this.checkActiveMenu(name);
  };

  render() {
    let { dataMenu, activeMenu } = this.state;
    return (
      <nav>
        <div className="py-1 px-3 item_menu item_menu_home">
          <a
            href="/"
            className="d-block text-blue-0 p-3 link_menu rounded-2 text-decoration-none bg-blue-2 "
          >
            <i class="text-white">
              <FontAwesomeIcon icon={faArrowLeft} />
            </i>
            <span className="ms-3 text text-white">Back to Dashboard</span>
          </a>
        </div>
        {dataMenu.map((item, index) => {
          return (
            <div key={index}>
              <p className="section_menu_title fs-12 text-uppercase border-top-1 border-bottom-1 py-2 px-3 mb-0">
                {item.title}
              </p>
              <ul className="wr_list_menu_2 list-unstyled mb-0 py-1 px-3">
                {item.listMenu.map((value, key) => {
                  return (
                    <li
                      key={key}
                      onClick={(e) => this.handleCheckActive(value.link)}
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
                        <span className="ms-3 text">{value.text}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    );
  }
}

export default Menu2;
