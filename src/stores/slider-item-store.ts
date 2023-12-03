import {SliderItemActivator, TWarship} from '../types/data';
import {makeAutoObservable} from 'mobx';

export class SliderItemStore {
  isActive: boolean;
  sliderItemActivator: SliderItemActivator;
  warship: TWarship;
  constructor(warship: TWarship) {
    makeAutoObservable(this);
    this.warship = warship;
    this.isActive = false;
    this.sliderItemActivator = SliderItemActivator.SLIDER;
  }

  setIsActive(isActive: boolean, activator: SliderItemActivator) {
    this.isActive = isActive;
    this.sliderItemActivator = activator;
  }
  // getActiveItem(warships: TWarship[], id: string) {
  //   this.activeItem = warships.find(item => item.id === id);
  //   console.log('clickedItem: ', this.activeItem?.id)
  //   return this.activeItem
  // }
}