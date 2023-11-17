import React, {FunctionComponent, useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import appStyles from './app.module.css';

import {WarshipsInfoContainer} from '../warships-info-container/warships-info-container';
import {Slider} from '../slider/slider';

import mainStore from '../../stores';
import warshipsDataStore from '../../stores/warships-data-store';
import {SliderItemStore} from '../../stores/slider-item-store';

const App: FunctionComponent = observer(() => {
  useEffect(() => {
    warshipsDataStore.loadFromServer();
  }, [])

  useEffect(() => {
    updateSliderItemStore();
  }, [warshipsDataStore.wships])

  const updateSliderItemStore = () => {
    // 1. Добавляем каждому warship-у, полученному с сервера, состояние isActive
    const sliderItemStore = warshipsDataStore.wships.map(item => new SliderItemStore(item));
    // 2. Инициализируем массив с хранилищами SliderItemStore и сохраняем в основном сторе (mainStore)
    mainStore.setSliderItemStores(sliderItemStore);
  }

  return (
    <div className={appStyles.wrap}>
      <header className={appStyles.header}>
        <h1 className={appStyles.header__text}>Warships</h1>
      </header>
      <span className={appStyles.header__decor}/>
      <main>
        <WarshipsInfoContainer warships={warshipsDataStore.warships}/>
        <Slider sliderItemStores={mainStore.sliderItemStores}/>
      </main>
    </div>
  )
})

export default App;