/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import ComponentImage from '../ComponentImage';

class ComponentLinkChannels extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { viewModel } = this.props;
    let channelsLogo = viewModel ? viewModel.connectedChannelMasterData : [];

    return (
      <ul className="list-unstyled d-flex align-items-center">
        {channelsLogo &&
          channelsLogo.map((value, key) => {
            return (
              <li key={key} className="me-2">
                <ComponentImage
                  src={`/assets/images/${value.label}.png`}
                  alt={value.label}
                  className="img-avatar"
                />
              </li>
            );
          })}
      </ul>
    );
  }
}

export default ComponentLinkChannels;
