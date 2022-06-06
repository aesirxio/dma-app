/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { notify } from '../Toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';

import './index.scss';

const data = [
  {
    title: 'Management',
    free: '',
    small: '',
    medium: '',
    pro: '',
    enterprise: '',
    className: 'category_header',
    category: 'category',
  },
  {
    title: 'Calendar',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Campaign',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Project Management',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'User Roles / Permissions',
    free: '',
    small: '',
    medium: '',
    pro: '',
    enterprise: 'Coming soon',
    className: '',
    category: '',
  },
  {
    title: 'Workflow & Collaboration',
    free: '',
    small: '',
    medium: '',
    pro: 'Coming soon',
    enterprise: 'Coming soon',
    className: '',
    category: '',
  },
  {
    title: 'Content Marketing',
    free: '',
    small: '',
    medium: '',
    pro: '',
    enterprise: '',
    className: 'category_header',
    category: 'category pt-3',
  },
  {
    title: 'Audience Targeting',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Content Planner',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Content Wizard',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Design With Canva',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Direct Publishing',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Multi-channel Publishing',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Personas',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Social Media/ Blog Post Composer',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Ads Solution',
    free: '',
    small: '',
    medium: '',
    pro: '',
    enterprise: '',
    className: 'category_header',
    category: 'category pt-3',
  },
  {
    title: 'Facebook Ads',
    free: '',
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Google Ads',
    free: '',
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Instagram Ads',
    free: '',
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Supported channels',
    free: '1*',
    small: '5*',
    medium: '10*',
    pro: '50*',
    enterprise: 'Unlimited *',
    className: 'category_header',
    category: 'category pt-3',
  },
  {
    title: 'Drupal',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Facebook',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'GetResponse',
    free: 'Coming soon',
    small: 'Coming soon',
    medium: 'Coming soon',
    pro: 'Coming soon',
    enterprise: 'Coming soon',
    className: '',
    category: '',
  },
  {
    title: 'Google My Business',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Instagram',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Joomla',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'LinkedIn',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Mailchimp',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Medium',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Tumblr',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Twitter',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'WordPress',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'YouTube',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Tools',
    free: '',
    small: '',
    medium: '',
    pro: '',
    enterprise: '',
    className: 'category_header',
    category: 'category pt-3',
  },
  {
    title: 'Analytics',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'Bulk Uploader',
    free: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    small: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    medium: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    pro: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    enterprise: <FontAwesomeIcon icon={faCheck} className="text-green" />,
    className: '',
    category: '',
  },
  {
    title: 'DAM Time Limitation',
    free: '30 days',
    small: 'Unlimited',
    medium: 'Unlimited',
    pro: 'Unlimited',
    enterprise: 'Unlimited',
    className: '',
    category: '',
  },
  {
    title: 'Digital Asset Management',
    free: '100MB',
    small: '500MB',
    medium: '1GB',
    pro: '5GB',
    enterprise: '10GB',
    className: '',
    category: '',
  },
  {
    title: 'Export',
    free: 'Coming soon',
    small: 'Coming soon',
    medium: 'Coming soon',
    pro: 'Coming soon',
    enterprise: 'Coming soon',
    className: '',
    category: '',
  },
  {
    title: 'Image Editor',
    free: 'Coming soon',
    small: 'Coming soon',
    medium: 'Coming soon',
    pro: 'Coming soon',
    enterprise: 'Coming soon',
    className: '',
    category: '',
  },
  {
    title: 'Stock Photos',
    free: 'Coming soon',
    small: 'Coming soon',
    medium: 'Coming soon',
    pro: 'Coming soon',
    enterprise: 'Coming soon',
    className: '',
    category: '',
  },
];

const plans = [
  {
    planName: 'Free',
    plan_slug: 'free',
    amount: 'free',
  },
  {
    planName: 'Small',
    plan_slug: 'small',
    amount: '$29',
  },
  {
    planName: 'Medium',
    plan_slug: 'medium',
    amount: '$69',
  },
  {
    planName: 'Pro',
    plan_slug: 'pro',
    amount: '$99',
  },
  {
    planName: 'Enterprise',
    plan_slug: 'enterprise',
    amount: '$199',
  },
];

