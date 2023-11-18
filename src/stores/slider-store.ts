import {SliderItemStore} from './slider-item-store';
import {makeAutoObservable} from 'mobx';

export class SliderStore {
  currentActiveItem: SliderItemStore | null = null;

  constructor() {
    makeAutoObservable(this)
  }

  setActiveItem(newActiveItem: SliderItemStore) {
    console.log('newActiveItem: ' , newActiveItem)
    if (!newActiveItem) {
      return;
    }
    if (this.currentActiveItem) {
      this.currentActiveItem.setIsActive(false);
    }
    this.currentActiveItem = newActiveItem;
    this.currentActiveItem.setIsActive(true);
    console.log('setActiveItem: ', this.currentActiveItem.isActive)
  }
}

// const sliderStore = new SliderStore();

// export default sliderStore