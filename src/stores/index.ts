import {makeAutoObservable} from 'mobx';

import warshipsDataStore, {WarshipsDataStore} from './warships-data-store';
import {SliderItemStore} from './slider-item-store';
import {SliderStore} from './slider-store';

export class MainStore {
  warshipsDataStore: WarshipsDataStore;
  sliderStore: SliderStore;
  sliderItemStores: SliderItemStore[]

  constructor() {
    // Инициализация дочерних хранилищ
    this.warshipsDataStore = warshipsDataStore;
    this.sliderStore = new SliderStore();
    this.sliderItemStores = [];
    makeAutoObservable(this)
  }

  /* Метод для создания хранилища окошек слайдера. Нужен, чтобы инициализировать это хранилище из компонента React, т.к.
   для этого нужны уже загруженные warships, которым добавлено состояние isActive (см метод updateSliderItemStore в app.tsx) */
  initializeSliderItemStores(sliderItems: SliderItemStore[]) {
    this.sliderItemStores = sliderItems
  }
}

const mainStore = new MainStore();
export default mainStore;