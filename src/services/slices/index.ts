import {combineReducers} from '@reduxjs/toolkit';
import {warshipsDataSlice} from './warships-data';

export const rootReducer = combineReducers({
    warshipsDataState: warshipsDataSlice.reducer,
  }
)