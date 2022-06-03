/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { Nav, Accordion, useAccordionToggle } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';

import ItemAccordion from './ItemAccordion';
import ComponentImage from '../ComponentImage';

const data = [
  {
    id: 1,
    images: 'assets/images/facebook.png',
    title: 'Facebook',
    dataList: [
      {
        images: 'assets/images/icon-adidas.png',
        title: 'Food Network',
        chart: [
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Campaign',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Followers',
            number: '-15',
            isNumber: false,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Engagement',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
        ],
      },
      {
        images: 'assets/images/icon-levis.png',
        title: 'Food Network',
        chart: [
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Campaign',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Posts',
            number: '20',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
        ],
      },
      {
        images: 'assets/images/icon-nikon.png',
        title: 'Food Network',
        chart: [
          {
            title: 'Posts',
            number: '-15',
            isNumber: false,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Posts',
            number: '15',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    images: 'assets/images/instagram.png',
    title: 'Instagram',
    dataList: [
      {
        images: 'assets/images/icon-adidas.png',
        title: 'Food Network',
        chart: [
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
        ],
      },
      {
        images: 'assets/images/icon-levis.png',
        title: 'Food Network',
        chart: [
          {
            title: 'Posts',
            number: '-20',
            isNumber: false,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
        ],
      },
      {
        images: 'assets/images/icon-nikon.png',
        title: 'Food Network',
        chart: [
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
          {
            title: 'Posts',
            number: '5',
            isNumber: true,
            dataChart: [
              ['x', 'dogs'],
              [0, 0],
              [1, 5],
              [2, 15],
              [3, 9],
              [4, 10],
              [5, 5],
              [6, 3],
              [7, 19],
            ],
          },
        ],
      },
    ],
  },
];

class ChannelAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panelIndex: '',
      isChart: false,
    };
  }

  render() {
    let { panelIndex, isChart } = this.state;

    const CustomToggle = ({ children, eventKey }) => {
      const customOnClick = useAccordionToggle(eventKey, () => {
        this.setState({
          panelIndex: eventKey === panelIndex ? null : eventKey,
          isChart: eventKey === panelIndex ? null : !isChart,
        });
      });

      return (
        <Nav.Link
          onClick={customOnClick}
          className={`d-flex align-items-center justify-content-between p-3 ${
            eventKey === panelIndex ? 'border-bottom-1' : ''
          }`}
        >
          {children}
          <i className="text-green fs-5">
            <FontAwesomeIcon icon={eventKey === panelIndex ? faMinus : faPlus} />
          </i>
        </Nav.Link>
      );
    };

    return (
      <Accordion>
        {data.map((value, index) => {
          return (
            <div key={index} className="bg-white rounded-3 mb-4">
              <CustomToggle eventKey={value.id}>
                <div className="d-flex align-items-center">
                  <ComponentImage alt={value.images} src={value.images} className="img-avatar" />
                  <span className="ms-2 fs-4 text-blue-0">{value.title}</span>
                </div>
              </CustomToggle>
              <Accordion.Collapse eventKey={value.id}>
                <ItemAccordion data={value.dataList} isChart={isChart} />
              </Accordion.Collapse>
            </div>
          );
        })}
      </Accordion>
    );
  }
}
export default ChannelAccordion;
