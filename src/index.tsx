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
import { QUIZ_ROUTE, APP_MAIN_ROUTE } from '@src/routes';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { Home, Quiz } from './pages';

import './index.scss';

const appContainer = document.querySelector('#root') as Element;
const root = createRoot(appContainer);

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={APP_MAIN_ROUTE} element={<Outlet />}>
      <Route index element={<Home />} />
      <Route path={QUIZ_ROUTE} element={<Quiz />} />
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
