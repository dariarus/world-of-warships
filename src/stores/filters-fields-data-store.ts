import {makeAutoObservable} from 'mobx';
import {TWarship} from '../types/data';

type TFilter<T> = {
  title: T,
  icon?: string
}

export class FiltersFieldsDataStore {
  levels: TFilter<number | string>[] = [];
  nations: TFilter<string>[] = [];
  types: TFilter<string>[] = [];

  constructor() {
    makeAutoObservable(this)
  }

  setLevels(warships: TWarship[]) {
    const uniqueLevels = new Set<number>()
    if (warships) {
      warships.forEach(item => {
        uniqueLevels.add(item.level)
      })
      this.levels = Array.from(uniqueLevels)
        .sort((a, b) => a - b)
        .map(item => {
          return {
            title: item
          }
        })
      this.levels.unshift({title: 'all'});
    }
  }

  setNations(warships: TWarship[]) {
    const uniqueNations = new Set<string>()
    if (warships) {
      warships.forEach(item => {
        uniqueNations.add(item.nation.title)
      })
      this.nations = Array.from(uniqueNations)
        .sort()
        .map(item => {
          return {
            title: item
          }
        })
      this.nations.unshift({title: 'all'});
    }
  }

  setTypes(warships: TWarship[]) {
    const uniqueTypes = new Map<string, TFilter<string>>();
    if (warships) {
      warships.forEach(item => {
        uniqueTypes.set(item.type.title, {title: item.type.title, icon: item.type.icons.default})
      })
      /* такое превращение Map в объект тоже работает:
      const uniqueTypesArray = Array.from(uniqueTypes, ([title, icon]) => ({title, icon})) */
      this.types = Array.from(uniqueTypes.values())
        .sort((a, b) => a.title.localeCompare(b.title)); // сортировка (по алфавиту) по ключу title в объекте
      this.types.unshift({title: 'all', icon: ''});
    }
  }
}