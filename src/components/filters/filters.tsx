import React, {ChangeEvent, useCallback} from 'react';

import filtersStyles from './filters.module.css';

import {DropList} from '../drop-list/drop-list';

import mainStore from '../../stores';
import {FilterButton} from '../filter-button/filter-button';
import warshipsDataStore from '../../stores/warships-data-store';

export const Filters = () => {
  const handleOnChangeLevel = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    mainStore.filtersDataStore.setLevelsField(e.target.value)
  }, [mainStore.filtersDataStore.levelsField])

  const handleOnChangeNation = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    mainStore.filtersDataStore.setNationsField(e.target.value)
  }, [mainStore.filtersDataStore.nationsField])

  const handleOnChangeType = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    mainStore.filtersDataStore.setTypesField(e.target.value)
  }, [mainStore.filtersDataStore.typesField])

  const handleOnApplyFilters = () => {
    mainStore.filtersDataStore.getFilteredData(warshipsDataStore.wships);
  }

  const handleOnResetFilters = useCallback(() => {
    mainStore.filtersDataStore.resetFilters(warshipsDataStore.wships);
  }, [mainStore.filtersDataStore.levelsField, mainStore.filtersDataStore.nationsField, mainStore.filtersDataStore.typesField])

  return (
    <div className={filtersStyles['filters-wrap']}>
      <div className={filtersStyles['filters-area']}>
        <DropList id="level"
                  label="Level:"
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleOnChangeLevel(e)}>
          {
            mainStore.filtersFieldsDataStore.levels.map((option, index) => (
              <option
                key={index}
                selected={option.title === mainStore.filtersDataStore.levelsField}
                value={option.title}>{option.title}</option>
            ))
          }
        </DropList>
        <DropList id="nation"
                  label="Nation:"
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleOnChangeNation(e)}>
          {
            mainStore.filtersFieldsDataStore.nations.map((option, index) => (
              <option
                key={index}
                selected={option.title === mainStore.filtersDataStore.nationsField}
                value={option.title}>{option.title}</option>
            ))
          }
        </DropList>
        <DropList id="type"
                  label="Type:"
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleOnChangeType(e)}>
          {
            mainStore.filtersFieldsDataStore.types.map((option, index) => (
              <option
                key={index}
                selected={option.title === mainStore.filtersDataStore.typesField}
                value={option.title}
                // style={{backgroundImage: `url(${option.icon})`}}
              >
                {/*<img src={option.icon} alt="type image" style={{width: '10px', height: '10px'}}/>*/}
                {option.title}
              </option>
            ))
          }
        </DropList>
      </div>
      <div className={filtersStyles['buttons-area']}>
        <FilterButton name="Apply" isDisabled={false} onClick={handleOnApplyFilters}/>
        <FilterButton name="Reset" isDisabled={false} onClick={handleOnResetFilters}/>
      </div>
    </div>
  )
}