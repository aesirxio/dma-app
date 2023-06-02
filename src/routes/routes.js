/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';
import { LoginPage, ProfilePage, DigitalAssetsPage } from 'aesirx-uikit';
import { BrowserRouter } from 'react-router-dom';

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

const mainRoutes = (basename = '/') => {
  return [
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
      main: ({ match, location }) => (
        <BrowserRouter basename={basename}>
          <Projects match={match} location={location} />
        </BrowserRouter>
      ),
    },

    {
      path: '/campaigns',
      exact: false,
      main: ({ match, location }) => (
        <BrowserRouter basename={basename}>
          <CampaignsPage match={match} location={location} />
        </BrowserRouter>
      ),
    },
    {
      path: '/channels',
      exact: false,
      main: ({ match, location }) => (
        <BrowserRouter basename={basename}>
          <ChannelsPage match={match} location={location} />
        </BrowserRouter>
      ),
    },

    {
      path: '/calendar',
      exact: false,
      main: ({ match, location }) => (
        <BrowserRouter basename={basename}>
          <CalendarPage match={match} location={location} />
        </BrowserRouter>
      ),
    },
    {
      path: ['/content', '/content/create', '/content-edit/:categoryId', '/content/:id'],
      exact: true,
      main: ({ match, location }) => (
        <BrowserRouter basename={basename}>
          <ContentPage match={match} location={location} />
        </BrowserRouter>
      ),
    },

    {
      path: '/digital-assets',
      exact: false,
      main: () => <DigitalAssetsPage />,
    },
  ];
};

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
];

const integrationRoutes = () =>
  mainRoutes('dma')
    .filter((item) => item.path !== '/digital-assets')
    .map((item) => {
      if (Array.isArray(item.path)) {
        item.path = item.path.map((path) => '/dma' + path);
      } else {
        item.path = '/dma' + item.path;
      }

      return item;
    });

export { authRoutes, mainRoutes, settingRoutes, integrationRoutes };
