import React, {FunctionComponent} from 'react';

import filterButtonStyles from './filter-button.module.css';

type TFilterButtonProps = {
  name: string;
  isDisabled: boolean;
  onClick: () => void;
}

export const FilterButton: FunctionComponent<TFilterButtonProps> = (props) => {
  return (
    <button
      disabled={props.isDisabled}
      className={props.name === 'Apply'
      ? `${filterButtonStyles.button} ${filterButtonStyles.button_light}`
      : `${filterButtonStyles.button} ${filterButtonStyles.button_transparent}`
    }
      onClick={props.onClick}
    >
      {props.name}
    </button>
  )
}