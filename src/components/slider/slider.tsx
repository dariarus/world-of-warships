import React, {FunctionComponent} from 'react';

import sliderStyles from './slider.module.css';

import {SliderItem} from '../slider-item/slider-item';

export const Slider: FunctionComponent = () => {
  return (
    <div className={sliderStyles.slider}>
      <SliderItem/>
    </div>
  )
}