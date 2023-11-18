import React, {FunctionComponent, useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import appStyles from './app.module.css';

import {WarshipsInfoContainer} from '../warships-info-container/warships-info-container';
import {Slider} from '../slider/slider';

import mainStore from '../../stores';
import warshipsDataStore from '../../stores/warships-data-store';
import {SliderItemStore} from '../../stores/slider-item-store';
// import sliderStore from '../../stores/slider-store';

const App: FunctionComponent = observer(() => {
  useEffect(() => {
    warshipsDataStore.loadFromServer();
  }, [])

  useEffect(() => {
    setSliderItemStore();
    setDefaultActiveItem();
  }, [warshipsDataStore.wships])

  useEffect(() => {
    if (!mainStore.sliderStore?.currentActiveItem && mainStore.sliderItemStores) {
      mainStore.sliderStore.setActiveItem(mainStore.sliderItemStores[1])
    }
  }, [mainStore.sliderItemStores])

  // useEffect(() => {
  //   if (!sliderStore.currentActiveItem) {
  //     sliderStore.setActiveItem(mainStore.sliderItemStores[0])
  //   }
  // }, [mainStore.sliderItemStores.length])

  // TODO: убрать wships, заменить на список всех кораблей
  const setSliderItemStore = () => {
    // 1. Добавляем каждому warship-у, полученному с сервера, состояние isActive
    const sliderItemStore = warshipsDataStore.wships.map(item => new SliderItemStore(item));
    // 2. Инициализируем массив с хранилищами SliderItemStore и сохраняем в основном сторе (mainStore)
    mainStore.initializeSliderItemStores(sliderItemStore);
  }

  const setDefaultActiveItem = () => {
    if (!mainStore.sliderStore.currentActiveItem) {
      mainStore.sliderStore.setActiveItem(mainStore.sliderItemStores[0])
    }
  }

  return (
    <div className={appStyles.wrap}>
      <header className={appStyles.header}>
        <h1 className={appStyles.header__text}>Warships</h1>
      </header>
      <span className={appStyles.header__decor}/>
      <main>
        <WarshipsInfoContainer activeElement={mainStore.sliderStore.currentActiveItem}/>
        <Slider sliderItemStores={mainStore.sliderItemStores}/>
      </main>
    </div>
  )
})

export default App;