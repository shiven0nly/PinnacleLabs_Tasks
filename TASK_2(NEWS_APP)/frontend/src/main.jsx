import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store';
import { client } from './lib/appwrite/appwrite';

// Verify Appwrite connection on app load
client.ping().then(
  () => console.log('✅ Appwrite connection successful'),
  (error) => console.error('❌ Appwrite connection failed:', error)
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
);
