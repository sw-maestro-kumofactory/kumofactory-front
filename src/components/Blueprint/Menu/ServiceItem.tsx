'use client';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { ServiceFactory } from '@/src/components/AWSService/ServiceFactory/ServiceFactory';
import ItemButtonContainer from '@/src/components/common/Button/ItemButton';
import { Services } from '@/src/types/Services';

interface IProps {
  type: string;
}

const ServiceItem = ({ type }: IProps) => {
  const { createService } = useBlueprintStore((state) => state.ServiceAction);
  const serviceFactory = new ServiceFactory();

  return (
    <ItemButtonContainer onClick={() => createService(serviceFactory.createService({ type: type }))}>
      {type}
    </ItemButtonContainer>
  );
};

export default ServiceItem;
