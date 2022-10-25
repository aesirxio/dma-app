/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import i18n from 'translations/i18n';

import './index.scss';
import Menu from '../Menu';
import Menu2 from '../Menu2';
import SwitchThemes from 'components/SwitchThemes';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';
class SbarLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { settingPage } = this.props;
    const listLanguages = Object.keys(i18n.options.resources).map(function (key) {
      return { language: key, title: i18n.options.resources[key].title };
    });
    let currentLanguage = listLanguages.filter((lang) => {
      if (lang.language == i18n.language) {
        return lang.title;
      }
    });
    return (
      <aside
        className={`sidebar w-260  mt-0 position-relative bg-dark mh-100 overflow-hidden overflow-y-auto d-flex flex-column justify-content-between z-index-100`}
      >
        {!settingPage ? (
          <>
            <Menu />
          </>
        ) : (
          <Menu2 />
        )}
        <div className="position-absolute bottom-0 mb-3 border-top w-100 py-1 button-language">
          <Dropdown className="pt-2 ">
            <Dropdown.Toggle variant="dark" id="dropdown-basic" className="bg-transparent border-0">
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
        <div className="switch-theme-button position-absolute end-0 bottom-0 mb-4 me-3">
          <SwitchThemes />
        </div>
      </aside>
    );
  }
}

export default withTranslation('common')(SbarLeft);
