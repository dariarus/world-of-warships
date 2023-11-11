import React, {FunctionComponent} from 'react';

import sliderItemStyles from './slider-item.module.css';

import {useSelector} from '../../types/hooks';

export const SliderItem: FunctionComponent = () => {
  const warshipsDataState = useSelector(state => state.warshipsDataState);

  return (
    warshipsDataState.warships[0] &&
    <div
      className={sliderItemStyles.item}
      style={{
        backgroundImage: `linear-gradient(rgba(36, 36, 36, .5), rgba(36, 36, 36, .5)), url(${(warshipsDataState.warships[0].nation.icons?.small || '')})`,
      }}
    >
      <div className={sliderItemStyles['item__type-level-container']}>
        <img
          src={warshipsDataState.warships[0].type.icons.default}
          alt="Warship's type icon"
          className={`${sliderItemStyles.image} ${sliderItemStyles['image_warship-type']}`}
        />
        <p className={sliderItemStyles.text}>{warshipsDataState.warships[0].level}</p>
      </div>
      <img
        src={warshipsDataState.warships[0].icons.medium}
        alt="Warship's image"
        className={`${sliderItemStyles.image} ${sliderItemStyles.image_warship}`}
      />
      <div className={sliderItemStyles['item__title-nation-container']}>
        <p className={sliderItemStyles.text}>{warshipsDataState.warships[0].nation.title}</p>
        <p className={`${sliderItemStyles.text} ${sliderItemStyles['text_upper-case']}`}>{warshipsDataState.warships[0].title}</p>
      </div>
    </div>
  )
}