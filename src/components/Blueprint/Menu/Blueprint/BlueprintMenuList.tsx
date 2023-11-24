'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

import { Menus } from '@/src/assets/Menus';
import { AreaItemList } from '@/src/assets/MenuItems';
import DropDown from '@/src/components/Blueprint/downshiftTest/DropDown';
import ServiceItemWrapper from '@/src/components/Blueprint/Menu/Blueprint/ServiceItemWrapper';
import AreaItemWrapper from '@/src/components/Blueprint/Menu/Blueprint/AreaItemWrapper';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import { postWebThreeTier } from '@/src/api/template';

const Title = ({ title }: { title: string }) => (
  <div className='w-full font-semibold h-16 text-[12px] flex items-center mx-4 mt-2'>{title}</div>
);

const onClickWebThreetier = async () => {
  alert('웹 3계층 아키텍처를 배포합니다.');
  // const data = await postWebThreetier();
  // console.log(data);
};

const BlueprintMenuList = () => {
  const router = useRouter();
  const isKumoTemplate = useBlueprintStore((state) => state.isKumoTemplate);
  const { blueprintToJson, setBlueprintScope } = useBlueprintStore((state) => state.CommonAction);
  const currentBlueprintInfo = useBlueprintStore((state) => state.currentBlueprintInfo);
  const scope = useBlueprintStore((state) => state.currentBlueprintInfo.scope);

  const onClickBack = () => {
    router.back();
  };

  return (
    <div
      className={`overflow-x-hidden w-[290px] min-w-[290px] h-full border-r-2 border-[#195091]-100 select-none
      ${isKumoTemplate !== '' && 'pointer-events-none '}`}
    >
      {isKumoTemplate !== '' && (
        <div className='fixed w-[290px] h-screen overflow-y-hiddenx font-bold text-white flex items-center justify-center p-4 bg-black/80 z-50'>
          When using Kumo Template, You can't add or change services
        </div>
      )}
      <div
        className='flex items-center mx-5 mt-5 text-sm text-[#696969] font-bold gap-x-2 cursor-pointer'
        onClick={onClickBack}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Back To List</span>
      </div>
      <div className='flex justify-between items-center text-[12px] font-semibold w-full mt-5'>
        <div className='w-full font-semibold flex items-center mx-5'>Scope</div>
        <div className='flex gap-x-2'>
          <div>{scope}</div>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input
              type='checkbox'
              value=''
              className='sr-only peer'
              checked={scope === 'PUBLIC'}
              onChange={() => {
                setBlueprintScope(currentBlueprintInfo.uuid, scope === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC');
              }}
            />
            <div className="w-9 h-5 border-solid border-[#DAE2EC] border-2 peer-focus:outline-none peer-focus:ring-blue-300  rounded-full peer bg-white peer-checked:after:translate-x-full peer-checked:after:border-[#00C0B5] peer-checked:after:bg-[#00C0B5] after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-[#CDD7E4] after:border-gray-300 after:border after:rounded-full after:h-[14px] after:w-[14px] after:transition-all peer-checked:bg-white  mr-4"></div>
          </label>
        </div>
      </div>
      <DropDown title={'Areas'} key={'Areas'} absolute={false}>
        {AreaItemList.map((AreaItem) => (
          <AreaItemWrapper key={AreaItem.name} type={AreaItem.type} name={AreaItem.name} scope={AreaItem.scope} />
        ))}
      </DropDown>
      {Menus.map((menu) => (
        <DropDown title={menu.title} key={menu.title} absolute={false}>
          <ServiceItemWrapper type={menu.title} />
        </DropDown>
      ))}
    </div>
  );
};

export default BlueprintMenuList;
