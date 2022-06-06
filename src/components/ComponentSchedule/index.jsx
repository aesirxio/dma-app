/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { Tab, Nav } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import ItemSchedule from './ItemSchedule';

import { CONTENT_FIELD_KEY } from '../../constants/ContentModule';
import ComponentImage from '../ComponentImage';

class ComponentSchedule extends Component {
  formPropsData = {
    [CONTENT_FIELD_KEY.START_DATE]: '',
    [CONTENT_FIELD_KEY.END_DATE]: '',
  };

  constructor() {
    super();

    this.state = {
      dataSingle: {
        image: '/assets/images/avatar-1.png',
        name: 'Miley Cyrus',
        numbers: [
          { value: '01', label: '01' },
          { value: '02', label: '02' },
          { value: '03', label: '03' },
        ],
        days: [
          { value: '01', label: '01' },
          { value: '02', label: '02' },
          { value: '03', label: '03' },
        ],
        startDateTime: new Date(),
        timeDate: new Date(),
        publish: true,
        timeDateRange: new Date(),
      },
      data: [
        {
          id: 1,
          title: 'Facebook',
          schedule: [
            {
              id: 1,
              image: '/assets/images/avatar-1.png',
              name: 'Miley Cyrus',
              numbers: [
                { value: '01', label: '01' },
                { value: '02', label: '02' },
                { value: '03', label: '03' },
              ],
              days: [
                { value: '01', label: '01' },
                { value: '02', label: '02' },
                { value: '03', label: '03' },
              ],
              startDateTime: new Date(),
              timeDate: new Date(),
              publish: true,
              timeDateRange: new Date(),
              isToggle: true,
            },
            {
              id: 2,
              image: '/assets/images/avatar-1.png',
              name: 'Miley Cyrus 1',
              numbers: [
                { value: '01', label: '01' },
                { value: '02', label: '02' },
                { value: '03', label: '03' },
              ],
              days: [
                { value: '01', label: '01' },
                { value: '02', label: '02' },
                { value: '03', label: '03' },
              ],
              startDateTime: new Date(),
              timeDate: new Date(),
              publish: false,
              timeDateRange: new Date(),
              isToggle: false,
            },
          ],
        },
        {
          id: 2,
          title: 'Instagram',
          schedule: [
            {
              id: 1,
              image: '/assets/images/avatar-1.png',
              name: 'Miley Cyrus 2',
              numbers: [
                { value: '01', label: '01' },
                { value: '02', label: '02' },
                { value: '03', label: '03' },
              ],
              days: [
                { value: '01', label: '01' },
                { value: '02', label: '02' },
                { value: '03', label: '03' },
              ],
              startDateTime: new Date(),
              timeDate: new Date(),
              publish: false,
              timeDateRange: new Date(),
              isToggle: true,
            },
            {
              id: 2,
              image: '/assets/images/avatar-1.png',
              name: 'Miley Cyrus 3',
              numbers: [
                { value: '01', label: '01' },
                { value: '02', label: '02' },
                { value: '03', label: '03' },
              ],
              days: [
                { value: '01', label: '01' },
                { value: '02', label: '02' },
                { value: '03', label: '03' },
              ],
              startDateTime: new Date(),
              timeDate: new Date(),
              publish: true,
              timeDateRange: new Date(),
              isToggle: false,
            },
          ],
        },
      ],
    };
  }

  handleToggle = (name) => {
    let { data } = this.state;

    data.forEach((value) => {
      value.schedule.map((item) => ({
        ...item,
        isToggle: item.id === name ? (item.isToggle = !item.isToggle) : item.isToggle,
      }));
    });

    this.setState({
      data: data,
    });
  };

  handleOnCheckBoxChangeSingle = () => {
    let { dataSingle } = this.state;

    dataSingle.publish = !dataSingle.publish;

    this.setState({
      dataSingle: dataSingle,
    });
  };

  handleOnCheckBoxChange = (name) => {
    let { data } = this.state;

    data.forEach((value) => {
      value.schedule.map((item) => ({
        ...item,
        publish: item.id === name ? (item.publish = !item.publish) : item.publish,
      }));
    });

    this.setState({
      data: data,
    });
  };

  render() {
    let { data, dataSingle } = this.state;
    let { isSwitch, regularly } = this.props;

    return (
      <div>
        {isSwitch ? (
          <Tab.Container id="left-tabs-example" defaultActiveKey="1">
            <div>
              <div className="tabs_content">
                <Nav variant="pills" className="d-flex">
                  {data.map((tab) => {
                    return (
                      <Nav.Item>
                        <Nav.Link eventKey={tab.id}>
                          {tab.title} [{tab.schedule.length}]
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                </Nav>
              </div>
              <div className="bg-blue p-3">
                <Tab.Content>
                  {data.map((value) => {
                    return (
                      <Tab.Pane eventKey={value.id}>
                        <div>
                          {value.schedule.map((item, key) => {
                            return (
                              <div key={key} className="border-bottom-1 mb-2 item_tab_sm_publish">
                                <div
                                  className="mb-2 d-flex align-items-center justify-content-between cursor-pointer"
                                  onClick={() => this.handleToggle(item.id)}
                                >
                                  <div className="d-flex align-items-center">
                                    <ComponentImage
                                      className="img-avatar"
                                      src={item.image}
                                      alt={item.image}
                                    />
                                    <span className="ps-2 text-black opacity-75">{item.name}</span>
                                  </div>
                                  <i className="text-green fs-5">
                                    <FontAwesomeIcon icon={item.isToggle ? faMinus : faPlus} />
                                  </i>
                                </div>
                                {item.isToggle && (
                                  <div className="wr_item_schedule p-3 rounded-2">
                                    <ItemSchedule
                                      value={item}
                                      publish={item.publish}
                                      handleOnCheckBoxChange={() =>
                                        this.handleOnCheckBoxChange(item.id)
                                      }
                                      regularly={regularly}
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </Tab.Pane>
                    );
                  })}
                </Tab.Content>
              </div>
            </div>
          </Tab.Container>
        ) : (
          <div className="wr_item_schedule p-3 rounded-2">
            <ItemSchedule
              value={dataSingle}
              handleOnCheckBoxChange={this.handleOnCheckBoxChangeSingle}
              regularly={regularly}
              startDateTime={this.props.startDateTime}
              timeDate={this.props.timeDate}
              handlChangeDay={this.props.handlChangeDay}
              handlChangeTime={this.props.handlChangeTime}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ComponentSchedule;
