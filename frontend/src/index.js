import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ActivityCategoryContextProvider} from './context/ActivityCategoryContext';
import { PreferenceTagContextProvider } from './context/PreferenceTagContext';
import { AdminContextProvider } from './context/AdminContext';
import { GovernerContextProvider } from './context/GovernerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ActivityCategoryContextProvider>
      <PreferenceTagContextProvider>
        <AdminContextProvider>
          <GovernerContextProvider>
              <App />
          </GovernerContextProvider>
        </AdminContextProvider>
      </PreferenceTagContextProvider>
    </ActivityCategoryContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

