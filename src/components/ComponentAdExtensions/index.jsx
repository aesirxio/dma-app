/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';

import './index.scss';
import Checkbox from '../Checkbox';

class ComponentAdExtensions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: '0',
          title: 'Sitelink extensions',
          des: 'Add additional links to your ad',
          dataBox: [
            {
              id: 0,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 1,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 2,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            }, {
              id: 3,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
          ],
        },
        {
          id: '1',
          title: 'Callout extensions',
          des: 'Add more business information to your ad',
          dataBox: [
            {
              id: 0,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 1,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 2,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            }, {
              id: 3,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
          ],
        },
        {
          id: '2',
          title: 'Call extensions',
          des: 'Add a phone number to your ad',
          dataBox: [
            {
              id: 0,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 1,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 2,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            }, {
              id: 3,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
          ],
        },
        {
          id: '3',
          title: 'App extensions',
          des: 'Add a app number to your ad',
          dataBox: [
            {
              id: 0,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 1,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 2,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            }, {
              id: 3,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
          ],
        },
        {
          id: '4',
          title: 'Structured snippet extensions',
          des: 'Add snippets of text to your ad',
          dataBox: [
            {
              id: 0,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 1,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 2,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            }, {
              id: 3,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
          ],
        },
        {
          id: '5',
          title: 'Promotion extensions',
          des: 'Add a promotion to your ad',
          dataBox: [
            {
              id: 0,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 1,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 2,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            }, {
              id: 3,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
          ],
        },
        {
          id: '6',
          title: 'Price extensions',
          des: 'Add prices to your ad',
          dataBox: [
            {
              id: 0,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 1,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 2,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            }, {
              id: 3,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
          ],
        },
        {
          id: '7',
          title: 'Lead form extensions',
          des: 'Add a form to your ad',
          dataBox: [
            {
              id: 0,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 1,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
            {
              id: 2,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            }, {
              id: 3,
              text: 'Lorem ipsum dolor sit amet',
              isChecked: false,
            },
          ],
        },
      ],
      isToggle: '0',
    };
  }

  handleClick = (name) => {
    this.setState({
      isToggle: name,
    });
  };

  toggleExtensionsSelection = (value, item) => {
    let data = [...this.state.data];
    data[value].dataBox[item].isChecked = !data[value].dataBox[item].isChecked;
    this.setState({
      data: data,
    });
  };

  getSelectedBoxList = (elementData) => {
    return elementData.dataBox.filter(el => el.isChecked === true);
  };

  clearAllSelection = (elementData, idx) => {
    let data = [...this.state.data];
    elementData.dataBox.map(item => item.isChecked = false);
    data[idx] = elementData;
    this.setState({
      data: data,
    });
  };

  render() {
    let { data, isToggle } = this.state;
    return (
      <div className='wr_extensions'>
        <Accordion defaultActiveKey={isToggle} className=''>
          {
            data && data.map((elementData, key) => {
              return (
                <Card key={key} className='item_extensions border-bottom-1'>
                  <Accordion.Toggle
                    as={Card.Header}
                    eventKey={elementData.id}
                    className={`d-flex align-items-center justify-content-between cursor-pointer p-3 ${isToggle === elementData.id ? 'active_extensions' : ''}`}
                    onClick={() => this.handleClick(elementData.id)}>
                    <p className='mb-0 text-blue-0 opacity-75 fw-medium'>{elementData.title}</p>
                    <p className='mb-0 text-blue-0 opacity-50'>{elementData.des}</p>
                    <span>
                      <i className='text-green'>
                        <FontAwesomeIcon icon={isToggle === elementData.id ? faMinus : faPlus} />
                      </i>
                    </span>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={elementData.id} className='px-3 pb-3'>
                    <div className='p-3'>
                      <p className='mb-2'>Select and create campaign-level sitelink extensions.</p>
                      <p className='mb-2'>Add at least 2 sitelink extensions.</p>
                      <div className='border-1'>
                        <div className='d-flex wr_body_extensions'>
                          <div className='item_body_extensions'>
                            <div className='p-3 border-bottom-1'>Search</div>
                            <div className='p-3 border-bottom-1'>
                              <p className='mb-0 d-flex'>
                                <Checkbox onCheckBoxChange={this.handleChange} /> 51 sitelink extensions
                              </p>
                            </div>
                            <div className='p-3 border-bottom-1'>
                              {
                                elementData.dataBox && elementData.dataBox.map((item, idx) => {
                                  return (
                                    <p key={idx} className='mb-3 d-flex'>
                                      <Checkbox
                                        checked={elementData.dataBox[idx].isChecked}
                                        onCheckBoxChange={() => this.toggleExtensionsSelection(elementData.id, item.id)} />
                                      {item.text}
                                    </p>
                                  );
                                })
                              }
                            </div>
                            <div className='text-green p-3'>
                              <i className='text-green'>
                                <FontAwesomeIcon icon={faPlusCircle} />
                              </i>
                              <span className='ms-2'>NEW SITELINK EXTENSION</span>
                            </div>
                          </div>
                          <div className='item_body_extensions'>
                            <div className='d-flex align-items-center justify-content-between p-3 border-bottom-1'>
                              <p
                                className='mb-0'>{elementData.dataBox.filter(el => el.isChecked === true).length} selected</p>
                              <button onClick={() => this.clearAllSelection(elementData, key)}
                                      className='text-green fw-light cursor-pointer fs-12 border-0 outline-none bg-transparent'>CLEAR ALL</button>
                            </div>
                            <div className='p-3'>
                              <p className='mb-0'>Lorem ipsum dolor sit amet</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Accordion.Collapse>
                </Card>
              );
            })
          }
        </Accordion>
      </div>
    );
  }
}

export default ComponentAdExtensions;
