import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from './components/ui/sonner'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
// import { BrowserRouter as Router } from 'react-router-dom';

const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Router> */}
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>

            <App />
      </PersistGate>

    </Provider>
    <Toaster/>

    {/* </Router> */}
  </StrictMode>,
)
