import React, {FunctionComponent, useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import appStyles from './app.module.css';

import {WarshipsInfoContainer} from '../warships-info-container/warships-info-container';
import {Slider} from '../slider/slider';

import mainStore from '../../stores';
import warshipsDataStore from '../../stores/warships-data-store';
import {SliderItemStore} from '../../stores/slider-item-store';
import {Sidebar} from '../sidebar/sidebar';
import {FullWarshipsList} from '../full-warships-list/full-warships-list';
import {SliderItemActivator} from '../../types/data';

const App: FunctionComponent = observer(() => {
  useEffect(() => {
    // warshipsDataStore.loadFromServer();
    // warshipsDataStore.loadLocal();
    warshipsDataStore.loadWarships();
  }, [])

  useEffect(() => {
    mainStore.filtersFieldsDataStore.setLevels(warshipsDataStore.warships);
    mainStore.filtersFieldsDataStore.setNations(warshipsDataStore.warships);
    mainStore.filtersFieldsDataStore.setTypes(warshipsDataStore.warships);
    setSliderItemStore();
  }, [warshipsDataStore.warships])

  // useEffect(() => {
  //   setSliderItemStore();
  // }, [warshipsDataStore.wships])

  useEffect(() => {
    mainStore.filtersDataStore.setFilteredData(mainStore.sliderItemStores);
  }, [mainStore.sliderItemStores])

  useEffect(() => {
    setDefaultActiveItem();
  }, [mainStore.filtersDataStore.filteredWarships])

  // TODO: убрать wships, заменить на список всех кораблей
  const setSliderItemStore = () => {
    // 1. Добавляем каждому warship-у, полученному с сервера, состояние isActive
    const sliderItemStore = warshipsDataStore.warships.map(item => new SliderItemStore(item));
    // 2. Инициализируем массив с хранилищами SliderItemStore и сохраняем в основном сторе (mainStore)
    mainStore.initializeSliderItemStores(sliderItemStore);
  }

  const setDefaultActiveItem = () => {
    if (mainStore.sliderItemStores && mainStore.sliderItemStores.length > 0) {
      mainStore.sliderStore.setActiveItem(mainStore.sliderItemStores[0], SliderItemActivator.INITIAL)
    }
  }

  return (
    <div className={appStyles.wrap}>
      <header className={appStyles.header}>
        <h1 className={appStyles.header__text}>Warships</h1>
      </header>
      <span className={appStyles['header-decor']}/>
      <main>
        <WarshipsInfoContainer activeElement={mainStore.sliderStore.currentActiveItem}/>
        <section className={appStyles['warships-list']}>
          <Sidebar
            sidebarIsOpen={mainStore.fullWarshipsListStore.listIsOpen}
          >
            {
              mainStore.fullWarshipsListStore.listIsOpen
                ? <FullWarshipsList items={mainStore.filtersDataStore.filteredWarships}/>
                : <Slider filteredItems={mainStore.filtersDataStore.filteredWarships}/>
            }
          </Sidebar>
        </section>
      </main>
    </div>
  )
})

export default App;