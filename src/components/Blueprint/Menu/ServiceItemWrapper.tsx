'use client';
import { v1 } from 'uuid';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { ServiceFactory } from '@/src/components/AWSService/ServiceFactory/ServiceFactory';
import ItemButtonContainer from '@/src/components/common/Button/ItemButton';
import { MenuItemList } from '@/src/assets/MenuItems';
import { OptionFactory } from '@/src/components/AWSService/OptionFactory/OptionFactory';

interface IProps {
  type: string;
  children?: React.ReactNode;
}

const ServiceItemWrapper = ({ type, children }: IProps) => {
  const createService = useBlueprintStore((state) => state.ServiceAction.createService);
  const createOption = useBlueprintStore((state) => state.OptionAction.createOption);
  const serviceFactory = new ServiceFactory();
  const optionFactory = new OptionFactory();
  const items = MenuItemList[type];

  return (
    <div className='flex flex-wrap '>
      {items &&
        items.map((item) => (
          <ItemButtonContainer
            key={item.type}
            onClick={() => {
              const id = v1().toString();
              createService(serviceFactory.createService({ type: item.type }), id);
              createOption(optionFactory.createOption(item.type, id));
            }}
          >
            <svg
              cursor='pointer'
              width={64}
              height={64}
              viewBox='0 0 80 80'
              xmlns='http://www.w3.org/2000/svg'
              className='service-svg animate-service'
            >
              {serviceFactory.getSvg({ type: item.type })}
            </svg>
            <div className='text-black text-sm'>{item.name.toString()}</div>
          </ItemButtonContainer>
        ))}
    </div>
  );
};

export default ServiceItemWrapper;
