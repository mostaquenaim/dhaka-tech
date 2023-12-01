import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Routes.jsx'
import AuthProvider from './contexts/Auth/AuthProvider.jsx'
import ThemeProvider from './contexts/Theme/ThemeProvider.jsx'
import RoleProvider from './contexts/Role/RoleProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RoleProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </RoleProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
