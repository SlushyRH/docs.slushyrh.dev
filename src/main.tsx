import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { DocViewerPage } from '@/pages/doc-viewer';
import { NotFoundPage } from '@/pages/404';
import { ThemeProvider } from '@/components/providers/theme-provider';

import './main.css';

const root = createRoot(document.getElementById('root')!);
const router = createBrowserRouter([
  {
    children: [
      { path: '/:projectId/*', element: <DocViewerPage /> },
      { path: '*', element: <NotFoundPage /> },
    ]
  }
]);

root.render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
)