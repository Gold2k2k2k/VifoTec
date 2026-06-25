import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LayoutProvider } from './context/LayoutContext.tsx'
import { ViewerProvider } from './context/ViewerContext.tsx'
import { ChatProvider } from './context/ChatContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import './i18n'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <LayoutProvider>
        <ViewerProvider>
          <ChatProvider>
            <App />
          </ChatProvider>
        </ViewerProvider>
      </LayoutProvider>
    </ThemeProvider>
  </React.StrictMode>,
)