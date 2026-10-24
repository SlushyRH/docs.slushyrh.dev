import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';

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
        <Toaster 
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: '!bg-bg !text-text border !border-border shadow-lg',       
              title: '!text-text font-semibold',         
              description: '!text-text/70',        
              actionButton: '!bg-primary !text-primary-text hover:opacity-90',         
              cancelButton: '!bg-secondary !text-secondary-text hover:opacity-90',         
              error: '!bg-destructive !text-white !border-destructive', 
              success: '!bg-accent !text-white !border-accent', 
            }
          }}
        />
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
)