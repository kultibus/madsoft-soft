import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import {
  QUIZ_ROUTE,
  APP_MAIN_ROUTE,
  RESULT_ROUTE,
  CONFIG_ROUTE,
} from '@src/routes';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { Home, Quiz, Result } from './pages';

import './index.scss';

const appContainer = document.querySelector('#root') as Element;
const root = createRoot(appContainer);

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={APP_MAIN_ROUTE} element={<Outlet />}>
      <Route index element={<Home />} />
      <Route path={CONFIG_ROUTE} element={<div>config</div>} />
      <Route path={QUIZ_ROUTE} element={<Quiz />} />
      <Route path={RESULT_ROUTE} element={<Result />} />
    </Route>,
  ),
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider
          router={router}
          fallbackElement={<div>подождите...</div>}
        />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
