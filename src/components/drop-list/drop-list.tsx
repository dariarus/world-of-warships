import React, {ChangeEvent, FunctionComponent, ReactNode} from 'react';

import dropListStyles from './drop-list.module.css';
import {observer} from 'mobx-react-lite';

type TDropList = {
  id: string,
  label: string,
  children: ReactNode,
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void,
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
        onChange={props.onChange}>
        {props.children}
      </select>
    </div>
  )
})