/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/faArrowUp';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import ComponentImage from '../ComponentImage';
import './index.scss';

const ModalComponent = lazy(() => import('../Modal'));

class ComponentPlanPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  handleShowModalConfirm = () => {
    this.setState({
      showModal: true,
    });
  };

  handleCloseModalConfirm = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    let { handleChangePlan, handleCancelPlan, subscriptionDetail } = this.props;
    return (
      <div>
        <div className="d-flex">
          <div className="item_plan_payment p-0 w-350 px-3 pe-2">
            <div
              className="bg_plan_payment border-1 rounded-2 p-3 object-fit-cover position-relative bg-green-2 text-white border-white h-100"
              style={{ backgroundImage: `url("/assets/images/bg-plan.png")` }}
            >
              <p className="mb-3">Current subscription plan</p>
              <div className="mb-3">
                <p className="mb-0 text-uppercase">{subscriptionDetail.plan_name}</p>
                <p className="mb-0">
                  <span className="fw-medium fs-4">{subscriptionDetail.amount}</span>
                  <span>.00</span>
                </p>
              </div>
              <button className="btn btn-success" onClick={handleChangePlan}>
                <i className="me-2">
                  <FontAwesomeIcon icon={faArrowUp} />
                </i>
                <span>Change Plan</span>
              </button>
            </div>
          </div>
          <div className="item_plan_payment p-0 w-350 px-3 ps-2">
            <div className="border-1 rounded-2 p-3 position-relative">
              <ComponentImage
                src="/assets/images/icon-plan.png"
                style={{ width: '60px', height: '45px' }}
                className="position-absolute top-0 end-0 mt-4 me-3"
                alt="icon plan"
              />
              <p className="mb-3">
                {subscriptionDetail.next_payment !== undefined ? 'Next payment' : 'Last payment'}
              </p>
              <div className="mb-3">
                <p className="mb-0">
                  <span className="fw-medium fs-4">
                    {subscriptionDetail.next_payment !== undefined
                      ? subscriptionDetail.next_payment?.amount
                      : subscriptionDetail.last_payment?.amount}
                  </span>
                  <span>.00</span>
                </p>
                <p className="mb-0 opacity-75">
                  on{' '}
                  {subscriptionDetail.next_payment !== undefined
                    ? subscriptionDetail.next_payment?.date
                    : subscriptionDetail.last_payment?.date}
                </p>
              </div>
              <button
                className="btn border-da-1 border-red text-red-1"
                onClick={this.handleShowModalConfirm}
              >
                <i className="me-2">
                  <FontAwesomeIcon icon={faTimes} />
                </i>
                <span>Cancel Plan</span>
              </button>
            </div>
          </div>
        </div>
        <ModalComponent
          show={this.state.showModal}
          onHide={this.handleCloseModalConfirm}
          body={<p className="text-center">Are you sure want to cancel</p>}
          key={Math.random(40, 200)}
          header={'Cancel Plan'}
          footer={
            <div className="d-flex align-items-center justify-content-center w-100">
              <Button onClick={handleCancelPlan} className="btn btn-success">
                <span>Remove</span>
              </Button>
            </div>
          }
        />
      </div>
    );
  }
}

export default ComponentPlanPayment;
