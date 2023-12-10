import React, {ChangeEvent, useCallback, useState} from 'react';

import filtersStyles from './filters.module.css';

import {DropList} from '../drop-list/drop-list';
import {FilterButton} from '../filter-button/filter-button';

import mainStore from '../../stores';

import {initialFieldsValue} from '../../utils/constants';

export const Filters = () => {
  const [levelValue, setLevelValue] = useState(initialFieldsValue);
  const [nationValue, setNationValue] = useState(initialFieldsValue);
  const [typeValue, setTypeValue] = useState(initialFieldsValue);

  const handleOnChangeLevel = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    mainStore.filtersDataStore.setLevelsField(e.target.value);
    setLevelValue(e.target.value);
  }, [mainStore.filtersDataStore.levelsField])

  const handleOnChangeNation = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    mainStore.filtersDataStore.setNationsField(e.target.value);
    setNationValue(e.target.value);
  }, [mainStore.filtersDataStore.nationsField])

  const handleOnChangeType = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    mainStore.filtersDataStore.setTypesField(e.target.value);
    setTypeValue(e.target.value);
  }, [mainStore.filtersDataStore.typesField])

  const handleOnApplyFilters = () => {
    mainStore.filtersDataStore.getFilteredData(mainStore.sliderItemStores);
    mainStore.sliderStore.setActiveIndex(0);
    mainStore.sliderStore.setFullTranslate(0);
    mainStore.sliderStore.resetVisibleSliderItems();
    mainStore.fullWarshipsListStore.resetVisibleFullListItems();
  }

  const handleOnResetFilters = () => {
    mainStore.filtersDataStore.resetFilters(mainStore.sliderItemStores);
    mainStore.sliderStore.setActiveIndex(0);
    mainStore.sliderStore.setFullTranslate(0);
    mainStore.sliderStore.resetVisibleSliderItems();
    mainStore.fullWarshipsListStore.resetVisibleFullListItems();
    setLevelValue(initialFieldsValue);
    setNationValue(initialFieldsValue);
    setTypeValue(initialFieldsValue);
  }

  return (
    <div className={filtersStyles['filters-wrap']}>
      <div className={filtersStyles['filters-area']}>
        <DropList id="level"
                  label="Level:"
                  selectedValue={levelValue}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleOnChangeLevel(e)}>
          {
            mainStore.filtersFieldsDataStore.levels.map((option, index) => (
              <option
                key={index}
                value={option.title}>{option.title}</option>
            ))
          }
        </DropList>
        <DropList id="nation"
                  label="Nation:"
                  selectedValue={nationValue}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleOnChangeNation(e)}>
          {
            mainStore.filtersFieldsDataStore.nations.map((option, index) => (
              <option
                key={index}
                value={option.title}>{option.title}</option>
            ))
          }
        </DropList>
        <DropList id="type"
                  label="Type:"
                  selectedValue={typeValue}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => handleOnChangeType(e)}>
          {
            mainStore.filtersFieldsDataStore.types.map((option, index) => (
              <option
                key={index}
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