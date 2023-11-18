import {TWarship} from '../types/data';
import {makeAutoObservable} from 'mobx';

export class SliderItemStore {
  isActive: boolean;
  warship: TWarship;
  constructor(warship: TWarship) {
    makeAutoObservable(this);
    this.warship = warship;
    this.isActive = false;
  }

  setIsActive(isActive: boolean) {
    this.isActive = isActive;
  }
  // getActiveItem(warships: TWarship[], id: string) {
  //   this.activeItem = warships.find(item => item.id === id);
  //   console.log('clickedItem: ', this.activeItem?.id)
  //   return this.activeItem
  // }
}