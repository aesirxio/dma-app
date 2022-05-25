import React, { lazy } from 'react';

// const HomePage = lazy(() => import("../pages/Homepage"));
const ActivateMember = lazy(() => import('../containers/ActivateMember'));
const Signuppage = lazy(() => import('../containers/SignUp'));
const ForgotPasswordPage = lazy(() => import('../containers/ForgotPasswordPage'));
const VerifyEmailPage = lazy(() => import('../containers/VerifyEmailPage'));

const SocialMediaPage = lazy(() => import('../pages/SocialMediaPage'));

const CalendarPage = lazy(() => import('../containers/CalendarPage'));

const HomePage = lazy(() => import('../containers/Homepage'));
const Projects = lazy(() => import('../containers/ProjectsPage'));
const LoginPage = lazy(() => import('../containers/LoginPage'));
const PersonasPage = lazy(() => import('../containers/PersonasPage'));
const CampaignsPage = lazy(() => import('../containers/CampaignsPage'));
const ContentPage = lazy(() => import('../containers/ContentPage'));
const WizardPage = lazy(() => import('../containers/WizardPage'));
const AnalyticsPage = lazy(() => import('../containers/AnalyticsPage'));
const BillingPlanPage = lazy(() => import('../containers/BillingPlanPage'));
const BillingPlanQuotas = lazy(() => import('../containers/BillingPlanQuotasPage'));
const ChannelsPage = lazy(() => import('../containers/ChannelsPage'));
const ProfilePage = lazy(() => import('../containers/ProfilePage'));
const DigitalAssetsPage = lazy(() => import('../containers/DigitalAssetsPage'));
const WelcomePage = lazy(() => import('../containers/WelcomePage'));
const ResetPasswordPage = lazy(() => import('../containers/ResetPasswordPage'));

const authRoutes = [
  {
    path: '/login',
    exact: true,
    main: () => <LoginPage />,
  },
  {
    path: '/signup',
    exact: true,
    main: () => <Signuppage />,
  },
  {
    path: '/forgot-password',
    exact: true,
    main: () => <ForgotPasswordPage />,
  },
  {
    path: '/verify',
    exact: true,
    main: () => <VerifyEmailPage />,
  },
  {
    path: '/activate-member',
    exact: false,
    main: ({ match, location }) => <ActivateMember match={match} location={location} />,
  },
  {
    path: '/reset-password/:activation/:username',
    exact: true,
    main: () => <ResetPasswordPage />,
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
      '/wizard',
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
    path: [
      '/personas',
      '/personas/create',
      '/personas/edit/:id',
      '/personas/create/:bypersonatemplate/:id',
    ],
    exact: true,
    main: ({ match, location }) => <PersonasPage match={match} location={location} />,
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
    path: '/social-media',
    exact: false,
    main: ({ match, location }) => <SocialMediaPage match={match} location={location} />,
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
    path: '/analytics',
    exact: false,
    main: ({ match, location }) => <AnalyticsPage match={match} location={location} />,
  },
  {
    path: '/digital-assets',
    exact: false,
    main: ({ match, location }) => <DigitalAssetsPage match={match} location={location} />,
  },
];

const settingRoutes = [
  {
    path: '/billing-plan',
    exact: false,
    main: ({ match, location }) => <BillingPlanPage match={match} location={location} />,
  },
  {
    path: '/billing-plan-quotas',
    exact: false,
    main: ({ match, location }) => <BillingPlanQuotas match={match} location={location} />,
  },
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
