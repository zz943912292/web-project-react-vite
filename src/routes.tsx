import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const Carousel = lazy(() => import('./pages/Carousel'));

const routes: RouteProps[] = [
  { path: '/homepage', component: HomePage },
  { path: '/', component: Carousel },
];

export default routes;
