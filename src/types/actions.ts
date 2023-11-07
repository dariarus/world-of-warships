import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from '@reduxjs/toolkit';

import {TError, TWarships} from './slices';

export type TWarshipsDataActions = {
  getWarshipsDataLoading: ActionCreatorWithoutPayload<string>,
  getWarshipsData: ActionCreatorWithPayload<Array<TWarships>>,
  getWarshipsDataFailed: ActionCreatorWithPayload<TError>
}

export type TApplicationActions =
  TWarshipsDataActions