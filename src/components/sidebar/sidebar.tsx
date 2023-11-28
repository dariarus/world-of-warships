import React, {FunctionComponent} from 'react';

import sidebarStyles from './sidebar.module.css';

import {Overlay} from '../overlay/overlay';
import {Filters} from '../filters/filters';

type TSidebarProps = {
  sidebarIsOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Sidebar: FunctionComponent<TSidebarProps> = (props) => {
  return (
    <>
      {
        props.sidebarIsOpen &&
        <Overlay onClose={props.onClose}/>
      }
      <div
        className={props.sidebarIsOpen
          ? `${sidebarStyles.sidebar} ${sidebarStyles.sidebar_opened}`
          : `${sidebarStyles.sidebar}`}
      >
        {/*<button className={sidebarStyles.button}>*/}
        {/*  {*/}
        {/*    props.sidebarIsOpen*/}
        {/*      ? "Hide full list"*/}
        {/*      : "Show all vehicles"*/}
        {/*  }*/}
        {/*</button>*/}
        <Filters/>
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