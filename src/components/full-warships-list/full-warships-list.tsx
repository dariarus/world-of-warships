import React, {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';

import fullWarshipsListStyles from './full-warships-list.module.css';

import {SliderItem} from '../slider-item/slider-item';

import mainStore from '../../stores';
import {SliderItemStore} from '../../stores/slider-item-store';

import {moreVisibleItems} from '../../utils/constants';

const FullWarshipsList: FunctionComponent<{ items: SliderItemStore[] }> = observer((props) => {
  const handleOnShowMoreItems = () => {
    mainStore.filtersDataStore.setVisibleItems(moreVisibleItems);
  }

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
                    // index={index}
                  />
                </li>
              ))
            }
            {
              props.items.length !== mainStore.filtersDataStore.filteredWarships.length &&
              <button
                className={fullWarshipsListStyles['show-more-button']}
                onClick={handleOnShowMoreItems}
              >
                Show more
              </button>
            }
          </ul>
          : <p className={fullWarshipsListStyles.text}>Nothing was found</p>
      }
    </div>
  )
})

export default FullWarshipsList