/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import 'aesirx-uikit/dist/index.css';
import 'scss/app.scss';

import { AppProvider, Menu, isLogin } from 'aesirx-uikit';
import { appLanguages } from 'translations';
import { authRoutes, mainRoutes, settingRoutes } from 'routes/routes';

import { AesirXDamStorage } from 'aesirx-dam-app';
import { mainMenu, settingMenu, profileMenu } from 'routes/menu';

const App = () => {
  return (
    <AppProvider
      appLanguages={appLanguages}
      authRoutes={authRoutes}
      mainRoutes={mainRoutes()}
      settingRoutes={settingRoutes}
      profileMenu={profileMenu}
      isLogin={isLogin}
      componentBottomMenu={<AesirXDamStorage />}
      leftMenu={<Menu dataMenu={mainMenu} />}
      settingMenu={<Menu dataMenu={settingMenu} />}
    />
  );
};

export default App;
