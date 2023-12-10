import React, {FunctionComponent} from 'react';

import fullWarshipsListStyles from './full-warships-list.module.css';

import {SliderItem} from '../slider-item/slider-item';

import {SliderItemStore} from '../../stores/slider-item-store';
import {observer} from 'mobx-react-lite';

const FullWarshipsList: FunctionComponent<{ items: SliderItemStore[] }> = observer((props) => {
  return (
    <div className={fullWarshipsListStyles['list-container']}>
      {
        props.items.length > 0
          ? <ul className={fullWarshipsListStyles.list}>
            {
              props.items &&
              props.items.map((item, index) => (
                <li key={item?.warship.id} className={fullWarshipsListStyles['list-item']}>
                  <SliderItem
                    sliderItemStore={item}
                    isShowMoreButton={index === props.items.length - 1}
                    // index={index}
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

export default FullWarshipsList