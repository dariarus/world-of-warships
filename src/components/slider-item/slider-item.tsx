import React, {FunctionComponent} from 'react';

import sliderItemStyles from './slider-item.module.css';
import {TWarship} from '../../types/data';

// import {useSelector} from '../../types/hooks';

export const SliderItem: FunctionComponent<{ warship: TWarship }> = (props) => {

  return (
    props.warship &&
    <div
      className={sliderItemStyles.item}
      style={{
        backgroundImage: `linear-gradient(rgba(36, 36, 36, .5), rgba(36, 36, 36, .5)), url(${(props.warship.nation.icons?.small || '')})`,
      }}
    >
      <div className={sliderItemStyles['item__type-level-container']}>
        <img
          src={props.warship.type.icons.default}
          alt="Warship's type icon"
          className={`${sliderItemStyles.image} ${sliderItemStyles['image_warship-type']}`}
        />
        <p className={sliderItemStyles.text}>{props.warship.level}</p>
      </div>
      <img
        src={props.warship.icons.medium}
        alt="Warship's image"
        className={`${sliderItemStyles.image} ${sliderItemStyles.image_warship}`}
      />
      <div className={sliderItemStyles['item__title-nation-container']}>
        <p className={
          props.warship.nation.title.length <= 10
            ? `${sliderItemStyles.text}`
            : `${sliderItemStyles.text} ${sliderItemStyles.text_small}`
        }>{props.warship.nation.title}</p>
        <p className={
          props.warship.title.length <= 7
            ? `${sliderItemStyles.text} ${sliderItemStyles['text_upper-case']}`
            : `${sliderItemStyles.text} ${sliderItemStyles.text_small} ${sliderItemStyles['text_upper-case']}`
        }>{props.warship.title}</p>
      </div>
    </div>
  )
}