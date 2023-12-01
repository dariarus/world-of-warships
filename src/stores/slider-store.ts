import {makeAutoObservable} from 'mobx';
import {SliderItemStore} from './slider-item-store';

export class SliderStore {
  currentActiveItem: SliderItemStore | null = null;
  activeIndex: number = 0;
  restWidth: number = 0;
  fullTranslate: number = 0;

  constructor() {
    makeAutoObservable(this)
  }

  setActiveItem(newActiveItem: SliderItemStore) {
    console.log('newActiveItem: ' , newActiveItem)
    if (!newActiveItem) {
      return;
    }
    // if (!this.currentActiveItem) {
    //   this.currentActiveItem = mainStore.sliderItemStores[0];
    //   this.currentActiveItem.setIsActive(true);
    // }
    if (this.currentActiveItem) {
      this.currentActiveItem.setIsActive(false);
    }
    this.currentActiveItem = newActiveItem;
    this.currentActiveItem.setIsActive(true);
    console.log('setActiveItem: ', this.currentActiveItem.isActive)
  }

  setActiveIndex(newIndex: number) {
    this.activeIndex = newIndex;
  }

  setRestWidth(newWidth: number) {
    this.restWidth = newWidth;
  }

  setFullTranslate(translate: number) {
    this.fullTranslate = translate;
  }
}