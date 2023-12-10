import React, {FunctionComponent, lazy, Suspense, useCallback, useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import appStyles from './app.module.css';

import {WarshipsInfoContainer} from '../warships-info-container/warships-info-container';
import mainStore from '../../stores';
import warshipsDataStore from '../../stores/warships-data-store';
import {SliderItemStore} from '../../stores/slider-item-store';
import {Sidebar} from '../sidebar/sidebar';
import {SliderItemActivator} from '../../types/data';
import {getWarshipsToShow} from '../../utils/functions';

const Slider = lazy(() => import('../slider/slider'));
const FullWarshipsList = lazy(() => import('../full-warships-list/full-warships-list'));
// import FullWarshipsList from '../full-warships-list/full-warships-list';
// import Slider from '../slider/slider';

const App: FunctionComponent = observer(() => {
  const loading = () => {
    return <div>Loading...</div>
  }

  console.log(loading())


  useEffect(() => {
    warshipsDataStore.loadWarships();
  }, [])

  useEffect(() => {
    mainStore.filtersFieldsDataStore.setLevels(warshipsDataStore.warships);
    mainStore.filtersFieldsDataStore.setNations(warshipsDataStore.warships);
    mainStore.filtersFieldsDataStore.setTypes(warshipsDataStore.warships);
    setSliderItemStore();
  }, [warshipsDataStore.warships])

  useEffect(() => {
    mainStore.filtersDataStore.setFilteredData(mainStore.sliderItemStores);
  }, [mainStore.sliderItemStores])

  useEffect(() => {
    setDefaultActiveItem();
  }, [mainStore.filtersDataStore.filteredWarships])

// Для деплоя удалить node_modules и package-lock и установить их через Ubuntu. Потом деплоить.
// Для работы сделать то же самое и установить все в ВебСторме.

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