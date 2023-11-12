import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'mobx-react';
//
import mainStore from '../src/stores/index';

import './style.css'

// import * as mainStore from './services/store';

import App from './components/app/app';
import warshipsStore from './stores/warships-store';

const stores = {
  // mainStore,
  warshipsStore
};

const app = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);
app.render(
  <React.StrictMode>
    <Provider {...stores}>
      <App/>
    </Provider>
  </React.StrictMode>
);
