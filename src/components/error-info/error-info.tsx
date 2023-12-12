import React, {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';

import errorInfoStyles from './error-info.module.css';

import {Overlay} from '../overlay/overlay';

export const ErrorInfo: FunctionComponent<{message?: string}> = observer((props) => {
  return (
    <>
      <Overlay />
      <h3 className={errorInfoStyles.text}>There is an error:
        <span className={errorInfoStyles['text-medium']}>{props.message}</span></h3>
    </>
  )
})