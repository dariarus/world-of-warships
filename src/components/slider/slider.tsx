import React, {FunctionComponent, useCallback, useEffect, useState} from 'react';

import sliderStyles from './slider.module.css';

import {SliderItem} from '../slider-item/slider-item';

import {TWarship} from '../../types/data';
import {getHashes} from 'crypto';
import {act} from 'react-dom/test-utils';

export const Slider: FunctionComponent<{ warships: TWarship[] }> = (props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [restLength, setRestLength] = useState<number>(3080);
  const [position, setPosition] = useState<number>(0)
  const [translate, setTranslate] = useState<number>(0);
  console.log(restLength)
  console.log(activeIndex)

  const fullWindowLength = 1400;
  const widthOfOneElement = 220
  const widthOfTwoElements = widthOfOneElement  * 2;
  const widthOf6Elements = widthOfOneElement * 6;
  const fullLength = props.warships.length * widthOf6Elements / 6;
  // const lastPosition = fullLength - widthOf6Elements
  const lastPosition = fullLength - fullWindowLength

  console.log('lP:', lastPosition)
  const setNewIndex = (newIndex: number) => {
    if ((newIndex - 1) * widthOfTwoElements > fullLength - fullWindowLength) {
      return
    }
    if (newIndex < 0) {
      newIndex = 0;
    }
      setActiveIndex(newIndex);
  }

  let restLengthOutOfViewArea = fullLength - 1400

  // useEffect(() => {
  //   if (restLength < (fullLength * 10 / 100)) {
  //     setTranslate(translate + 5)
  //   } else {
  //     setTranslate(translate + 31.4)
  //   }
  // }, [restLength])
  // let translate = setTranslate();

  // let fullTranslate = activeIndex * translate

  const setRestLengthInPxClickRight = () => {
    restLengthOutOfViewArea = restLength - (fullLength * 10 / 100)
    // if (restLengthOutOfViewArea <= 0) {
    //   setRestLength(0);
    //   return
    // }
    setRestLength(restLengthOutOfViewArea)
  }

  const setRestLengthInPxClickLeft = () => {
    restLengthOutOfViewArea = restLength + (fullLength * 10 / 100)
    setRestLength(restLengthOutOfViewArea)
  }


  // useEffect(() => {
  //   const maxLength = 4400
  //   setTranslate(Math.min(translate + 31.4, maxLength))
  //   console.log('maxLength:', maxLength)
  // }, [activeIndex])

  // useEffect(() => {
  //   if (restLength - (fullLength * 10 / 100) === 0) {
  //     setActiveIndex(activeIndex * translate + 1)
  //   }
  // }, [translate])

  useEffect(() => {
    setPosition(Math.min(activeIndex * widthOfTwoElements, lastPosition))
  }, [activeIndex])

  useEffect(() => {
    console.log('restLength: ', restLength)
  }, [restLength])

  useEffect(() => {
    console.log('activeInd: ', activeIndex)
  }, [activeIndex])

  useEffect(() => {
    console.log('activeInd x translate: ', activeIndex * translate)
  }, [activeIndex, translate])


  return (
    <div className={sliderStyles['slider-container']}>
      <button
        className={`${sliderStyles.button} ${sliderStyles.button_left}`}
        onClick={() => {
          setNewIndex(activeIndex - 1)
          setRestLengthInPxClickLeft()
        }}
      />
      <div className={sliderStyles['slider-outer-window']}>
        <div
          className={sliderStyles['slider-inner-window']}
          style={{
            transform: `translateX(-${position}px)`
          }}
        >
          {
            props.warships.map((item, index) => (
              <SliderItem key={item.id} warship={item} index={index}/>
            ))
          }
        </div>
      </div>
      <button
        className={`${sliderStyles.button} ${sliderStyles.button_right}`}
        onClick={() => {
          setNewIndex(activeIndex + 1)
          setRestLengthInPxClickRight()
        }}
      />
    </div>
  )
}