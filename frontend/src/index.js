import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ActivityCategoryContextProvider} from './Admin/context/ActivityCategoryContext';
import { PreferenceTagContextProvider } from './Admin/context/PreferenceTagContext';
import { AdminContextProvider } from './Admin/context/AdminContext';
import { GovernerContextProvider } from './Admin/context/GovernerContext';
import { ComplaintContextProvider } from './Admin/context/ComplaintContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ActivityCategoryContextProvider>
      <PreferenceTagContextProvider>
        <AdminContextProvider>
          <GovernerContextProvider>
            <ComplaintContextProvider>
              <App />
            </ComplaintContextProvider>
          </GovernerContextProvider>
        </AdminContextProvider>
      </PreferenceTagContextProvider>
    </ActivityCategoryContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

