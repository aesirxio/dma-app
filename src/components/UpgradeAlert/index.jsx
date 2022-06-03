/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';

import './index.scss';
import BillingPlanStore from '../../containers/BillingPlanPage/BillingPlanStore/BillingPlanStore.js';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { parse, parseISO } from 'date-fns';

class UpgradeAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      loading: true,
      plan: 'free',
      date: '',
    };
  }

  async componentDidMount() {
    const store = new BillingPlanStore();
    const data = await store.getMemberSubscriptionDetail();

    if (data?.subscription) {
      let date = null;
      if (data?.subscription?.next_payment?.date) {
        date = formatDistanceToNow(
          parse(data?.subscription?.next_payment.date, 'dd/MM/yyyy', new Date())
        );
      } else if (data?.subscription?.ends_at) {
        date = formatDistanceToNow(parseISO(data?.subscription?.ends_at));
      } else if (data?.subscription?.last_payment?.date) {
        const create_at = parse(data?.subscription?.last_payment?.date, 'dd/MM/yyyy', new Date());
        const result = new Date(
          create_at.getFullYear(),
          create_at.getMonth(),
          create_at.getDate() + 30
        );
        date = formatDistanceToNow(result);
      }

      const plan = data?.subscription?.plan_name;

      this.setState({ loading: false, date: date, plan: plan });
    } else {
      this.setState({ loading: false });
    }
  }

  handleShow = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    if (!this.state.show) {
      return null;
    }

    return (
      <Alert className={`w-100 py-2 text-center ${this.props.className}`}>
        {this.state.loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            <p className="mb-0 d-flex justify-content-center align-items-center">
              <span className="pe-2">
                {this.state.plan === 'free'
                  ? 'You have on Free plan.'
                  : `You have ${this.state.date} left on ${this.state.plan} plan.`}

                {this.state.plan !== 'Enterprise' && ' Upgrade with 50% OFF offer'}
              </span>
              {this.state.plan !== 'Enterprise' && (
                <a href="/billing-plan" className="link_upgrade btn btn-light border-0 py-2">
                  <i>
                    <FontAwesomeIcon icon={faCog} />
                  </i>
                  <span className="ms-2">Upgrade</span>
                </a>
              )}
            </p>
            <button
              type="button"
              className="btn-close  d-none d-md-block"
              onClick={this.handleShow}
            ></button>
          </>
        )}
      </Alert>
    );
  }
}

export default UpgradeAlert;
