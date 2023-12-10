import {makeAutoObservable} from 'mobx';
import {visibleItemsInFullList} from '../utils/constants';

export class FullWarshipsListStore {
  listIsOpen: boolean = false;
  visibleFullListItems: number = visibleItemsInFullList;

  constructor() {
    makeAutoObservable(this);
  }

  setListIsOpen() {
    this.listIsOpen = true;
  }

  setListIsClose() {
    if (this.listIsOpen) {
      this.listIsOpen = false;
    }
  }

  setVisibleFullListItems(moreItems: number) {
    this.visibleFullListItems = this.visibleFullListItems + moreItems;
  }

  resetVisibleFullListItems() {
    this.visibleFullListItems = visibleItemsInFullList;
  }
}