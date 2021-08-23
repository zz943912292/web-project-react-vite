import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const OtherPage = lazy(() => import('./pages/OtherPage'));

const routes: RouteProps[] = [
  { path: '/others', component: OtherPage },
  { path: '/', component: HomePage },
];

export default routes;
