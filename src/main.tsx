import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { DocViewerPage } from './pages/doc-viewer';
import { NotFoundPage } from './pages/404';
import { HelmetProvider } from 'react-helmet-async';

const RootLayout = () => (
  <>
    <Outlet />
  </>
);

const root = createRoot(document.getElementById('root')!);
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/:project/*', element: <DocViewerPage /> },
      { path: '*', element: <NotFoundPage /> },
    ]
  }
]);

root.render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
)