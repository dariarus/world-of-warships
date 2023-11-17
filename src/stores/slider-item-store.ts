import {TWarship} from '../types/data';
import {makeAutoObservable} from 'mobx';

export class SliderItemStore {
  isActive: boolean = false;
  warship: TWarship;
  constructor(warship: TWarship) {
    this.warship = warship;
    makeAutoObservable(this);
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