import React, {FunctionComponent} from 'react';

import sidebarStyles from './sidebar.module.css';

import {Overlay} from '../overlay/overlay';
import {Filters} from '../filters/filters';
import mainStore from '../../stores';

type TSidebarProps = {
  sidebarIsOpen: boolean;
  children: React.ReactNode;
}

export const Sidebar: FunctionComponent<TSidebarProps> = (props) => {
  return (
    <>
      {
        props.sidebarIsOpen &&
        <Overlay onClose={() => {
          mainStore.fullWarshipsListStore.setListIsClose()
        }}/>
      }
      <div className={props.sidebarIsOpen
        ? `${sidebarStyles.sidebar} ${sidebarStyles.sidebar_opened}`
        : `${sidebarStyles.sidebar}`}
      >
        <div className={sidebarStyles.sidebar__settings}>
          <Filters/>
          <button
            className={sidebarStyles.button}
            onClick={() => {
              if (props.sidebarIsOpen) {
                mainStore.fullWarshipsListStore.setListIsClose();
                document.body.classList.remove('body-overlay');
              } else {
                mainStore.fullWarshipsListStore.setListIsOpen();
                document.body.classList.add('body-overlay');
              }
            }}
          >
            {
              props.sidebarIsOpen
                ? "Hide full list"
                : "Show all vehicles"
            }
          </button>
        </div>
        {
          props.sidebarIsOpen
            ? <div className={sidebarStyles['sidebar__children-wrap']}>
              {props.children}
            </div>
            : <>
              {props.children}
            </>
        }
      </div>
    </>
  )
}