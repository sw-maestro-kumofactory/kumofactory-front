'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface IProps {
  active: boolean;
  onClick: () => void;
  name: string;
}

const RDSInfo = ({ active, onClick, name }: IProps) => {
  const pathName = usePathname();
  const [disableEvent, setDisableEvent] = useState(false);

  const onClickInstance = () => {
    if (!disableEvent) {
      onClick();
    }
  };

  useEffect(() => {
    if (pathName.split('/').length > 5) {
      setDisableEvent(true);
    } else {
      setDisableEvent(false);
    }
  }, []);

  return (
    <div>
      <div
        className={`p-2 w-full h-fit flex justify-between text-center ${
          active ? 'bg-[#799ACF] text-white' : 'text-black'
        }`}
        onClick={onClickInstance}
      >
        <label className='text-lg h-fit'>{name}</label>
      </div>
    </div>
  );
};

export default RDSInfo;
