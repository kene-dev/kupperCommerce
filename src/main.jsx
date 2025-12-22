import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";
import { ScrollToTop } from './hooks/ScrollToTop';
import './locales/i18n';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';
import { ToastContainer } from 'react-toastify';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ScrollToTop />
            <ToastContainer  position='top-right'/>
            <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
