import { ChangeEvent, useState } from 'react';

const useInput = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  const onHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue(e.target.value as unknown as T);
  };

  return { value, setValue, onHandleChange };
};

export default useInput;
