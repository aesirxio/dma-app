/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons/faEdit';

const dataAudience = [
  {
    name: 'Location',
    des: ['Vietnam', 'Hochiminh City'],
  },
  {
    name: 'Age',
    des: ['18 - 65+'],
  },
  {
    name: 'Gender',
    des: ['All genders'],
  },
  {
    name: 'Audiences',
    des: ['Lorem ipsum dolor sit amet'],
  },
  {
    name: 'Language',
    des: ['English'],
  },
  {
    name: 'Detailed Targeting',
    des: ['All demographics, Interests and behaviors'],
  },
];

class ComponentAudience extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <>
        <h5>Audience</h5>
        <p>Define who you want to see your ads.</p>
        <div>
          {dataAudience &&
            dataAudience.map((value, key) => {
              return (
                <div key={key} className="bg-blue-3 p-3 rounded-2 mb-2 position-relative">
                  <span
                    className="position-absolute top-0 end-0 text-blue-0 d-flex fs-14 mt-2 me-2 cursor-pointer"
                  >
                    <i className="text-blue-0 me-1">
                      <FontAwesomeIcon icon={faEdit} />
                    </i>
                    <span>Edit</span>
                  </span>
                  <p className="mb-0">{value.name}</p>
                  <ul className="mb-0 ps-0 list-unstyled list_audience">
                    {value.des.map((item) => {
                      return <li>{item}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

export default ComponentAudience;
