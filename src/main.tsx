import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'mobx-react';

import './style.css';
import './fonts/fonts.css';

import App from './components/app/app';

import mainStore from './stores';
import warshipsDataStore from './stores/warships-data-store';

const stores = {
  mainStore,
  warshipsDataStore,
  sliderStore: mainStore.sliderStore,
  sliderItemStore: mainStore.sliderItemStores,
  filtersDataStore: mainStore.filtersFieldsDataStore,
  filtersFieldsDataStore: mainStore.filtersFieldsDataStore,
  fullWarshipsListStore: mainStore.fullWarshipsListStore,
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
