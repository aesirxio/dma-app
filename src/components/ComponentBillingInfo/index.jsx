/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

function ComponentBillingInfo(props) {
  let cmsFeaturesMasterData = props.cmsFeaturesMasterData;
  let countSocialMediaChannel = props.countSocialMediaConnected;
  let countAdsChannel = props.countAdvertisingConnected;
  let countCMSChannel = props.countCMSConnected;
  let countEmailMarketingChannel = props.countEmailMarketingConnected;
  let uploadHistoryQuotas = props.uploadHistoryQuotas;
  let lastPaymentDay = props.subscriptionDetail && props.subscriptionDetail.last_payment.date
  if (!lastPaymentDay) {
    lastPaymentDay = uploadHistoryQuotas && uploadHistoryQuotas.user_created_at;
  }
  let dayLefts = null;
  let maxChannel = cmsFeaturesMasterData && cmsFeaturesMasterData[0].option;

  if (
    lastPaymentDay &&
    ((props.planName === 'free') ||
      props.subscriptionDetail == null)
  ) {
    let arr = lastPaymentDay.split('/');
    let now = new Date();
    let date = new Date(arr[2] + '/' + arr[1] + '/' + arr[0]);
    var different = Math.abs(now.getTime() - date.getTime());
    dayLefts = parseInt(different / (3600 * 24 * 1000));
    dayLefts = Math.min(dayLefts, 30);
  }
  return (
    <div>
      <div className="bg-white p-3">
        <div className="py-2 px-3 bg-blue">
          <div className="row">
            <div className="col-4">
              <span>Type</span>
            </div>
            <div className="col-4">
              <span>Current</span>
            </div>
            <div className="col-4">
              <span>Limit</span>
            </div>
          </div>
        </div>
        <div className="px-3">
          {maxChannel ? (
            <React.Fragment>
              <div className="row py-3 border-bottom-1 item_project">
                <div className="col-4">
                  <div className="d-flex align-items-center">
                    <span>Social Media Channel</span>
                  </div>
                </div>
                <div className="col-4">
                  <span>{countSocialMediaChannel}</span>
                </div>
                <div className="col-4">
                  <span>{maxChannel}</span>
                </div>
              </div>
              {props.planName !== 'free' ? (
                <div className="row py-3 border-bottom-1 item_project">
                  <div className="col-4">
                    <div className="d-flex align-items-center">
                      <span>Advertise Channel</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <span>{countAdsChannel}</span>
                  </div>
                  <div className="col-4">
                    <span>{maxChannel}</span>
                  </div>
                </div>
              ) : null}
              <div className="row py-3 border-bottom-1 item_project">
                <div className="col-4">
                  <div className="d-flex align-items-center">
                    <span>CMS Channel</span>
                  </div>
                </div>
                <div className="col-4">
                  <span>{countCMSChannel}</span>
                </div>
                <div className="col-4">
                  <span>{maxChannel}</span>
                </div>
              </div>
              <div className="row py-3 border-bottom-1 item_project">
                <div className="col-4">
                  <div className="d-flex align-items-center">
                    <span>Email Marketing Channel</span>
                  </div>
                </div>
                <div className="col-4">
                  <span>{countEmailMarketingChannel}</span>
                </div>
                <div className="col-4">
                  <span>{maxChannel}</span>
                </div>
              </div>
            </React.Fragment>
          ) : null}
          {dayLefts || dayLefts === 0 ? (
            <div className="row py-3 border-bottom-1 item_project">
              <div className="col-4">
                <div className="d-flex align-items-center">
                  <span>Number Of Days For DAM Asset</span>
                </div>
              </div>
              <div className="col-4">
                <span>{dayLefts}</span>
              </div>
              <div className="col-4">
                <span>30</span>
              </div>
            </div>
          ) : null}
          {uploadHistoryQuotas && uploadHistoryQuotas.current >= 0 ? (
            <div className="row py-3 border-bottom-1 item_project">
              <div className="col-4">
                <div className="d-flex align-items-center">
                  <span>Storage DAM Asset</span>
                </div>
              </div>
              <div className="col-4">
                <span>{parseInt(uploadHistoryQuotas.current / 1000000)} MB</span>
              </div>
              <div className="col-4">
                <span>{parseInt(uploadHistoryQuotas.maxLimit / 1000000)} MB</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default ComponentBillingInfo;
