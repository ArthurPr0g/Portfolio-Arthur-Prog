import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LangProvider } from './i18n.jsx'

// Aproveita o HTML pré-renderizado (scripts/prerender.mjs) em vez de redesenhar a página.
hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)
