import {SliderItemStore} from './slider-item-store';
import {makeAutoObservable} from 'mobx';

export class SliderStore {
  currentActiveItem: SliderItemStore | null = null;

  constructor() {
    makeAutoObservable(this)
  }

  setActiveItem(newActiveItem: SliderItemStore) {
    if (this.currentActiveItem) {
      this.currentActiveItem.setIsActive(false);
    }
    this.currentActiveItem = newActiveItem;
    this.currentActiveItem.setIsActive(true);
  }
}

const sliderStore = new SliderStore();

export default sliderStore