import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { store } from './store.js'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
