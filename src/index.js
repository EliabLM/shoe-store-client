/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.0
=========================================================

* Product Page: https://material-ui.com/store/items/soft-ui-pro-dashboard/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';

import App from 'App';
import './index.css';

// Soft UI Context Provider
import { SoftUIControllerProvider } from 'context';
import AuthProvider from 'context/auth/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <SoftUIControllerProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SoftUIControllerProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
