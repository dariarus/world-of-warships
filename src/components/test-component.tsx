import React, {FunctionComponent, useEffect} from 'react';
import {useAppDispatch, useSelector} from '../types/hooks';

import {getWarshipsData} from '../services/actions/warships-data';

import test from './test-styles.module.css';
// title: string,
//   description: string,
//   icons: {
//   large: string,
//     medium: string
// },
// level: null,
//   type: {
//   name: string,
//     title: string,
//     icons: {
//   default: string,
//   },
// },
// nation: {
//   name: string,
//     title: string,
//     color: string,
//     icons: {
//     small: string,
//       medium: string,
//       large: string,
//   },
// },
export const TestComponent: FunctionComponent = () => {
  const warshipsDataState = useSelector(state => state.warshipsDataState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWarshipsData());
  }, [])

  return (
    <>
      {
        warshipsDataState.warships.map(warship => (
          <div className={test.div}>
            <h3>{warship.title}</h3>
            <p>{warship.description}</p>
            <img src={warship.icons.large} />
            <p>{warship.level}</p>
            Type:
            <h4>{warship.type.name}</h4>
            <p>{warship.type.title}</p>
            <img src={warship.type.icons.default}/>
            <h4>{warship.nation.name}</h4>
            <p>{warship.nation.title}</p>
            <p>{warship.nation.color}</p>
            <img src={warship.nation.icons.large}/>
          </div>
        ))
      }
    </>
  )
}