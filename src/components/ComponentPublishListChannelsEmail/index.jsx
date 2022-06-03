/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

class ComponentPublishListChannelsEmail extends Component {
  // constructor(props) {
  //   super(props);

  // }

  componentDidMount = () => {
  };

  render() {
    let { 
      labelsConnectedChannels
    } = this.props;

    return (
      <>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="text-blue mb-0">Email Marketing</h6>
        </div>
        <div>
          <ul className={`list-unstyled d-flex align-items-center mb-0 flex-wrap`}>
            {
              labelsConnectedChannels.includes("mailchimp") && (
                <li className={`me-2 mb-2`}>
                  <span style={{cursor:"pointer"}} className="d-block" >
                    <span className="position-relative d-block">
                      <img className="img-avatar" src={"/assets/images/mailchimp.png"} alt="" />
                    </span>
                  </span>
                </li>
              )
            }
          </ul>
        </div>
      </>
    );
  }
}

export default ComponentPublishListChannelsEmail;
