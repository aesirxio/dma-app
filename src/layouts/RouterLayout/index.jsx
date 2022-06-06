/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';

import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import { authRoutes, mainRoutes, settingRoutes } from '../../routes/routes';

import AuthLayout from '../AuthLayout';
import MainLayout from '../MainLayout';
import SettingLayout from '../SettingLayout';

import history from '../../routes/history';

import { Toast } from '../../components/Toast';
import NotFound from '../../containers/NotFound';

const RouterLayout = () => {
  const authPath = authRoutes
    .map((item) => {
      return item.path;
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  const mainPath = mainRoutes
    .map((item) => {
      return item.path;
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  const settingPath = settingRoutes
    .map((item) => {
      return item.path;
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  return (
    <>
      <Toast />
      <BrowserRouter>
        <Router history={history}>
          <Switch>
            <Route exact path={authPath}>
              <AuthLayout />
            </Route>
            <Route exact path={mainPath}>
              <MainLayout />
            </Route>
            <Route exact path={settingPath}>
              <SettingLayout />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </BrowserRouter>
    </>
  );
};

export default RouterLayout;
