import React, {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';

import infoStyles from './warships-info-container.module.css'

import {SliderItemStore} from '../../stores/slider-item-store';

export const WarshipsInfoContainer: FunctionComponent<{ activeElement: SliderItemStore | null }> = observer(({activeElement}) => {
  // const currentActiveElement = activeElement ? activeElement : mainStore.sliderItemStores[0]

  return (
    activeElement &&
      <section className={infoStyles.content}>
        <div
          className={infoStyles['image-wrap']}
          style={{
            backgroundImage: `url(${(activeElement.warship.nation.icons?.large || '')})`,
          }}>
          <img
            src={activeElement.warship.icons?.large}
            alt="Warship image"
            className={`${infoStyles.image} ${infoStyles.image_warship}`}/>
        </div>
        <div className={infoStyles['info-wrap']}>
          <div className={infoStyles['info-container']}>
            <h2 className={`${infoStyles.text} ${infoStyles.text_header}`}>{activeElement.warship.title}</h2>
            <p className={`${infoStyles.text} ${infoStyles.text_heading}`}>{activeElement.warship.nation.title}</p>
          </div>
          <div className={infoStyles['info-container']}>
            <img src={activeElement.warship.type.icons.default} alt="Warship's type image"/>
            <p className={`${infoStyles.text} ${infoStyles.text_paragraph}`}>{activeElement.warship.type.title},</p>
            <p className={`${infoStyles.text} ${infoStyles.text_paragraph}`}>level {activeElement.warship.level}</p>
          </div>
          <p className={`${infoStyles.text} ${infoStyles.text_paragraph}`}>{activeElement.warship.description}</p>
        </div>
      </section>
  )
})