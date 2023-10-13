/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';
import { LoginPage, ProfilePage, DigitalAssetsPage, history } from 'aesirx-uikit';
import { SSOConfig } from 'aesirx-sso';
const CalendarPage = lazy(() => import('../containers/CalendarPage'));
const Projects = lazy(() => import('../containers/ProjectsPage'));
const CampaignsPage = lazy(() => import('../containers/CampaignsPage'));
const ContentPage = lazy(() => import('../containers/ContentPage'));
const WizardPage = lazy(() => import('../containers/WizardPage'));
const ChannelsPage = lazy(() => import('../containers/ChannelsPage'));
const WelcomePage = lazy(() => import('../containers/WelcomePage'));

const authRoutes = [
  {
    path: '/login',
    exact: true,
    main: () => <LoginPage text="DMA" />,
  },
];

const mainRoutes = [
  {
    path: '/',
    exact: true,
    main: () => <CalendarPage />,
  },
  {
    path: [
      '/channel',
      '/wizard/createproject',
      '/wizard/project/:id',
      '/wizard/project/:id/content',
      '/wizard/:id/content',
      '/wizard/content',
    ],
    exact: true,
    main: ({ match, location }) => <WizardPage match={match} location={location} />,
  },
  {
    path: '/projects',
    exact: false,
    main: ({ match, location }) => <Projects match={match} location={location} />,
  },

  {
    path: '/campaigns',
    exact: false,
    main: ({ match, location }) => <CampaignsPage match={match} location={location} />,
  },
  {
    path: '/channels',
    exact: false,
    main: ({ match, location }) => <ChannelsPage match={match} location={location} />,
  },

  {
    path: '/calendar',
    exact: false,
    main: ({ match, location }) => <CalendarPage match={match} location={location} />,
  },
  {
    path: ['/content', '/content/create', '/content-edit/:categoryId', '/content/:id'],
    exact: true,
    main: ({ match, location }) => <ContentPage match={match} location={location} />,
  },

  {
    path: '/digital-assets',
    exact: false,
    main: () => <DigitalAssetsPage />,
  },
];

const settingRoutes = [
  {
    path: '/profile',
    exact: false,
    main: () => <ProfilePage />,
  },
  {
    path: '/welcome',
    exact: true,
    main: () => <WelcomePage />,
  },
  {
    path: '/sso',
    exact: false,
    main: () => <SSOConfig />,
  },
];

const integrationRoutes = () =>
  mainRoutes
    .filter((item) => item.path !== '/digital-assets')
    .map((item) => {
      if (Array.isArray(item.path)) {
        item.path = item.path.map((path) => '/dma' + path);
      } else {
        item.path = '/dma' + item.path;
      }

      return item;
    });

const historyPush = (link) => {
  return history.push((process.env.REACT_APP_INTERGRATION ? '/dma' : '') + link);
};

const linkPush = (link) => {
  return (process.env.REACT_APP_INTERGRATION ? '/dma' : '') + link;
};

export { authRoutes, mainRoutes, settingRoutes, integrationRoutes, historyPush, linkPush };
