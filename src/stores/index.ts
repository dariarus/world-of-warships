import warshipsStore, {WarshipsStore} from './warships-store';
// import {makeAutoObservable} from 'mobx';

export class MainStore {
  warshipsStore: WarshipsStore

  constructor() {
    // Инициализация дочерних хранилищ
    this.warshipsStore = warshipsStore;
    // makeAutoObservable(this)
  }
}

const mainStore = new MainStore();
export default mainStore;