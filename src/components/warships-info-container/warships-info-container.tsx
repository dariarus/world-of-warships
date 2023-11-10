import React, {FunctionComponent} from 'react';

import infoStyles from './warships-info-container.module.css'

import {useSelector} from '../../types/hooks';

export const WarshipsInfoContainer: FunctionComponent = () => {
  const warshipsDataState = useSelector(state => state.warshipsDataState);

  console.log(warshipsDataState.warships[0])

  return (
    warshipsDataState.warships[0] &&
    <section className={infoStyles.content}>
      <div
        className={infoStyles['image-wrap']}
        style={{
          backgroundImage: `url(${(warshipsDataState.warships[0].nation.icons?.large || '')})`,
        }}
      >
        <img
          src={warshipsDataState.warships[0].icons?.large}
          alt="Warship image"
          className={`${infoStyles.image} ${infoStyles.image_warship}`} />
      </div>
      <div className={infoStyles['info-wrap']}>
        <div className={infoStyles['info-container']}>
          <h2 className={`${infoStyles.text} ${infoStyles.text_header}`}>{warshipsDataState.warships[0].title}</h2>
          <p className={`${infoStyles.text} ${infoStyles.text_heading}`}>{warshipsDataState.warships[0].nation.title}</p>
        </div>
        <div className={infoStyles['info-container']}>
          <img src={warshipsDataState.warships[0].type.icons.default} alt="Warship's type image"/>
          <p className={`${infoStyles.text} ${infoStyles.text_heading}`}>{warshipsDataState.warships[0].type.title}</p>
          <p className={`${infoStyles.text} ${infoStyles.text_paragraph}`}>level {warshipsDataState.warships[0].level}</p>
        </div>
        <p className={`${infoStyles.text} ${infoStyles.text_paragraph}`}>{warshipsDataState.warships[0].description}</p>
      </div>
    </section>
  )
}