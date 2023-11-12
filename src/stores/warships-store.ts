import {TError, TWarship} from '../types/data';
import {makeAutoObservable} from 'mobx';

import {WARSHIPS_API_URL} from '../utils/constants';

import {getResponseData} from '../utils/functions';

// Класс экспортируется для того, чтобы импортировать его как _тип_ стейта warshipsStore, используемого в компонентах React
export class WarshipsStore {
  isLoading: boolean = false;
  warships: TWarship[] = [];
  isError: boolean = false;
  error: TError = {}

  /* Декораторы на момент работы над проектом не работают: @observable поля не проксируются
  Функция для автоматического добавления нужных декораторов для всех полей и методов:*/
  constructor() {
    makeAutoObservable(this)
  }

  setWarshipsDataLoading() {
    this.isLoading = true;
  }

  setWarshipsData(warships: TWarship[]) {
    this.warships = warships;
    this.isLoading = false;
  }

  setWarshipsDataFailed(error: TError) {
    this.isLoading = false;
    this.isError = true;
    this.error = error;
  }

  loadFromServer() {
    this.setWarshipsDataLoading();
    return fetch(
      `${WARSHIPS_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `{
            vehicles {
              id
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
      .then(res => getResponseData<{ data: { vehicles: Array<TWarship> } }>(res))
      .then((res) => {
        this.setWarshipsData(res.data.vehicles)
      })
      .catch((err) => {
        console.log(err.message);
        this.setWarshipsDataFailed({message: err.message})
      })
  }
}

const warshipsStore = new WarshipsStore();

export default warshipsStore;