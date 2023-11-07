import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IWarshipsDataState, TError, TWarships} from '../../types/slices';
import {TWarshipsDataActions} from '../../types/actions';

export const warshipsDataSlice = createSlice({
  name: 'warshipsData',
  initialState: {
    isLoading: false,
    warships: [],
    isError: false,
    error: {}
  } as IWarshipsDataState,
  reducers: {
    getWarshipsDataLoading: (state) => {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    },
    getWarshipsData: (state, action: PayloadAction<Array<TWarships>>) => {
      return {
        ...state,
        isLoading: false,
        warships: action.payload,
        isError: false
      }
    },
    getWarshipsDataFailed: (state, action: PayloadAction<TError>) => {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      }
    },
  }
})

export default warshipsDataSlice.reducer

export const {
  getWarshipsDataLoading,
  getWarshipsData,
  getWarshipsDataFailed,
} = warshipsDataSlice.actions

export const warshipsDataActions: TWarshipsDataActions = {
  getWarshipsDataLoading: getWarshipsDataLoading,
  getWarshipsData: getWarshipsData,
  getWarshipsDataFailed: getWarshipsDataFailed
}
