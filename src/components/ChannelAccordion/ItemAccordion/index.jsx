/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import ComponentImage from '../../ComponentImage';
import ChartLine from '../ChartLine';

import '../index.scss';

class ItemAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { data, isChart } = this.props;
    return (
      <div className="px-3">
        {data.map((item, key) => {
          return (
            <div
              key={key}
              className={`item_accordion py-3 border-bottom-1 d-flex align-items-center`}
            >
              <div className="d-flex align-items-center col-3">
                <ComponentImage alt={item.images} src={item.images} className="img-avatar" />
                <span className="ms-2">{item.title}</span>
              </div>
              <div className={`col-9`}>
                <div className="row">
                  <ChartLine data={item.chart} isChart={isChart} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default ItemAccordion;
