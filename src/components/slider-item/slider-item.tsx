import React, {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';

import sliderItemStyles from './slider-item.module.css';

import {SliderItemStore} from '../../stores/slider-item-store';

type TSliderItemProps = {
  sliderItemStore: SliderItemStore,
  // index: number,
  onClick: () => void
}

export const SliderItem: FunctionComponent<TSliderItemProps> = observer((props) => {
  return (
    props.sliderItemStore &&
    <button
      className={
        props.sliderItemStore.isActive
        ? `${sliderItemStyles.item} ${sliderItemStyles.item_active}`
        : `${sliderItemStyles.item}`}
      style={{
        backgroundImage: `linear-gradient(rgba(36, 36, 36, .5), rgba(36, 36, 36, .5)), url(${(props.sliderItemStore.warship.nation.icons?.small || '')})`
      }}
      onClick={props.onClick}
    >
      <div className={sliderItemStyles['item__type-level-container']}>
        <img
          src={props.sliderItemStore.warship.type.icons.default}
          alt="Warship's type icon"
          className={`${sliderItemStyles.image} ${sliderItemStyles['image_warship-type']}`}
        />
        <p className={sliderItemStyles.text}>{props.sliderItemStore.warship.level}</p>
      </div>
      <img
        src={props.sliderItemStore.warship.icons.medium}
        alt="Warship's image"
        className={`${sliderItemStyles.image} ${sliderItemStyles.image_warship}`}
      />
      <div className={sliderItemStyles['item__title-nation-container']}>
        {/*<p>{props.index}</p>*/}
        <p className={sliderItemStyles.text}>{props.sliderItemStore.warship.nation.title}</p>
        <p className={`${sliderItemStyles.text} ${sliderItemStyles['text_upper-case']}`}>{props.sliderItemStore.warship.title}</p>
      </div>
    </button>
  )
})