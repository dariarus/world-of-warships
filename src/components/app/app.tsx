import React, {FunctionComponent, useEffect} from 'react';

import appStyles from './app.module.css';

// import {TestComponent} from '../test-component';
import {WarshipsInfoContainer} from '../warships-info-container/warships-info-container';
import {getWarshipsData} from '../../services/actions/warships-data';
import {useAppDispatch} from '../../types/hooks';
import {Slider} from '../slider/slider';
// import {TestComponent} from '../test-component';

const App: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getWarshipsData());
  }, [])

  return (
    <div className={appStyles.wrap}>
      <header className={appStyles.header}>
        <h1 className={appStyles.header__text}>Warships</h1>
      </header>
      <main>
        <WarshipsInfoContainer/>
        {/*<TestComponent/>*/}
        <Slider/>
      </main>
    </div>
  )
}

export default App;