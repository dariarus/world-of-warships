import React, {FunctionComponent} from 'react';

import preloaderStyles from './preloader.module.css';

export const Preloader: FunctionComponent = () => {
  return (
    <svg className={preloaderStyles.spinner} viewBox="0 0 50 50">
      <circle className={preloaderStyles.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </svg>
  )
}