/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';

const CalendarPage = lazy(() => import('../containers/CalendarPage'));
const Projects = lazy(() => import('../containers/ProjectsPage'));
const LoginPage = lazy(() => import('../containers/LoginPage'));
const CampaignsPage = lazy(() => import('../containers/CampaignsPage'));
const ContentPage = lazy(() => import('../containers/ContentPage'));
const WizardPage = lazy(() => import('../containers/WizardPage'));
const ChannelsPage = lazy(() => import('../containers/ChannelsPage'));
const ProfilePage = lazy(() => import('../containers/ProfilePage'));
const DigitalAssetsPage = lazy(() => import('../containers/DigitalAssetsPage'));
const WelcomePage = lazy(() => import('../containers/WelcomePage'));

const authRoutes = [
  {
    path: '/login',
    exact: true,
    main: () => <LoginPage />,
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
    main: ({ match, location }) => <DigitalAssetsPage match={match} location={location} />,
  },
];

const settingRoutes = [
  {
    path: '/profile',
    exact: false,
    main: ({ match, location }) => <ProfilePage match={match} location={location} />,
  },
  {
    path: '/welcome',
    exact: true,
    main: () => <WelcomePage />,
  },
];

export { authRoutes, mainRoutes, settingRoutes };
