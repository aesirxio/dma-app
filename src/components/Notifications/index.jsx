/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { withTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell';
import './index.scss';
import NotificationStore from '../../store/Store/notification';
import { AUTHORIZATION_KEY, GENERAL_CONFIG, Storage } from 'aesirx-dma-lib';
import { io } from 'socket.io-client';
import { WEBSOCKET_EVENT_SIGNATURES } from '../../constants/WebSocketClient';
import history from '../../routes/history';
import ComponentImage from '../ComponentImage';
import { formatDate } from '../../utils/date';

const notificationStore = new NotificationStore();

class Notifications extends React.Component {
  listNotificationModel = null;
  constructor(props) {
    super(props);
    this.state = {
      getDataNotification: [],
    };

    this.userID = Storage.getItem(AUTHORIZATION_KEY.MEMBER_ID, null);
    this.listNotificationModel = notificationStore;

    this.isAuthenticated = Storage.getItem('auth', false);
    this.userID = Storage.getItem(AUTHORIZATION_KEY.MEMBER_ID, null);
    this.userName = Storage.getItem(AUTHORIZATION_KEY.MEMBER_EMAIL, null);
    this.roomID = null;
    this.roomMarkRead = null;
    this.roomMarkReadAll = null;
    this.socket = null;
    this.classBindingHandler();
    this.isValidWSClient = this.isAuthenticated && this.userID && this.userName;
    if (this.isValidWSClient) {
      this.socketInitializationHandler();
    }

    this.upNotification();
    this.upMarkRead();
    this.upMarkReadAll();
  }

  socketInitializationHandler() {
    this.socket = io(GENERAL_CONFIG.WEBSOCKET_ENDPOINT, {
      autoConnect: false,
    });
    this.socket.on(
      WEBSOCKET_EVENT_SIGNATURES.CPN_ON_WEBSOCKET_ERROR,
      this.onSocketErrorHandler.bind(this)
    );
    if (!window.ContentPublishingNotificationWSClient) {
      window.ContentPublishingNotificationWSClient = this;
    }
  }

  classBindingHandler() {
    this.upNotification.bind(this);
    this.upMarkRead.bind(this);
    this.onReceivingAForwardedMessageFromServer.bind(this);
    this.closeWebSocketClientInstance.bind(this);
    this.onSocketErrorHandler.bind(this);
  }

  upNotification() {
    try {
      this.roomID = ''
        .concat('AsyncPost_Notify_')
        .concat('UserID=')
        .concat(this.userID)
        .concat('UserName=')
        .concat(this.userName)
        .trim();

      // WS Client gets started a CONNECTION
      this.socket.connect();

      this.socket.on('connect', () => {
        if (this.socket.connected) {
          // Send server a signal to join room by a predefined {roomID}
          this.socket.emit(WEBSOCKET_EVENT_SIGNATURES.CPN_JOINING_ROOM, this.roomID);

          // WS Client EMIT an Event of PUSH_NOTIFICATION to REACT-APP
          this.socket.on(
            WEBSOCKET_EVENT_SIGNATURES.CPN_FORWARD_NOTIFICATION,
            this.onReceivingAForwardedMessageFromServer.bind(this)
          );
        }
      });
    } catch (ex) {
      this.closeWebSocketClientInstance.bind(this);
    }
    return this;
  }

  upMarkRead() {
    try {
      this.roomMarkRead = ''
        .concat('Mark_Read_Notify_')
        .concat('UserID=')
        .concat(this.userID)
        .concat('UserName=')
        .concat(this.userName)
        .trim();

      // WS Client gets started a CONNECTION
      this.socket.connect();

      this.socket.on('connect', () => {
        if (this.socket.connected) {
          // Send server a signal to join room by a predefined {roomID}
          this.socket.emit(WEBSOCKET_EVENT_SIGNATURES.CPN_JOINING_ROOM, this.roomMarkRead);

          // WS Client EMIT an Event of PUSH_NOTIFICATION to REACT-APP
          this.socket.on(
            WEBSOCKET_EVENT_SIGNATURES.CPN_FORWARD_NOTIFICATION_MARK_READ,
            this.onReceivingAForwardedMessageFromServer.bind(this)
          );
        }
      });
    } catch (ex) {
      this.closeWebSocketClientInstance.bind(this);
    }
    return this;
  }

  upMarkReadAll() {
    try {
      this.roomMarkReadAll = ''
        .concat('Mark_Read_All_Notify_')
        .concat('UserID=')
        .concat(this.userID)
        .concat('UserName=')
        .concat(this.userName)
        .trim();

      // WS Client gets started a CONNECTION
      this.socket.connect();

      this.socket.on('connect', () => {
        if (this.socket.connected) {
          // Send server a signal to join room by a predefined {roomID}
          this.socket.emit(WEBSOCKET_EVENT_SIGNATURES.CPN_JOINING_ROOM, this.roomMarkReadAll);

          // WS Client EMIT an Event of PUSH_NOTIFICATION to REACT-APP
          this.socket.on(
            WEBSOCKET_EVENT_SIGNATURES.CPN_FORWARD_NOTIFICATION_MARK_ALL_READ,
            this.onReceivingAForwardedMessageFromServer.bind(this)
          );
        }
      });
    } catch (ex) {
      this.closeWebSocketClientInstance.bind(this);
    }
    return this;
  }

  onReceivingAForwardedMessageFromServer(roomID, messageObject) {
    this.setState({
      getDataNotification: JSON.parse(messageObject.notificationData),
    });
  }

  closeWebSocketClientInstance() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
    this.socket.close();
  }

  onSocketErrorHandler(error) {
    try {
      this.errorHandler(error);
      this.closeWebSocketClientInstance();
    } catch (error) {
      // no error throw
    }
  }

  handleClickNotificationItem = (notification) => {
    notificationStore.markRead(
      notification.id,
      this.userID,
      () => {},
      () => {}
    );
    history.push(`/content/${notification.content_id}/${notification.channel_item_id}`);
  };

  handleClickMarkReadAll = () => {
    notificationStore.markReadAll(
      this.userID,
      () => {},
      () => {}
    );
  };

  getListNotification = (memberID) => {
    notificationStore.getNotificationsService(
      memberID,
      (result) => {
        this.setState({
          getDataNotification: result,
        });
      },
      () => {}
    );
  };

  CustomToggleBell = React.forwardRef(({ onClick }, ref) => (
    <span
      style={{ cursor: 'pointer' }}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="text-blue-0"
    >
      {this.state.getDataNotification.unread > 0 && (
        <span className="number_bell position-absolute rounded-circle bg-orange white d-flex align-items-center justify-content-center text-white">
          {this.state.getDataNotification.unread}
        </span>
      )}
      <FontAwesomeIcon icon={faBell} />
    </span>
  ));

  componentNotification = (data) => {
    return (
      <ul className="ps-0 list-unstyled mb-0 wr_list_notification">
        {data &&
          data.map((value, index) => {
            let dataParse = value.data ? JSON.parse(value.data) : null;

            return (
              <li
                key={index}
                className={`pt-3 pb-3 border-bottom-1 border-gray item_notification pe-2 ${
                  value.is_read === 1 ? 'opacity-25' : ''
                }`}
              >
                <div
                  href={`/content/${value.content_id}/${value.channel_item_id}`}
                  className="cursor-pointer text-decoration-none"
                  onClick={() => this.handleClickNotificationItem(value)}
                >
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <div>
                      <ComponentImage
                        src={`/assets/images/${value.channel_type}.png`}
                        className="img-avatar-35"
                        alt={value.channel_type}
                      />
                      <span className="ps-2 text-black">
                        {dataParse && dataParse.general.headline}
                      </span>
                    </div>
                    <p className="mb-0 fs-14 text-black opacity-50">
                      {formatDate(value.created_at, true)}
                    </p>
                  </div>
                  <p className="mb-0 fs-14 text-black opacity-75">
                    {dataParse && dataParse.content.description}
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    );
  };

  componentDidMount = () => {
    this.getListNotification(this.userID);
  };

  render() {
    const { t } = this.props;
    let { getDataNotification } = this.state;

    return (
      <div className="wrapper_dropdown position-relative">
        <Dropdown>
          <Dropdown.Toggle
            as={this.CustomToggleBell}
            id="dropdown-custom-components position-relative"
          ></Dropdown.Toggle>
          <Dropdown.Menu className="top-100 shadow border-0 p-3 pe-0">
            <div className="d-flex justify-content-between align-items-center mb-2 pe-3">
              <h5 className="blue mb-0">{t('txt_notifications')}</h5>
              <div
                onClick={this.handleClickMarkReadAll}
                className="text_heading_bell fs-12 mb-0 text-black opacity-50 cursor-pointer text-decoration-none"
              >
                {t('txt_mark_all_as_read')}
              </div>
            </div>
            <div className="wrapper_tabs pe-2">
              {this.componentNotification(getDataNotification.items)}
              {/* <Tabs defaultActiveKey="internal" id="noanim-tab-example">
                <Tab eventKey="internal" title={t("txt_internal")}>
                  {this.componentNotification(data)}
                </Tab>
                <Tab eventKey="client" title={t("txt_client")}>
                  {this.componentNotification(data)}
                </Tab>
              </Tabs> */}
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default withTranslation('common')(Notifications);
