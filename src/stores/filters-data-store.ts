import {makeAutoObservable} from 'mobx';
import {TWarship} from '../types/data';
import {initialFieldsValue} from '../utils/constants';

export class FiltersDataStore {
  levelsField: string = initialFieldsValue;
  nationsField: string = initialFieldsValue;
  typesField: string = initialFieldsValue;
  filteredWarships: TWarship[] = [];

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

  setFilteredData(data: TWarship[]) {
    this.filteredWarships = data;
  }

  getFilteredData(initialWarshipsArray: TWarship[]) {
    const filteredWarships = initialWarshipsArray
      .filter(item => this.filterByLevels(item) && this.filterByNations(item) && this.filterByTypes(item));
    this.setFilteredData(filteredWarships);
  }

  resetFilters(initialWarshipsArray: TWarship[]) {
    this.setLevelsField(initialFieldsValue);
    this.setNationsField(initialFieldsValue);
    this.setTypesField(initialFieldsValue);
    this.setFilteredData(initialWarshipsArray);
  }
}