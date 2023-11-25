import {SliderItemStore} from './slider-item-store';
import {makeAutoObservable} from 'mobx';
// import mainStore from './index';

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
}

// const sliderStore = new SliderStore();

// export default sliderStore