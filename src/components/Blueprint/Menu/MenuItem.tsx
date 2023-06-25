'use client';
import useServiceStore, { useServiceActions } from '@/src/hooks/useServiceStore';
import { ServiceFactory } from '@/src/components/AWSService/ServiceFactory/ServiceFactory';

interface IProps {
  type: string;
}

const MenuItem = ({ type }: IProps) => {
  const { services } = useServiceStore();
  const { addService } = useServiceActions();
  const serviceFactory = new ServiceFactory();

  return (
    <div
      className='flex items-center justify-center bg-[#799ACF] text-white text-2xl font-bold h-32 cursor-pointer rounded-2xl m-4 select-none'
      onClick={() => {
        addService(serviceFactory.createService({ type: type, id: services.length }));
      }}
    >
      {type}
    </div>
  );
};

export default MenuItem;
