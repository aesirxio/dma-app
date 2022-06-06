/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Tab, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons/faUserCog';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import './index.scss';

import ComponentPreviewPersona from '../ComponentPreviewPersona';

class ContentSbarRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 0,
          icon: faUserCog,
          name: 'Persona',
        },
        // {
        //   id: 1,
        //   icon: faUserCheck,
        //   name: "Assign",
        // },
        // {
        //   id: 2,
        //   icon: faHistory,
        //   name: "History",
        // },
      ],
    };
  }

  render() {
    let { data } = this.state;
    return (
      <div className="wr_sbar_right position-fixed top-0 end-0 bottom-0 w-80 vh-100 bg-white pd-t-80 shadow z-index-10">
        <Tab.Container className="h-auto">
          <div className="position-relative h-100">
            <div>
              <Nav variant="pills" className="flex-column py-3 px-2">
                {data.map((value, index) => {
                  return (
                    <Nav.Item key={index} className="border-bottom-1">
                      <Nav.Link
                        eventKey={value.id}
                        className={`d-block text-center text px-0 text-black ${
                          this.props.disabled ? 'opacity-50' : ''
                        }`}
                        disabled={this.props.disabled}
                        onClick={this.props.handlShowPreviewPersona}
                      >
                        <i className="">
                          <FontAwesomeIcon icon={value.icon} />
                        </i>
                        <span className="fs-14 opacity-75 d-block">{value.name}</span>
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              </Nav>
            </div>

            <Tab.Content className="wr_tab_content position-absolute top-0 end-100 mh-100 border-end-1  h-100 border-start-1 bg-white">
              <Tab.Pane
                eventKey="0"
                className="wr_tabcontent_right bg-white p-3 h-100 w-400 overflow-hidden overflow-y-auto"
                hidden={this.props.isHidden}
              >
                <div className="wr_collapse_preview position-absolute top-0 bottom-0 start-0 my-auto d-flex align-items-center">
                  <span
                    className="btn_collapse_preview cursor-pointer d-flex align-items-center justify-content-center"
                    onClick={this.props.handlShowPreviewPersona}
                  >
                    <i className="position-relative z-index-10 text-green">
                      <FontAwesomeIcon icon={faChevronRight} />
                    </i>
                  </span>
                </div>
                <ComponentPreviewPersona
                  data={this.props.data}
                  handleSelect={this.props.handleSelect}
                  options={this.props.options}
                />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
    );
  }
}

export default withTranslation('common')(ContentSbarRight);
