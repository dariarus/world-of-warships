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
// import sliderStore from '../../stores/slider-store';

const App: FunctionComponent = observer(() => {
  useEffect(() => {
    warshipsDataStore.loadFromServer();
  }, [])

  useEffect(() => {
    // const initialObjects = toJS(warshipsDataStore.warships)
    mainStore.filtersFieldsDataStore.setLevels(warshipsDataStore.warships);
    mainStore.filtersFieldsDataStore.setNations(warshipsDataStore.warships);
    mainStore.filtersFieldsDataStore.setTypes(warshipsDataStore.warships);
  }, [warshipsDataStore.warships])

  useEffect(() => {
    setDefaultActiveItem();
    mainStore.filtersDataStore.setFilteredData(warshipsDataStore.wships);
  }, [warshipsDataStore.wships])

  useEffect(() => {
    setSliderItemStore();
  }, [mainStore.filtersDataStore.filteredWarships])

  useEffect(() => {
    if (!mainStore.sliderStore?.currentActiveItem && mainStore.sliderItemStores) {
      mainStore.sliderStore.setActiveItem(mainStore.sliderItemStores[0])
    }
  }, [mainStore.sliderItemStores])

  // TODO: убрать wships, заменить на список всех кораблей
  // TODO: решить проблему с рамкой вокруг первого элемента: не показывается при загрузке страницы
  // TODO: решить проблему с прокруткой слайдера при фильтрации: если нажать стрелку прокрутки вправо несколько раз, то потом после применения фильтров результаты останутся на том де месте, то есть, если элементов мало, они останутся за областью видимости слева. Как сделать так, чтобы отфильтрованные элементы всегда откручивались в самое начало? restWidth в слайдере обнулять?
  const setSliderItemStore = () => {
    // 1. Добавляем каждому warship-у, полученному с сервера, состояние isActive
    const sliderItemStore = mainStore.filtersDataStore.filteredWarships.map(item => new SliderItemStore(item));
    // if (sliderItemStore && sliderItemStore.length > 0) {
    //   sliderItemStore[0].setIsActive(true)
    // }
    // console.log(mainStore.filtersFieldsStore.filteredWarships)

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
      <span className={appStyles['header-decor']}/>
      <main>
        <WarshipsInfoContainer activeElement={mainStore.sliderStore.currentActiveItem}/>
        <section className={appStyles['warships-list']}>
          <Sidebar
            sidebarIsOpen={mainStore.fullWarshipsListStore.listIsOpen}
          >
            {
              mainStore.fullWarshipsListStore.listIsOpen
                ? <FullWarshipsList items={mainStore.sliderItemStores}/>
                : <Slider sliderItemStores={mainStore.sliderItemStores}/>
            }
          </Sidebar>
        </section>
      </main>
    </div>
  )
})

export default App;