import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient({})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </CssVarsProvider>
  </React.StrictMode>
)
