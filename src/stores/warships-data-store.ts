import {TError, TWarship} from '../types/data';
import {makeAutoObservable} from 'mobx';

import process from "process";

import warships from '../vendor/local-warships-response.json';

import {QUERY, WARSHIPS_API_URL} from '../utils/constants';

import {getResponseData} from '../utils/functions';

// Класс экспортируется для того, чтобы импортировать его как _тип_ стейта mainStore.warshipsDataStore, используемого в компонентах React
export class WarshipsDataStore {
  isLoading: boolean = false;
  warships: TWarship[] = [];
  isError: boolean = false;
  error: TError = {}

  // Для теста:
  //  get wships() { return this.warships.slice(0, 20) }

  /* Декораторы на момент работы над проектом не работают: @observable-поля не проксируются
  Использована функция для автоматического добавления нужных декораторов для всех полей и методов:*/
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

  loadWarships() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return this.loadFromServer();
    } else {
      return this.loadLocal();
    }
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
          query: QUERY
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

  loadLocal() {
    this.setWarshipsDataLoading();
    return Promise.resolve(warships)
      .then((res) => {
        this.setWarshipsData(res.data.vehicles as TWarship[])
      })
      .catch((err) => {
        console.log(err.message);
        this.setWarshipsDataFailed({message: err.message})
      })
  }
}