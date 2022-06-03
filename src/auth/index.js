/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import history from '../routes/history';
import { notify } from '../components/Toast';
import { AesirxAuthenticationApiService, AUTHORIZATION_KEY, Storage } from 'aesirx-dma-lib';
import ContentPublishingNotificationWSClient from '../websocket/ContentPublishingNotificationWSClient';

// LOGIN
const login = async ({ username, password, remember }) => {
  document.body.classList.add('body_login_page');
  const authService = new AesirxAuthenticationApiService();
  const result = await authService.login(username, password);
  if (result) {
    Storage.setItem('auth', true);
    document.body.classList.remove('body_login_page');

    history.push('/');
    return true;
  } else {
    notify('Login information is incorrect', 'error');
    document.body.classList.remove('body_login_page');
    return false;
  }
};

const socialLogin = async (socialType, accessToken) => {
  document.body.classList.add('body_login_page');
  const authService = new AesirxAuthenticationApiService();
  const result = await authService.socialLogin(socialType, accessToken);
  if (result) {
    Storage.setItem('auth', true);
    Storage.setItem('first_login', false);
    document.body.classList.remove('body_login_page');
    // if (result.first_login) {
    //   Storage.setItem('first_login', true);
    //   history.push('/wizard');
    // } else {
    //   history.push('/');
    // }
    history.push('/');
    return true;
  } else {
    notify('Login information is incorrect', 'error');
    document.body.classList.remove('body_login_page');
    return false;
  }
};

// LOGOUT
const logout = () => {
  localStorage.clear();
  if (window.ContentPublishingNotificationWSClient) {
    window.ContentPublishingNotificationWSClient.closeWebSocketClientInstance();
  }

  history.push('/login');
};

// LOGIN STATUS
const isLogin = () => {
  try {
    const isAuthenticated = Storage.getItem('auth');
    const userID = Storage.getItem(AUTHORIZATION_KEY.MEMBER_ID, null);
    const userName = Storage.getItem(AUTHORIZATION_KEY.MEMBER_EMAIL, null);

    if (isAuthenticated && userID && userName) {
      // autoLogoutInitalization();
      ContentPublishingNotificationWSClient.__init();
      return true;
    }
    return false;
  } catch (error) {
    logout();
  }
};

export { login, logout, isLogin, socialLogin };
