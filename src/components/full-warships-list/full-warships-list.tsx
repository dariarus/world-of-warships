import React, {FunctionComponent} from 'react';

import fullWarshipsListStyles from './full-warships-list.module.css';

import {SliderItem} from '../slider-item/slider-item';

import {SliderItemStore} from '../../stores/slider-item-store';

export const FullWarshipsList: FunctionComponent<{ items: SliderItemStore[] }> = (props) => {
  return (
    <div className={fullWarshipsListStyles['list-container']}>
      {
        props.items.length > 0
          ? <ul className={fullWarshipsListStyles.list}>
            {
              props.items &&
              props.items.map((item) => (
                <li className={fullWarshipsListStyles['list-item']}>
                  <SliderItem
                    key={item?.warship.id}
                    sliderItemStore={item}
                    isActive={item.isActive}
                  />
                </li>
              ))
            }
          </ul>
          : <p className={fullWarshipsListStyles.text}>Nothing was found</p>
      }
    </div>
  )
}