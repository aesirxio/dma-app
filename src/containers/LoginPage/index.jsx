/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { login } from '../../auth';
import { LoginPage as AesirXLoginPage } from 'aesirx-uikit';

const LoginPage = () => {
  return <AesirXLoginPage login={login} text="DMA" />;
};

export default LoginPage;
