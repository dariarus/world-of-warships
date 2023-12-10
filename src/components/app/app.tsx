import React, {FunctionComponent, lazy, Suspense, useCallback, useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import appStyles from './app.module.css';

import mainStore from '../../stores';
import {SliderItemStore} from '../../stores/slider-item-store';

import {WarshipsInfoContainer} from '../warships-info-container/warships-info-container';
import {Sidebar} from '../sidebar/sidebar';
const Slider = lazy(() => import('../slider/slider'));
const FullWarshipsList = lazy(() => import('../full-warships-list/full-warships-list'));

import {getWarshipsToShow} from '../../utils/functions';

import {SliderItemActivator} from '../../types/data';

const App: FunctionComponent = observer(() => {
  const loading = () => {
    return <div>Loading...</div>
  }

  useEffect(() => {
    mainStore.warshipsDataStore.loadWarships();
  }, [])

  useEffect(() => {
    mainStore.filtersFieldsDataStore.setLevels(mainStore.warshipsDataStore.warships);
    mainStore.filtersFieldsDataStore.setNations(mainStore.warshipsDataStore.warships);
    mainStore.filtersFieldsDataStore.setTypes(mainStore.warshipsDataStore.warships);
    setSliderItemStore();
  }, [mainStore.warshipsDataStore.warships])

  useEffect(() => {
    mainStore.filtersDataStore.setFilteredData(mainStore.sliderItemStores);
  }, [mainStore.sliderItemStores])

  useEffect(() => {
    setDefaultActiveItem();
  }, [mainStore.filtersDataStore.filteredWarships])

  const setSliderItemStore = () => {
    // 1. Добавляем каждому warship-у, полученному с сервера, состояние isActive
    const sliderItemStore = mainStore.warshipsDataStore.warships.map(item => new SliderItemStore(item));
    // 2. Инициализируем массив с хранилищами SliderItemStore и сохраняем в основном сторе (mainStore)
    mainStore.initializeSliderItemStores(sliderItemStore);
  }

  const setDefaultActiveItem = () => {
    if (mainStore.sliderItemStores && mainStore.sliderItemStores.length > 0) {
      mainStore.sliderStore.setActiveItem(mainStore.sliderItemStores[0], SliderItemActivator.INITIAL)
    }
  }

  const setWarshipsToShow = useCallback((activator: SliderItemActivator) => {
    if (activator === SliderItemActivator.SLIDER) {
      return getWarshipsToShow(mainStore.filtersDataStore.filteredWarships, mainStore.sliderStore.visibleSliderItems);
    } else {
      return getWarshipsToShow(mainStore.filtersDataStore.filteredWarships, mainStore.fullWarshipsListStore.visibleFullListItems);
    }
  }, [mainStore.filtersDataStore.filteredWarships, mainStore.sliderStore.visibleSliderItems, mainStore.fullWarshipsListStore.visibleFullListItems])

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
            <Suspense fallback={loading()}>
              {
                mainStore.fullWarshipsListStore.listIsOpen
                  ? <FullWarshipsList items={setWarshipsToShow(SliderItemActivator.FULL_LIST)}/>
                  : <Slider filteredItems={setWarshipsToShow(SliderItemActivator.SLIDER)}/>
              }
            </Suspense>
          </Sidebar>
        </section>
      </main>
    </div>
  )
})

export default App;