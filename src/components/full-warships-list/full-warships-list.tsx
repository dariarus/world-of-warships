import React, {FunctionComponent} from 'react';

import fullWarshipsListStyles from './full-warships-list.module.css';

import {SliderItem} from '../slider-item/slider-item';

import {SliderItemStore} from '../../stores/slider-item-store';
import {observer} from 'mobx-react-lite';

export const FullWarshipsList: FunctionComponent<{ items: SliderItemStore[] }> = observer((props) => {
  return (
    <div className={fullWarshipsListStyles['list-container']}>
      {
        props.items.length > 0
          ? <ul className={fullWarshipsListStyles.list}>
            {
              props.items &&
              props.items.map((item) => (
                <li key={item?.warship.id} className={fullWarshipsListStyles['list-item']}>
                  <SliderItem
                    sliderItemStore={item}
                  />
                </li>
              ))
            }
          </ul>
          : <p className={fullWarshipsListStyles.text}>Nothing was found</p>
      }
    </div>
  )
})