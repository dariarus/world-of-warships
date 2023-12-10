import {makeAutoObservable} from 'mobx';
import {SliderItemStore} from './slider-item-store';
import {SliderItemActivator} from '../types/data';
import {visibleItemsInSlider} from '../utils/constants';

export class SliderStore {
  currentActiveItem: SliderItemStore | null = null;
  activeIndex: number = 0;
  restWidth: number = 0;
  fullTranslate: number = 0;
  visibleSliderItems: number = visibleItemsInSlider;

  constructor() {
    makeAutoObservable(this)
  }

  setActiveItem(newActiveItem: SliderItemStore, activator: SliderItemActivator) {
    if (!newActiveItem) {
      return;
    }
    if (
      activator === SliderItemActivator.INITIAL
      && this.currentActiveItem
      && this.currentActiveItem.sliderItemActivator !== SliderItemActivator.INITIAL) {
      return;
    }
    if (this.currentActiveItem) {
      this.currentActiveItem.setIsActive(false, activator);
    }
    this.currentActiveItem = newActiveItem;
    this.currentActiveItem.setIsActive(true, activator);
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

  setVisibleSliderItems(moreItems: number) {
    this.visibleSliderItems = this.visibleSliderItems + moreItems;
  }

  resetVisibleSliderItems() {
    this.visibleSliderItems = visibleItemsInSlider;
  }
}