import React, {FunctionComponent, useState} from 'react';

import sliderStyles from './slider.module.css';

import {SliderItem} from '../slider-item/slider-item';

import {TWarship} from '../../types/data';

export const Slider: FunctionComponent<{ warships: TWarship[] }> = (props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const setNewIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex > props.warships.length) {
      newIndex = props.warships.length - 1;
    }

    setActiveIndex(newIndex);
  }

  return (
    <div className={sliderStyles['slider-container']}>
      <button
        className={`${sliderStyles.button} ${sliderStyles.button_left}`}
        onClick={() => {
          setNewIndex(activeIndex - 1)
        }}
      />
      <div className={sliderStyles['slider-outer-window']}>
        <div
          className={sliderStyles['slider-inner-window']}
          style={{transform: `translateX(-${activeIndex * 31.4}%)`}}
        >
          {
            props.warships.map(item => (
              <SliderItem key={item.id} warship={item}/>
            ))
          }
        </div>
      </div>
      <button
        className={`${sliderStyles.button} ${sliderStyles.button_right}`}
        onClick={() => {
          setNewIndex(activeIndex + 1)
        }}
      />
    </div>
  )
}