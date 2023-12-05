import {makeAutoObservable} from 'mobx';
import {SliderItemStore} from './slider-item-store';
import {SliderItemActivator} from '../types/data';

export class SliderStore {
  currentActiveItem: SliderItemStore | null = null;
  activeIndex: number = 0;
  restWidth: number = 0;
  fullTranslate: number = 0;

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
}