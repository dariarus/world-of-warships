import {makeAutoObservable} from 'mobx';

export class FullWarshipsListStore {
  listIsOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setListIsOpen() {
    this.listIsOpen = true;
  }

  setListIsClose() {
    this.listIsOpen = false;
  }
}