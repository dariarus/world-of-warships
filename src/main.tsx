import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import './style.css'

import {store} from './services/store';

import App from './components/app/app';

const app = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);
app.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
