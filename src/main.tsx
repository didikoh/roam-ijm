import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@scss/main.scss";
import App from './App.tsx'
import { AppProvider } from './context/AppContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
