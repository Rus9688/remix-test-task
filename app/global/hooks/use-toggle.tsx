import {useState, SyntheticEvent} from 'react';

//
//

export const useToggle = (defaultValue: boolean = false) => {
  const [value, setValue] = useState(defaultValue);

  return {
    value,
    toggle: () => setValue(v => !v),
    setValue: (val: boolean) => setValue(val),
    preventEventDefault: (event: SyntheticEvent) => event?.preventDefault?.(),
  };
};