class ComponentBillingPlan extends React.Component {
  Paddle = null;

  constructor(props) {
    super(props);
    this.state = {
      intervalMode: 'month',
    };
  }

  onChangeIntervalMode() {
    this.setState({
      intervalMode: !this.state.intervalMode,
    });
  }

  render() {
    let { isDisable } = this.props;
    return (
      <div className="pb-3">
        <div className="row" role="rowgroup">
          <div
            role="row"
            className="d-none col_thumb cursor-pointer undefined col-6 mb-6 bg-white shadow-sm h-100 "
          >
            <div className="row">
              <div className="item_thumb p-3 post-card-current-plan rounded-2 col-md-6">
                <div className="p-3">
                  <p>Current subscription plan</p>
                </div>
              </div>

              <div className="item_thumb p-3 post-card-next-payment rounded-2 col-md-6">
                <div className="p-3">
                  <p>Next payment</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="wrapper_header_page">
          <div className="main_description_top">
            <h2>Flexible Plans, Flexible Solutions</h2>
            <div className="mb-5">
              <p className="fs-5 fs-4">for teams and projects of any size</p>
            </div>
          </div>
        </div>

        <div id="table_pricing" className="wrapper_table wrapper_table_billing container mb-5">
          <div className="d-table w-100 content_table">
            <div className="d-table-row table_row_header">
              <div className="d-table-cell align-middle text-center">Pick your plan</div>
              {plans.map((plan, i) => {
                const isFree = plan.plan_slug === 'free';

                return (
                  <div key={i} className="d-table-cell p-3 ">
                    <div className={'title ' + (isFree ? 'opacity-0' : 'text-uppercase fw-bold')}>
                      {plan.planName}
                    </div>
                    <div className="price">
                      <div className="monthly">
                        <span className="number text-center">
                          {isFree ? plan.planName : plan.amount}
                        </span>
                        {!isFree && <span>per month</span>}
                      </div>
                      <div className="yearly">
                        <span className="number">{plan.planName}</span>
                      </div>
                    </div>
                    <div>
                      <button
                        className={`btn btn-success text-nowrap getstarts ${
                          plan.plan_slug === 'free' || this.props.planName === plan.plan_slug
                            ? 'hidden'
                            : ''
                        }`}
                        onClick={() => {
                          if (this.props.planName === plan.plan_slug) {
                            notify('Please Choose A Different Plan', 'warning');
                            return;
                          }
                          this.props.handleSelectSubscriptionPlan(plan.plan_slug);
                        }}
                        data-toggle="modal"
                        data-target=".talktosales"
                        disabled={isDisable}
                      >
                        Get Started
                        <FontAwesomeIcon icon={faChevronRight} />
                      </button>
                    </div>
                    {plan.plan_slug === 'free' && (
                      <p className="mb-0 fs-14 text-center mt-2">No Credit Card Required</p>
                    )}
                  </div>
                );
              })}
            </div>
            {data.map((value, key) => {
              return (
                <div key={key} className={`d-table-row ${value.className}`}>
                  <div className={`d-table-cell item ${value.category}`}>{value.title}</div>
                  <div className="d-table-cell value">{value.free}</div>
                  <div className="d-table-cell value">{value.small}</div>
                  <div className="d-table-cell value">{value.medium}</div>
                  <div className="d-table-cell value">{value.pro}</div>
                  <div className="d-table-cell value">{value.enterprise}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="wrapper_banner_plan"
          style={{ backgroundImage: `url("/assets/images/join-bg.png")` }}
        >
          <div className="text-center">
            <h2 className="text-white">Need help choosing the right plan?</h2>
            <p className="text-white text_plan_price fw-100">
              Tell our expert about your project to get a tailored plan that works best for your
              team.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ComponentBillingPlan;
