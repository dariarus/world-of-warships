import {makeAutoObservable} from 'mobx';
import {TWarship} from '../types/data';
import {initialFieldsValue, visibleItems} from '../utils/constants';
import {SliderItemStore} from './slider-item-store';
import {arraysEqual} from '../utils/functions';

export class FiltersDataStore {
  levelsField: string = initialFieldsValue;
  nationsField: string = initialFieldsValue;
  typesField: string = initialFieldsValue;
  filteredWarships: SliderItemStore[] = [];
  visibleItems: number = visibleItems;

  constructor() {
    makeAutoObservable(this)
  }

  setLevelsField(value: string) {
    this.levelsField = value.toString();
  }

  setNationsField(value: string) {
    this.nationsField = value;
  }

  setTypesField(value: string) {
    this.typesField = value;
  }

  filterByLevels(item: TWarship) {
    if (this.levelsField === initialFieldsValue) {
      return true;
    }
    return item.level.toString() === this.levelsField;
  }

  filterByNations(item: TWarship) {
    if (this.nationsField === initialFieldsValue) {
      return true;
    }
    return item.nation.title === this.nationsField;
  }

  filterByTypes(item: TWarship) {
    if (this.typesField === initialFieldsValue) {
      return true;
    }
    return item.type.title === this.typesField;
  }

  setFilteredData(data: SliderItemStore[]) {
    this.filteredWarships = data;
  }

  getFilteredData(initialWarshipsArray: SliderItemStore[]) {
    const filteredWarships = initialWarshipsArray
      .filter(item => this.filterByLevels(item.warship) && this.filterByNations(item.warship) && this.filterByTypes(item.warship));
    if (!arraysEqual(filteredWarships, this.filteredWarships)) {
      this.setFilteredData(filteredWarships);
    }
  }

  resetFilters(initialWarshipsArray: SliderItemStore[]) {
    this.setLevelsField(initialFieldsValue);
    this.setNationsField(initialFieldsValue);
    this.setTypesField(initialFieldsValue);
    this.setFilteredData(initialWarshipsArray);
  }

  setVisibleItems(moreItems: number) {
    this.visibleItems = this.visibleItems + moreItems;
  }

  resetVisibleItems() {
    this.visibleItems = visibleItems;
  }
}