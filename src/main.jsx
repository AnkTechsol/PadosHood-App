import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './core/App.jsx'
import './core/index.css'
import { AppProvider } from './shared/context/AppContext.jsx'
import { SocietyProvider } from './context/SocietyContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <SocietyProvider>
        <App />
      </SocietyProvider>
    </AppProvider>
  </React.StrictMode>,
)

