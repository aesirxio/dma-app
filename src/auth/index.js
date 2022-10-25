/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import history from '../routes/history';
import { notify } from '../components/Toast';
import {
  AesirxAuthenticationApiService,
  AUTHORIZATION_KEY,
  Storage,
  AXIOS_CONFIGS,
  GENERAL_CONFIG,
} from 'aesirx-dma-lib';

if (
  AXIOS_CONFIGS.CLIENT_ID === '' ||
  AXIOS_CONFIGS.CLIENT_SECRET === '' ||
  AXIOS_CONFIGS.BASE_ENDPOINT_URL === '' ||
  AXIOS_CONFIGS.LICENSE === '' ||
  GENERAL_CONFIG.WEBSOCKET_ENDPOINT === ''
) {
  notify(
    'The app has not been fully configured and you will not be able to login.  Go to https://dma.aesirx.io/install-guide/npm for instructions on how to configure your .env file',
    'error'
  );
}

// LOGIN
const login = async ({ username, password }) => {
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

// LOGOUT
const logout = () => {
  const currentTheme = localStorage.getItem('theme');
  localStorage.clear();
  localStorage.setItem('theme', currentTheme);

  history.push('/login');
};

// LOGIN STATUS
const isLogin = () => {
  try {
    const isAuthenticated = Storage.getItem('auth');
    const userID = Storage.getItem(AUTHORIZATION_KEY.MEMBER_ID, null);
    const userName = Storage.getItem(AUTHORIZATION_KEY.MEMBER_EMAIL, null);

    if (isAuthenticated && userID && userName) {
      return true;
    }
    return false;
  } catch (error) {
    logout();
  }
};

export { login, logout, isLogin };
