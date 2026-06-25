import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LayoutProvider } from './context/LayoutContext.tsx'
import { ViewerProvider } from './context/ViewerContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LayoutProvider>
      <ViewerProvider>
        <App />
      </ViewerProvider>
    </LayoutProvider>
  </React.StrictMode>,
)