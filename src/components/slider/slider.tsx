import React, {FunctionComponent} from 'react';

import sliderStyles from './slider.module.css';

import {SliderItem} from '../slider-item/slider-item';

import {TWarship} from '../../types/data';

export const Slider: FunctionComponent<{ warships: TWarship[] }> = (props) => {
  return (
    <div className={sliderStyles.slider}>
      {
        props.warships.map(item => (
          <SliderItem key={item.id} warship={item}/>
        ))
      }
    </div>
  )
}