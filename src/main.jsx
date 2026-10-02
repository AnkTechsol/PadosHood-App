import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './entry/AppRouter.jsx'
import './society.css'
import './entry/entry.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)

