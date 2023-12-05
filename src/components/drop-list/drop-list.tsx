import React, {ChangeEvent, FunctionComponent, ReactNode} from 'react';

import dropListStyles from './drop-list.module.css';

import {observer} from 'mobx-react-lite';

type TDropList = {
  id: string;
  label: string;
  selectedValue: string;
  children: ReactNode;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const DropList: FunctionComponent<TDropList> = observer((props) => {
  return (
    <div>
      <label htmlFor={props.id} className={dropListStyles.label}>{props.label}</label>
      <select
        id={props.id}
        className={props.label.includes('Level')
          ? `${dropListStyles.select} ${dropListStyles.select_level}`
          : `${dropListStyles.select}`}
        onChange={props.onChange}
        // value - вместо <option selected={true/false}> для перерисовки выбираемой опции и перерисовке опции на 'all' при сбросе фильтров
        value={props.selectedValue}
      >
        {props.children}
      </select>
    </div>
  )
})