import React, {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';

import sliderItemStyles from './slider-item.module.css';

import {SliderItemStore} from '../../stores/slider-item-store';
import mainStore from '../../stores';
import {SliderItemActivator} from '../../types/data';

export const SliderItem: FunctionComponent<{
  sliderItemStore: SliderItemStore,
  isActive: boolean,
  // index: number
}> = observer(({
                 sliderItemStore,
                 isActive,
                 // index
               }) => {
  return (
    sliderItemStore &&
    <button
      className={
        isActive
          ? `${sliderItemStyles.item} ${sliderItemStyles.item_active}`
          : `${sliderItemStyles.item}`}
      style={{
        backgroundImage: `linear-gradient(rgba(36, 36, 36, .5), rgba(36, 36, 36, .5)), url(${(sliderItemStore.warship.nation.icons?.small || '')})`
      }}
      onClick={() => {
        const activator = mainStore.fullWarshipsListStore.listIsOpen ? SliderItemActivator.FULL_LIST : SliderItemActivator.SLIDER
        mainStore.sliderStore.setActiveItem(sliderItemStore, activator);
        mainStore.fullWarshipsListStore.setListIsClose();
      }}
    >
      <div className={sliderItemStyles['item__type-level-container']}>
        <img
          src={sliderItemStore.warship.type.icons.default}
          alt="Warship's type icon"
          className={`${sliderItemStyles.image} ${sliderItemStyles['image_warship-type']}`}
        />
        <p className={sliderItemStyles.text}>{sliderItemStore.warship.level}</p>
      </div>
      <img
        src={sliderItemStore.warship.icons.medium}
        alt="Warship's image"
        className={`${sliderItemStyles.image} ${sliderItemStyles.image_warship}`}
      />
      <div className={sliderItemStyles['item__title-nation-container']}>
        {/*<p>{index}</p>*/}
        <p className={sliderItemStyles.text}>{sliderItemStore.warship.nation.title}</p>
        <p
          className={`${sliderItemStyles.text} ${sliderItemStyles['text_upper-case']}`}>{sliderItemStore.warship.title}</p>
      </div>
    </button>
  )
})