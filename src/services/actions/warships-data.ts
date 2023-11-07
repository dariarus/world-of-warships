import {AppDispatch, AppThunk} from '../../types';
import {warshipsDataActions} from '../slices/warships-data';
import {WARSHIPS_API_URL} from '../../utils/constants';
import {getResponseData} from './json-verification';
import {TWarships} from '../../types/slices';

export const getWarshipsData = (): AppThunk => {
  return function (dispatch: AppDispatch) {

    dispatch(warshipsDataActions.getWarshipsDataLoading());

    return fetch(
      `${WARSHIPS_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `{
            vehicles {
              title
              description
              icons {
                large
                medium
              }
              level
              type {
                name
                title
                icons {
                  default
                }
              }
              nation {
                name
                title
                color
                icons {
                  small
                  medium
                  large
                }
              }
            }
          }`
        }),
      })
      .then(res => getResponseData<{ data: {vehicles: Array<TWarships>} }>(res))
      .then((res) => {
        dispatch(warshipsDataActions.getWarshipsData(res.data.vehicles));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(warshipsDataActions.getWarshipsDataFailed({message: err.message}));
      })
  }
}