/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import './index.scss';

class TitleAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { title, title_below, mb } = this.props;
    return (
      <div className={`d-block mt-2 wrapper_title_account ${mb}`}>
        <h2>{title}</h2>
        {title_below !== undefined && title_below !== '' && <h2>{title_below}</h2>}
      </div>
    );
  }
}

export default TitleAccount;
