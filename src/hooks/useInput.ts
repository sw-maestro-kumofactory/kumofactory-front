import { ChangeEvent, useRef, useState } from 'react';

const useInput = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const valueRef = useRef<T>(initialValue);

  const onHandleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    valueRef.current = e.target.value as unknown as T;
    setValue(e.target.value as unknown as T);
  };

  return { value, valueRef, setValue, onHandleChange };
};

export default useInput;
