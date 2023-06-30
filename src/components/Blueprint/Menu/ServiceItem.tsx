'use client';
import useServiceStore, { useServiceActions } from '@/src/hooks/Store/useServiceStore';
import { ServiceFactory } from '@/src/components/AWSService/ServiceFactory/ServiceFactory';
import ItemButtonContainer from '@/src/components/common/Button/ItemButton';
import { Services } from '@/src/types/Services';

interface IProps {
  type: string;
}

const MenuItem = ({ type }: IProps) => {
  const { addService } = useServiceActions();
  const serviceFactory = new ServiceFactory();

  return (
    <ItemButtonContainer onClick={() => addService(serviceFactory.createService({ type: type }))}>
      {type}
    </ItemButtonContainer>
  );
};

export default MenuItem;
