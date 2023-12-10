import React, {FunctionComponent, useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import sliderStyles from './slider.module.css';

import {SliderItem} from '../slider-item/slider-item';

import {fullWindowWidth, moreVisibleItemsInSlider, widthOfOneElement} from '../../utils/constants';

import mainStore from '../../stores';
import {SliderItemStore} from '../../stores/slider-item-store';

import {SliderItemActivator} from '../../types/data';

const Slider: FunctionComponent<{ filteredItems: SliderItemStore[] }> = observer((props) => {
  // Значения сдвигов
  const translateWidth = widthOfOneElement * 2;
  const translateWidthInPercents = translateWidth * 100 / fullWindowWidth;
  // Доля длины одного элемента в длине сдвига. Нужно для прокрутки слайдера на активный элемент
  const shareOfOneElementInTranslateWidth = widthOfOneElement / translateWidth
  // Общая длина входящего массива в px
  const fullWidth = props.filteredItems.length * widthOfOneElement;
  // Сдвиг в процентах относительно общей длины
  // 1. Общая длина в процентах от длины окна (окно видимости 1400px берем за 100%, значит, общая будет 314,3% для 20 элементов)
  const fullWidthInPercentsRelativelyWindowWidth = fullWidth * 100 / fullWindowWidth;
  // 2. Сдвиг в процентах относительно общей длины
  // (если translateWidthInPercents = 31,4% от длины видимого окна, то 31,4% будут эквиваленты 10% от общей fullWidth для 20 элементов
  const translateInPercentsRelativelyFullWidth = fullWidthInPercentsRelativelyWindowWidth / translateWidthInPercents;
  // Сдвиг в пикселях относительно общей длины
  const translateRelativelyFullWidth = fullWidth * translateInPercentsRelativelyFullWidth / 100;

  // Длина элементов массива в px, которая остается за областью видимости при загрузке страницы и далее после каждого смещения
  const initialRestWidth = fullWidth - fullWindowWidth;
  let restWidthOutOfViewArea = fullWidth - fullWindowWidth;

  // Устанавливаем количество смещений, т.е. "страницу" по счету, которая отображается в области видимости в данный момент
  // (это по 6 полных элементов, плюс половинка следующего). Сдвигаемся по клику на длину двух полных элементов
  /* (mainStore.sliderStore.activeIndex = 0 - отображаются от 0 до 6 и еще половинка 7-го.
  mainStore.sliderStore.activeIndex = 1 - отображаются от 2 до 7 и еще половинка 8-го.
  Отображаемый интервал элементов зависит от установленного сдвига */
  // Максимальное количество сдвигов для рассчитанной длины всех элементов входящего массива
  const maxIndex = (fullWidth - fullWindowWidth) / translateWidth;

  // Установка изначально остающейся за областью видимости длины после загрузки массива кораблей
  useEffect(() => {
    mainStore.sliderStore.setRestWidth(initialRestWidth)
  }, [props.filteredItems])

  /* Настройка сдвига при обычных условиях и последний раз, когда нельзя сдвинуться на заданное значение translateWidthInPercents
    (когда на сдвиг остается меньше места, чем указано в translateWidthInPercents) */
  useEffect(() => {
    if (mainStore.sliderStore.restWidth + translateRelativelyFullWidth < translateRelativelyFullWidth) {
      mainStore.sliderStore.setFullTranslate(maxIndex * translateWidthInPercents);
    } else {
      mainStore.sliderStore.setFullTranslate(mainStore.sliderStore.activeIndex * translateWidthInPercents)
    }
  }, [mainStore.sliderStore.activeIndex])

  // Устанавливаем активный элемент в область видимости слайдера, если он был выбран из плашки с полным списком
  useEffect(() => {
    if (mainStore.sliderStore.currentActiveItem?.sliderItemActivator === SliderItemActivator.FULL_LIST) {
      for (let itemIndex = 0; itemIndex < mainStore.filtersDataStore.filteredWarships.length; itemIndex++) {
        const currentWarship = mainStore.filtersDataStore.filteredWarships[itemIndex]
        if (currentWarship.warship === mainStore.sliderStore.currentActiveItem?.warship) {
          const translateIndexToActiveElement = itemIndex * shareOfOneElementInTranslateWidth;
          /* если выбранный элемент находится в конце массива и попадает в последнее окно видимости,
          то не нужно его прокручивать в начало, а просто показывать последнее окно ("страницу") */
          if (translateIndexToActiveElement >= maxIndex) {
            mainStore.sliderStore.setActiveIndex(maxIndex);
          } else {
            mainStore.sliderStore.setActiveIndex(translateIndexToActiveElement);
          }
          break;
        }
      }
    }
  }, [mainStore.sliderStore.currentActiveItem])

  // Установка индекса при клике вперед-назад
  const setNewIndex = (newIndex: number) => {
    if (newIndex > maxIndex) {
      newIndex = maxIndex;
    }
    if (newIndex < 0) {
      newIndex = 0;
    }
    mainStore.sliderStore.setActiveIndex(newIndex);
  }

  // Установка смещений по кликам на кнопки "вперед" и "назад"
  const setRestWidthInPxClickRight = () => {
    restWidthOutOfViewArea = mainStore.sliderStore.restWidth - (fullWidth * 10 / 100)
    if (restWidthOutOfViewArea <= 0) {
      mainStore.sliderStore.setRestWidth(0);
      return
    }
    mainStore.sliderStore.setRestWidth(restWidthOutOfViewArea);
  }

  const setRestWidthInPxClickLeft = () => {
    restWidthOutOfViewArea = mainStore.sliderStore.restWidth + (fullWidth * 10 / 100)
    if (restWidthOutOfViewArea >= initialRestWidth) {
      mainStore.sliderStore.setRestWidth(initialRestWidth);
      return
    }
    mainStore.sliderStore.setRestWidth(restWidthOutOfViewArea);
  }

  // Хэндлеры по кликам на кнопки "вперед" и "назад"
  const handleOnClickRight = () => {
    mainStore.sliderStore.setVisibleSliderItems(moreVisibleItemsInSlider);
    setNewIndex(mainStore.sliderStore.activeIndex + 1);
    setRestWidthInPxClickRight();
  }

  const handleOnClickLeft = () => {
    setNewIndex(mainStore.sliderStore.activeIndex - 1);
    setRestWidthInPxClickLeft();
  }

  return (
    <div className={sliderStyles['slider-container']}>
      <button
        className={`${sliderStyles.button} ${sliderStyles.button_left}`}
        disabled={mainStore.sliderStore.activeIndex === 0 || props.filteredItems.length < 1}
        onClick={handleOnClickLeft}
      />
      <div className={sliderStyles['slider-outer-window']}>
        <div
          className={sliderStyles['slider-inner-window']}
          style={{
            transform: `translateX(-${mainStore.sliderStore.fullTranslate}%)`
          }}
        >
          {
            props.filteredItems.length > 0
              ? props.filteredItems
                .map((item, index) => (
                  <SliderItem
                    key={item?.warship.id}
                    sliderItemStore={item}
                    index={index}
                  />
                ))
              : <p className={sliderStyles.text}>Nothing was found</p>
          }
        </div>
      </div>
      <button
        className={`${sliderStyles.button} ${sliderStyles.button_right}`}
        disabled={mainStore.sliderStore.activeIndex === maxIndex || props.filteredItems.length < 1 || props.filteredItems.length < 6}
        onClick={handleOnClickRight}
      />
    </div>
  )
})

export default Slider