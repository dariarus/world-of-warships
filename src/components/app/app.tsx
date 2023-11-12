import React, {FunctionComponent, useEffect} from 'react';
import {observer} from 'mobx-react-lite';

import appStyles from './app.module.css';

import {WarshipsInfoContainer} from '../warships-info-container/warships-info-container';
import {Slider} from '../slider/slider';

import warshipsStore from '../../stores/warships-store';

const App: FunctionComponent = observer(() => {
  // const dispatch = useAppDispatch();
  useEffect(() => {
    warshipsStore.loadFromServer();
  }, [])

  // const myTodos = new TodoStore()

  return (
    <div className={appStyles.wrap}>
      <header className={appStyles.header}>
        <h1 className={appStyles.header__text}>Warships</h1>
      </header>
      <main>
        <WarshipsInfoContainer warships={warshipsStore.warships}/>
        <Slider warships={warshipsStore.warships}/>
      </main>
    </div>
  )
})

export default App;


// import React from 'react';
// import { observer } from 'mobx-react-lite';
// import TodoList from '../test-to-do';
//
//
// const App = observer(() => {
//   return (
//     <div>
//       <h1>My Todo App</h1>
//       <TodoList />
//     </div>
//   );
// });
//
// export default App;