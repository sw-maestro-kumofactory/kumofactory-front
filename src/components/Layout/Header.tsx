'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { current } from 'immer';

import { useLoginStore } from '@/src/hooks/Store/auth/useLoginStore';
import useStore from '@/src/hooks/useStore';
import { useLogin } from '@/src/hooks/Auth/useLogin';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { DeployState } from '@/src/types/Deploy';
import Status from '@/src/components/Layout/Status';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import BlueprintNameModal from '@/src/components/common/Modal/BlueprintNameModal';
import { getResourceId } from '@/src/api/deploy';
import ModalContainer from '@/src/components/common/Modal/ModalContainer';
import Templates from '@/src/components/Blueprint/Templates/Templates';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import { getBlueprintDeployStatus } from '@/src/api/blueprint';

export const Header = () => {
  const isLogin = useStore(useLoginStore, (state) => state.isLogin);
  const isTemplateOpen = useBlueprintStore((state) => state.isTemplateOpen);
  const currentBlueprintInfo = useBlueprintStore((state) => state.currentBlueprintInfo);
  const targetInstanceId = useDeployStore((state) => state.targetInstanceId);
  const userBlueprints = useAuthStore((state) => state.userBlueprints);
  const { setBlueprintId, setCurrentBlueprintInfo, setIsTemplateOpen } = useBlueprintStore(
    (state) => state.CommonAction,
  );
  const [currentDeployState, setCurrentDeployState] = useState<DeployState>(currentBlueprintInfo.status);
  const editUserBlueprints = useAuthStore((state) => state.UserBlueprintAction.editUserBlueprints);
  const addDeployedResource = useDeployStore((state) => state.DeployAction.addDeployedResource);

  const pathname = usePathname();
  const router = useRouter();
  const { setInterceptor, Logout } = useLogin();
  const [isBlueprint, setIsBlueprint] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const onClickRefresh = async () => {
    const data = await getBlueprintDeployStatus(currentBlueprintInfo.uuid);
    editUserBlueprints({ ...currentBlueprintInfo, status: data }, true);
    setCurrentBlueprintInfo({ ...currentBlueprintInfo, status: data as DeployState });
    setCurrentDeployState(data as DeployState);
  };

  const getResourceIds = async (id: string) => {
    try {
      const data = await getResourceId(id);
      Object.keys(data.result).map((key) => {
        addDeployedResource(key, data.result[key]);
      });
    } catch (e) {}
  };

  const onClickEdit = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    const d = pathname.split('/');
    if (d.length >= 3 && d[1] === 'blueprint') {
      setBlueprintId(d[2]);
      if (Object.keys(userBlueprints).includes(d[2])) setCurrentDeployState(userBlueprints[d[2]].status);
      if (d[3] === 'deploy') {
        setIsBlueprint(false);
        getResourceIds(currentBlueprintInfo.uuid);
      }
    } else {
      setIsBlueprint(true);
      setBlueprintId('');
    }
  }, [pathname]);

  useEffect(() => {
    if (targetInstanceId) getResourceIds(targetInstanceId);
  }, [targetInstanceId]);

  useEffect(() => {
    setCurrentDeployState(currentBlueprintInfo.status);
  }, [userBlueprints]);

  useEffect(() => {
    setIsEdit(false);
    setIsTemplateOpen(false);
    setInterceptor();
    return () => {
      setIsEdit(false);
      setIsTemplateOpen(false);
    };
  }, []);

  return (
    <div className='fixed flex justify-between w-full text-sm text-[#00C0B5] border-b-2 border-[#DAE2EC] h-[50px] p-4 select-none items-center'>
      <div className='flex gap-x-4 content-center p-4 items-center'>
        {/*<KumoLogo />*/}
        <Link className='rounded-2xl' href='/'>
          <svg width='74' height='13' viewBox='0 0 74 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M35.885 0H33.0342L28.0023 5.39335V0H25.7927V12.7995H28.0023V7.13131L33.4439 12.7896L33.4538 12.7995H36.4334L30.0336 6.1992L35.885 0Z'
              fill='#00C0B5'
            />
            <path
              d='M43.353 8.51009C43.353 9.26271 43.1228 9.88536 42.6698 10.3632C42.2167 10.8397 41.6188 11.0811 40.8909 11.0811C40.2485 11.0811 39.736 10.8645 39.3671 10.4362C38.9983 10.0067 38.8101 9.39516 38.8101 8.61902V3.74805H36.7107V8.74652C36.7107 9.59693 36.8642 10.3483 37.1687 10.9796C37.4856 11.6122 37.9362 12.1123 38.5093 12.4663C39.0812 12.8067 39.7608 12.98 40.527 12.98C41.7748 12.98 42.7935 12.5443 43.5548 11.684L43.5721 12.798H45.4537V3.74805H43.3543V8.51009H43.353Z'
              fill='#00C0B5'
            />
            <path
              d='M58.5129 3.56641C57.108 3.56641 56.031 4.09002 55.3131 5.1224C55.0333 4.64211 54.6335 4.26085 54.1247 3.98852C53.6135 3.70876 53.0329 3.56641 52.3991 3.56641C51.2975 3.56641 50.4136 3.96376 49.7724 4.74856L49.7551 3.74837H47.8735V12.7996H49.9729V7.78256C49.9729 7.09059 50.1784 6.5286 50.5832 6.11145C50.988 5.68315 51.5252 5.46652 52.18 5.46652C52.7742 5.46652 53.2372 5.65839 53.5578 6.03841C53.8784 6.41967 54.0418 6.96928 54.0418 7.67486V12.8008H56.1412V7.78256C56.1412 7.09059 56.3467 6.5286 56.7515 6.11145C57.1562 5.68315 57.6935 5.46652 58.3483 5.46652C58.9425 5.46652 59.3992 5.65839 59.7075 6.03841C60.0281 6.41967 60.1915 6.96928 60.1915 7.67486V12.8008H62.2909V7.51023C62.2909 6.29465 61.9517 5.32664 61.282 4.6322C60.6123 3.92539 59.6815 3.56641 58.5129 3.56641Z'
              fill='#00C0B5'
            />
            <path
              d='M73.0423 5.85744C72.6536 5.13948 72.0854 4.57254 71.3563 4.17147C70.6272 3.75803 69.7768 3.54883 68.8298 3.54883C67.8705 3.54883 67.0139 3.75803 66.286 4.17147C65.5569 4.57254 64.9826 5.13948 64.5815 5.85744C64.1928 6.56302 63.9948 7.37629 63.9948 8.27498C63.9948 9.17366 64.1916 9.99313 64.5815 10.7098C64.9826 11.4154 65.5557 11.9824 66.286 12.3958C67.0151 12.7969 67.8717 12.9999 68.8298 12.9999C69.7768 12.9999 70.6272 12.7969 71.3563 12.3958C72.0854 11.9824 72.6536 11.4154 73.0423 10.7098C73.4433 9.99313 73.6463 9.17366 73.6463 8.27498C73.6463 7.37505 73.4433 6.56178 73.0423 5.85744ZM70.2509 10.7037C69.8449 10.9537 69.3671 11.0812 68.8298 11.0812C68.2926 11.0812 67.8074 10.9537 67.3902 10.7037C66.9842 10.4536 66.6636 10.1144 66.437 9.69728C66.2105 9.2665 66.0954 8.78869 66.0954 8.27374C66.0954 7.76003 66.2105 7.28716 66.437 6.86877C66.6636 6.43923 66.9842 6.09387 67.3902 5.84382C67.8086 5.59377 68.2926 5.46627 68.8298 5.46627C69.3671 5.46627 69.8449 5.59377 70.2509 5.84382C70.668 6.09387 70.9887 6.43923 71.204 6.86877C71.4306 7.28716 71.5457 7.75879 71.5457 8.27374C71.5457 8.78869 71.4306 9.2665 71.2028 9.69728C70.9899 10.1144 70.6693 10.4536 70.2509 10.7037Z'
              fill='#00C0B5'
            />
            <path
              d='M16.5434 5.17375C15.9819 2.22724 13.395 0 10.2844 0C8.17201 0 6.30062 1.02844 5.14094 2.61211C6.10124 2.77111 6.95807 3.24054 7.60289 3.91186C7.88808 4.20967 8.13289 4.54659 8.32596 4.9138C8.32722 4.91507 8.32848 4.91633 8.32848 4.91759C8.35877 4.97564 8.38779 5.03368 8.41555 5.09299C8.4206 5.10309 8.42439 5.11318 8.42943 5.12328C8.45215 5.17375 8.47486 5.22423 8.49631 5.27597C8.50262 5.29111 8.50893 5.30751 8.51524 5.32392C8.53417 5.37061 8.55184 5.4173 8.5695 5.46399C8.57707 5.48292 8.58338 5.50311 8.58969 5.52204C8.60484 5.5662 8.61998 5.61037 8.63386 5.65453C8.64017 5.67725 8.64774 5.6987 8.65405 5.72141C8.66667 5.76432 8.67803 5.80722 8.68938 5.85013C8.69569 5.8741 8.702 5.89808 8.70831 5.92332C8.71841 5.96496 8.72724 6.00786 8.73733 6.05077C8.74238 6.07601 8.74869 6.10251 8.75374 6.12774C8.76131 6.16939 8.76888 6.21229 8.77645 6.25519C8.78024 6.28169 8.78529 6.30693 8.78907 6.33343C8.79538 6.37634 8.80043 6.4205 8.80548 6.46467C8.808 6.49117 8.81179 6.51641 8.81431 6.54291C8.81936 6.59086 8.82188 6.63881 8.8244 6.68676C8.82567 6.70948 8.82819 6.73219 8.82945 6.7549C8.83198 6.82557 8.83324 6.89623 8.83324 6.96816C8.83324 7.19909 8.81557 7.42623 8.7815 7.64832C8.45341 5.53213 6.62493 3.91186 4.41662 3.91186C4.41283 3.91186 4.40905 3.91186 4.40526 3.91186C1.97107 3.91817 0 5.89303 0 8.32848C0 10.7677 1.97738 12.7451 4.41662 12.7451H12.7123H12.8246H16.5308C18.6217 12.7451 20.3164 11.0504 20.3164 8.95943C20.3164 6.87226 18.628 5.18006 16.5434 5.17375Z'
              fill='#00C0B5'
            />
          </svg>
        </Link>
        {currentBlueprintInfo.uuid && (
          <>
            <div className='h-[19px] border-r-2 border-[#E2E9F0]'></div>
            <div className='flex gap-x-4 items-center text-[#323438]'>
              <div className='max-w-xs font-bold overflow-x-hidden '>{currentBlueprintInfo.name}</div>
              <div className='w-[29px] h-[29px] flex justify-center items-center rounded-md border-solid border-2 border-[#DAE2EC]'>
                <FontAwesomeIcon onClick={onClickEdit} className='h-full cursor-pointer' icon={faPenToSquare} />
              </div>
            </div>
          </>
        )}
      </div>

      {currentBlueprintInfo.uuid && (
        <>
          <div className='absolute top-[6px] left-1/2 -translate-x-1/2 flex items-center'>
            <div className='p-[4px] bg-[#EAF0F4] flex items-center rounded-md'>
              <div
                className={`flex items-center rounded-l-md h-[30px] ${
                  isBlueprint ? 'bg-white text-[#00C0B5]' : 'bg-[#EAF0F4] text-[#96ABBB]'
                } px-4 cursor-pointer gap-x-1`}
                onClick={() => {
                  setIsBlueprint(true);
                  router.push(`/blueprint/${currentBlueprintInfo.uuid}`);
                }}
              >
                <Image
                  src={isBlueprint ? '/icons/Design/blueprint.svg' : '/icons/Design/blueprint_gray.svg'}
                  width={16}
                  height={17}
                  alt={'blueprint_icon'}
                />
                Blueprint
              </div>
              <div
                className={`flex items-center rounded-r-md h-[30px] ${
                  isBlueprint ? 'bg-[#EAF0F4] text-[#96ABBB]' : 'bg-white text-[#00C0B5]'
                } px-4 cursor-pointer gap-x-1`}
                onClick={() => {
                  if (currentBlueprintInfo.status === 'SUCCESS') {
                    setIsBlueprint(false);
                    router.push(`/blueprint/${currentBlueprintInfo.uuid}/deploy`);
                  } else {
                    alert('배포가 완료되지 않았습니다.');
                  }
                }}
              >
                <Image
                  src={isBlueprint ? '/icons/Design/rocket_gray.svg' : '/icons/Design/rocket.svg'}
                  width={20}
                  height={20}
                  alt={'blueprint_icon'}
                />
                Deploy
              </div>
            </div>

            {isBlueprint && (
              <>
                <div className='h-[19px] border-r-2 ml-[16px] border-[#E2E9F0]'></div>
                <button
                  className='border-[#E2E9F0] border-2 w-[110px] h-[30px] text-black ml-[16px] rounded-md flex items-center justify-center gap-x-1'
                  onClick={() => {
                    setIsTemplateOpen(true);
                    router.push(`/blueprint/${currentBlueprintInfo.uuid}/?template=true`);
                  }}
                >
                  <Image src='/icons/Design/catalog_black.svg' width={15} height={15} alt='catalog' />
                  <div>Template</div>
                </button>
              </>
            )}
          </div>
          <div className='flex gap-x-8'>
            <Status onClick={onClickRefresh} currentState={currentDeployState} />
          </div>
        </>
      )}

      {!currentBlueprintInfo.uuid &&
        (isLogin ? (
          <>
            <div
              className={'cursor-pointer'}
              onClick={() => {
                Logout();
              }}
            >
              로그아웃
            </div>
          </>
        ) : (
          <>
            <Link className='bg-[#00C0B5] text-white px-4 py-2 rounded-2xl' href='/auth/login'>
              SignIn
            </Link>
          </>
        ))}
      <ModalContainer isShow={isTemplateOpen} setShow={setIsTemplateOpen}>
        <Templates />
      </ModalContainer>
      <ModalContainer isShow={isEdit} setShow={setIsEdit}>
        <BlueprintNameModal isShow={isEdit} setShow={setIsEdit}>
          Hi there
        </BlueprintNameModal>
      </ModalContainer>
    </div>
  );
};
