/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { Component } from 'react';

class ComponentPublishListChannels extends Component {
  render() {
    let {
      listFacebookFanpageConnected,
      listInstagramFanpageConnected,
      isAdvanceMode,
      contentConnectedChannelsByOrganisationViewModel,
      listLinkedinFanpageConnected,
      isDeselectAllSocial,
      handleDeSelectConnectSomePage,
      getArrayPageFacebook,
      getArrayPageLinkedin,
      getArrayPageInstagram,
      getListConnectFacebookPagePublisd,
      getListConnectInstagramPage,
      getListConnectLinkedinPagePublisd,
      labelsConnectedChannels,
      listFaceBookFanpageView,
      listLinkedinFanpageView,
    } = this.props;


    let checkLabelFacebook = labelsConnectedChannels.includes('facebook');
    let checkLabelLinkedin = labelsConnectedChannels.includes('linkedin');
    let checkLabelInstagram = labelsConnectedChannels.includes('instagram');

    if (isDeselectAllSocial === true) {
      if (checkLabelFacebook) {
        contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.social.facebook.selectedPage = [];
        contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels.facebook.selectedPage = [];
      }

      if (checkLabelLinkedin) {
        contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.social.linkedin.selectedPage = [];
        contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels.linkedin.selectedPage = [];
      }

      if (checkLabelInstagram) {
        contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.social.instagram.selectedPage = [];
        contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels.instagram.selectedPage = [];
      }
    } else {
      if (isAdvanceMode === true) {
        if (checkLabelFacebook) {
          contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.social.facebook.selectedPage = listFacebookFanpageConnected;
        }
        if (checkLabelLinkedin) {
          contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.social.linkedin.selectedPage = listLinkedinFanpageConnected;
        }
        if (checkLabelInstagram) {
          contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSocial.list_channels.social.instagram.selectedPage = listInstagramFanpageConnected;
        }
      } else {
        if (checkLabelFacebook) {
          contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels.facebook.selectedPage = listFacebookFanpageConnected;
        }
        if (checkLabelLinkedin) {
          contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels.linkedin.selectedPage = listLinkedinFanpageConnected;
        }
        if (checkLabelInstagram) {
          contentConnectedChannelsByOrganisationViewModel.dataContentDescriptionSingle.list_channels.instagram.selectedPage = listInstagramFanpageConnected;
        }
      }
    }

    return (
      <>
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6 className="text-blue mb-0">Social Media</h6>
          {/* {
            isDeselectAllSocial ? (
              <a
                href={void 0}
                className="fs-sm text-black opacity-75 text-decoration-none cursor-pointer"
                onClick={handleSelectAllSocial}
              >
                Select all
              </a>
            ) : (
              <a
                href={void 0}
                className="fs-sm text-black opacity-75 text-decoration-none cursor-pointer"
                onClick={handleDeselectAllSocial}
              >
                Deselect all
              </a>
            )
          } */}
        </div>
        <div>
          <ul
            className={`list-unstyled d-flex align-items-center mb-0 flex-wrap ${
              isDeselectAllSocial ? 'opacity-50' : ''
            }`}
          >
            {checkLabelFacebook && (
              <>
                {getListConnectFacebookPagePublisd &&
                  getListConnectFacebookPagePublisd.map((i) => {

                    const currentFanpage = listFaceBookFanpageView.filter(function (e) {
                      return e.id === i;
                    })[0];

                    let isDisabled = getArrayPageFacebook.some((value) => i === value);
                    return (
                      <li
                        key={i}
                        className={`me-2 mb-2 ${isDisabled ? 'opacity-50' : ''}`}
                        onClick={() => handleDeSelectConnectSomePage('facebook', i)}
                      >
                        <span className="d-block cursor-pointer">
                          <span className="position-relative d-block">
                            <img
                              className="img-avatar rounded-circle"
                              src={
                                currentFanpage.avatar
                                  ? currentFanpage.avatar
                                  : '/assets/images/facebook.png'
                              }
                              alt=""
                            />
                            <img
                              src={'/assets/images/facebook.png'}
                              alt=""
                              width={20}
                              className="position-absolute bottom-0 end-0"
                            />
                          </span>
                        </span>
                      </li>
                    );
                  })}
              </>
            )}
            {checkLabelLinkedin && (
              <>
                {getListConnectLinkedinPagePublisd &&
                  getListConnectLinkedinPagePublisd.map((i) => {
                    let isDisabled = getArrayPageLinkedin.some((value) => i === value);
                    return (
                      <li
                        key={i}
                        className={`me-2 mb-2 ${isDisabled ? 'opacity-50' : ''}`}
                        onClick={() => handleDeSelectConnectSomePage('linkedin', i)}
                      >
                        <span className="d-block cursor-pointer">
                          <span className="position-relative d-block ">
                            <img
                              className="img-avatar rounded-circle"
                              src={
                                listLinkedinFanpageView[i].picture
                                  ? listLinkedinFanpageView[i].picture
                                  : '/assets/images/linkedin.png'
                              }
                              alt=""
                            />
                            <img
                              src={'/assets/images/linkedin.png'}
                              alt=""
                              width={20}
                              className="position-absolute bottom-0 end-0"
                            />
                          </span>
                        </span>
                      </li>
                    );
                  })}
              </>
            )}
            {checkLabelInstagram && (
              <>
                {getListConnectInstagramPage &&
                  getListConnectInstagramPage.map((i) => {
                    let isDisabled = getArrayPageInstagram.some((value) => i === value);
                    return (
                      <li
                        key={i}
                        className={`me-2 mb-2 ${isDisabled ? 'opacity-50' : ''}`}
                        onClick={() => handleDeSelectConnectSomePage('instagram', i)}
                      >
                        <span className="d-block cursor-pointer">
                          <span className="position-relative d-block">
                            <img
                              className="img-avatar"
                              src={'/assets/images/avatar-1.png'}
                              alt=""
                            />
                            <img
                              src={'/assets/images/instagram.png'}
                              alt=""
                              width={20}
                              className="position-absolute bottom-0 end-0"
                            />
                          </span>
                        </span>
                      </li>
                    );
                  })}
              </>
            )}
            {labelsConnectedChannels.includes('twitter') && (
              <li className={`me-2 mb-2`}>
                <span className="d-block cursor-pointer">
                  <span className="position-relative d-block">
                    <img className="img-avatar" src={'/assets/images/twitter.png'} alt="" />
                  </span>
                </span>
              </li>
            )}
            {labelsConnectedChannels.includes('youtube') && (
              <li className={`me-2 mb-2`}>
                <span className="d-block cursor-pointer">
                  <span className="position-relative d-block">
                    <img className="img-avatar" src={'/assets/images/youtube.png'} alt="" />
                  </span>
                </span>
              </li>
            )}
            {labelsConnectedChannels.includes('google_my_business') && (
              <li className={`me-2 mb-2`}>
                <span className="d-block cursor-pointer">
                  <span className="position-relative d-block">
                    <img
                      className="img-avatar"
                      src={'/assets/images/google_my_business.png'}
                      alt=""
                    />
                  </span>
                </span>
              </li>
            )}
            {labelsConnectedChannels.includes('tumblr') && (
              <li className={`me-2 mb-2`}>
                <span className="d-block cursor-pointer">
                  <span className="position-relative d-block">
                    <img className="img-avatar" src={'/assets/images/tumblr.png'} alt="" />
                  </span>
                </span>
              </li>
            )}
            {labelsConnectedChannels.includes('medium') && (
              <li className={`me-2 mb-2`}>
                <span className="d-block text-green fw-bold cursor-pointer">
                  <span className="position-relative d-block">
                    <img className="img-avatar" src={'/assets/images/medium.png'} alt="" />
                  </span>
                </span>
              </li>
            )}
          </ul>
        </div>
      </>
    );
  }
}

export default ComponentPublishListChannels;
