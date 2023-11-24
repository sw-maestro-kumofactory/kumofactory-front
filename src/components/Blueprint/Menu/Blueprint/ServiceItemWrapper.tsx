'use client';
import { v1 } from 'uuid';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { ServiceFactory } from '@/src/components/AWSService/ServiceFactory/ServiceFactory';
import ItemButtonContainer from '@/src/components/common/Button/ItemButton';
import { MenuItemList } from '@/src/assets/MenuItems';
import { OptionFactory } from '@/src/components/AWSService/OptionFactory/OptionFactory';
import { ServiceItemInterface, ServiceItemType } from '@/src/types/MenuItems';

interface IProps {
  type: string;
  children?: React.ReactNode;
}

const ServiceItemWrapper = ({ type, children }: IProps) => {
  const isKumoTemplate = useBlueprintStore((state) => state.isKumoTemplate);
  const createService = useBlueprintStore((state) => state.ServiceAction.createService);
  const setOption = useBlueprintStore((state) => state.ServiceAction.setOption);
  const createOption = useBlueprintStore((state) => state.OptionAction.createOption);
  const viewBox = useBlueprintStore((state) => state.viewBox);
  const initMouseState = useBlueprintStore((state) => state.CommonAction.initMouseState);
  const serviceFactory = new ServiceFactory();
  const optionFactory = new OptionFactory();
  const items = MenuItemList[type];

  const onClickCreateService = (item: ServiceItemInterface) => {
    initMouseState();
    const id = 'v' + v1().toString();
    createService(serviceFactory.createService({ type: item.type, x: viewBox.x, y: viewBox.y }), id);
    createOption(optionFactory.createOption(item.type, id));
  };

  return (
    <div className={`flex flex-wrap gap-x-[11px] ${isKumoTemplate === '' && 'cursor-pointer'}`}>
      {items &&
        items.map((item) => (
          <ItemButtonContainer
            key={item.type}
            type={item.type}
            onClick={() => {
              if (isKumoTemplate === '') onClickCreateService(item);
            }}
          >
            <svg
              cursor={`${isKumoTemplate === '' && 'pointer'}`}
              width={70}
              height={70}
              viewBox='0 0 70 70'
              xmlns='http://www.w3.org/2000/svg'
              className='service-svg animate-service'
            >
              <rect fill='transparent' stroke='#DAE2EC' width={70} height={70} />
              <svg x='17' y='17' width={36} height={36} viewBox='0 0 80 80'>
                {serviceFactory.getSvg({ type: item.type })}
              </svg>
              <text
                textAnchor='middle'
                alignmentBaseline='middle'
                transform='translate(35, 62)'
                className=' text-[11px]'
              >
                {item.name.toString()}
              </text>
            </svg>
          </ItemButtonContainer>
        ))}
    </div>
  );
};

export default ServiceItemWrapper;
