import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ActivityCategoryContextProvider} from './context/ActivityCategoryContext';
import { PreferenceTagContextProvider } from './context/PreferenceTagContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ActivityCategoryContextProvider>
      <PreferenceTagContextProvider>
      <App />
      </PreferenceTagContextProvider>
    </ActivityCategoryContextProvider>
  </React.StrictMode>
);

