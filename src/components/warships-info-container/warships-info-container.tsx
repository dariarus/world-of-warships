import React, {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';

import infoStyles from './warships-info-container.module.css'

import {TWarship} from '../../types/data';
export const WarshipsInfoContainer: FunctionComponent<{warships: TWarship[]}> = observer(({warships}) => {

  console.log(warships[0])

  return (
    warships[0] &&
    <section className={infoStyles.content}>
      <div
        className={infoStyles['image-wrap']}
        style={{
          backgroundImage: `url(${(warships[0].nation.icons?.large || '')})`,
        }}>
        <img
          src={warships[0].icons?.large}
          alt="Warship image"
          className={`${infoStyles.image} ${infoStyles.image_warship}`} />
      </div>
      <div className={infoStyles['info-wrap']}>
        <div className={infoStyles['info-container']}>
          <h2 className={`${infoStyles.text} ${infoStyles.text_header}`}>{warships[0].title}</h2>
          <p className={`${infoStyles.text} ${infoStyles.text_heading}`}>{warships[0].nation.title}</p>
        </div>
        <div className={infoStyles['info-container']}>
          <img src={warships[0].type.icons.default} alt="Warship's type image"/>
          <p className={`${infoStyles.text} ${infoStyles.text_paragraph}`}>{warships[0].type.title},</p>
          <p className={`${infoStyles.text} ${infoStyles.text_paragraph}`}>level {warships[0].level}</p>
        </div>
        <p className={`${infoStyles.text} ${infoStyles.text_paragraph}`}>{warships[0].description}</p>
      </div>
    </section>
  )
})