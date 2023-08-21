/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

class ComponentInvoices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { data } = this.props;
    return (
      <div className="bg-white p-3">
        <div className="py-2 px-3 bg-blue">
          <div className="row">
            <div className="col-3">
              <span>Order ID</span>
            </div>
            <div className="col-3">
              <span>Amount</span>
            </div>
            <div className="col-3">
              <span>Date</span>
            </div>
            <div className="col-3 text-center">
              <span>Receipt</span>
            </div>
          </div>
        </div>
        <div className="px-3">
          {data.map((value, key) => {
            return (
              <div key={key} className="row py-3 border-bottom-1 item_project">
                <div className="col-3">
                  <div className="d-flex align-items-center">
                    <span>{value.order_id}</span>
                  </div>
                </div>
                <div className="col-3">
                  <span>{value.amount}</span>
                </div>
                <div className="col-3">
                  <span>{value.paid_at}</span>
                </div>
                <div className="col-3 text-center">
                  <span>
                    <a href={value.receipt}>PDF</a>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ComponentInvoices;
