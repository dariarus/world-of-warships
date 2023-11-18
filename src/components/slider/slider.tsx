import React, {FunctionComponent, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';

import sliderStyles from './slider.module.css';

import {SliderItem} from '../slider-item/slider-item';

import {fullWindowWidth, widthOfOneElement} from '../../utils/constants';
import {SliderItemStore} from '../../stores/slider-item-store';
// import sliderStore from '../../stores/slider-store';

export const Slider: FunctionComponent<{ sliderItemStores: SliderItemStore[] }> = observer((props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [restWidth, setRestWidth] = useState<number>(0);
  const [fullTranslate, setFullTranslate] = useState<number>(0);

  // Значения сдвигов
  const translateWidth = widthOfOneElement * 2;
  const translateWidthInPercents = translateWidth * 100 / fullWindowWidth;
  // Общая длина входящего массива в px
  const fullWidth = props.sliderItemStores.length * widthOfOneElement;
  // Сдвиг в процентах относительно общей длины
  // 1. Общая длина в процентах от длины окна (окно видимости 1400px берем за 100%, значит, общая будет 314,3% для 20 элементов)
  const fullWidthInPercentsRelativelyWindowWidth = fullWidth * 100 / fullWindowWidth;
  // 2. Сдвиг в процентах относительно общей длины
  // (если translateWidthInPercents = 31,4% от длины видимого окна, то 31,4% будут эквиваленты 10% от общей fullWidth
  const translateInPercentsRelativelyFullWidth = fullWidthInPercentsRelativelyWindowWidth / translateWidthInPercents;
  // Сдвиг в пикселях относительно общей длины
  const translateRelativelyFullWidth = fullWidth * translateInPercentsRelativelyFullWidth / 100;

  // Длина элементов массива в px, которая остается за областью видимости при загрузке страницы и далее после каждого смещения
  const initialRestWidth = fullWidth - fullWindowWidth;
  let restWidthOutOfViewArea = fullWidth - fullWindowWidth;

  // Устанавливаем количество смещений, т.е. "страницу" по счету, которая отображается в области видимости в данный момент
  // (это по 6 полных элементов, плюс половинка следующего). Сдвигаемся по клику на длину двух полных элементов
  /* (activeIndex = 0 - отображаются от 0 до 6 и еще половинка 7го.
  activeIndex = 1 - отображаются от 2 до 7 и еще половинка 8го.
  Отображение зависит от сдвига */
  // Максимальное количество сдвигов для рассчитанной длины всех элементов входящего массива
  const maxIndex = (fullWidth - fullWindowWidth) / translateWidth;

  // Установка изначально остающейся за областью видимости длины после загрузки массива кораблей
  useEffect(() => {
    setRestWidth(initialRestWidth)
  }, [props.sliderItemStores])

  // Настройка сдвига при обычных условиях и последний раз, когда нельзя сдвинуться на заданное значение translateWidthInPercents
  // (когда на сдвиг остается меньше места, чем указано в translateWidthInPercents)
  useEffect(() => {
    if (restWidth + translateRelativelyFullWidth < translateRelativelyFullWidth) {
      setFullTranslate(maxIndex * translateWidthInPercents);
    } else {
      setFullTranslate(activeIndex * translateWidthInPercents)
    }
  }, [activeIndex])

  // Установка индекса при клике вперед-назад
  const setNewIndex = (newIndex: number) => {
    if (newIndex > maxIndex) {
      newIndex = maxIndex;
    }
    if (newIndex < 0) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  }

  const setRestWidthInPxClickRight = () => {
    restWidthOutOfViewArea = restWidth - (fullWidth * 10 / 100)
    if (restWidthOutOfViewArea <= 0) {
      setRestWidth(0);
      return
    }
    setRestWidth(restWidthOutOfViewArea);
  }

  const setRestWidthInPxClickLeft = () => {
    restWidthOutOfViewArea = restWidth + (fullWidth * 10 / 100)
    if (restWidthOutOfViewArea >= initialRestWidth) {
      setRestWidth(initialRestWidth);
      return
    }
    setRestWidth(restWidthOutOfViewArea);
  }

  return (
    <div className={sliderStyles['slider-container']}>
      <button
        className={`${sliderStyles.button} ${sliderStyles.button_left}`}
        disabled={activeIndex === 0}
        onClick={() => {
          setNewIndex(activeIndex - 1);
          setRestWidthInPxClickLeft();
        }}
      />
      <div className={sliderStyles['slider-outer-window']}>
        <div
          className={sliderStyles['slider-inner-window']}
          style={{
            transform: `translateX(-${fullTranslate}%)`
          }}
        >
          {
            props.sliderItemStores
              .map((item) => (
                <SliderItem
                  key={item?.warship.id}
                  sliderItemStore={item}
                  // index={index}
               />
              ))
          }
        </div>
      </div>
      <button
        className={`${sliderStyles.button} ${sliderStyles.button_right}`}
        disabled={activeIndex === maxIndex}
        onClick={() => {
          setNewIndex(activeIndex + 1);
          setRestWidthInPxClickRight();
        }}
      />
    </div>
  )
})