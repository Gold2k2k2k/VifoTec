import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LayoutProvider } from './context/LayoutContext.tsx'
import { ViewerProvider } from './context/ViewerContext.tsx'
import { ChatProvider } from './context/ChatContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LayoutProvider>
      <ViewerProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ViewerProvider>
    </LayoutProvider>
  </React.StrictMode>,
)