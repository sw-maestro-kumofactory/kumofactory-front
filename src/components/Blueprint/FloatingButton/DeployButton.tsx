'use client';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { faPalette, faRocket } from '@fortawesome/free-solid-svg-icons';
import { current } from 'immer';

import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/common/Popover';
import { ExportSvg, getSvgBlob } from '@/src/utils/ExportSvg';
import { postDeployBlueprintData, postSaveBlueprintData } from '@/src/api/blueprint';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import { postDeployTemplate, postWebThreeTier } from '@/src/api/template';
import { kumoTemplate } from '@/src/assets/kumoTemplate';

const DeployButton = () => {
  const { blueprintToJson, setBlueprintScope } = useBlueprintStore((state) => state.CommonAction);
  const currentBlueprintInfo = useBlueprintStore((state) => state.currentBlueprintInfo);
  const scope = useBlueprintStore((state) => state.blueprintScope[currentBlueprintInfo.uuid]);
  const options = useBlueprintStore((state) => state.options);
  const setCurrentBlueprintInfo = useBlueprintStore((state) => state.CommonAction.setCurrentBlueprintInfo);
  const editUserBlueprints = useAuthStore((state) => state.UserBlueprintAction.editUserBlueprints);
  const isKumoTemplate = useBlueprintStore((state) => state.isKumoTemplate);
  const [open, setOpen] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(currentBlueprintInfo.status === 'PROVISIONING');

  const getData = () => {
    const body = blueprintToJson({
      id: currentBlueprintInfo.uuid,
      name: currentBlueprintInfo.name,
      description: currentBlueprintInfo.description,
      scope: currentBlueprintInfo.scope,
    });
    body.isTemplate = !!isKumoTemplate;
    // TODO : 이미지가 들어가야함.
    if (isKumoTemplate) {
      body['svgFile'] = '';
    } else {
      body.components.map((component, index) => {
        component.options = options[component.id];
      });
      body.scope = scope;
      const encodedSVG = getSvgBlob();
      body['svgFile'] = encodedSVG;
    }
    return body;
  };

  const onClickSaveConfirm = async () => {
    try {
      const data = getData();
      if (isKumoTemplate) {
        await postDeployTemplate(data, kumoTemplate[isKumoTemplate].name.replaceAll(' ', '_'), 'false');
      } else {
        await postSaveBlueprintData(data);
      }
      alert('Save Success!');
      setOpen(false);
    } catch (e) {
      alert('Save Failed!');
    }
  };

  const onClickExportButton = () => {
    ExportSvg();
    alert('Export Success!');
    setOpen(false);
  };

  const onClickDeployButton = async () => {
    try {
      const data = getData();
      if (isKumoTemplate) {
        await postDeployTemplate(data, kumoTemplate[isKumoTemplate].name.replaceAll(' ', '_'), 'true');
      } else {
        await postDeployBlueprintData(data);
      }
      editUserBlueprints({ ...currentBlueprintInfo, status: 'PROVISIONING' }, true);
      setCurrentBlueprintInfo({ ...currentBlueprintInfo, status: 'PROVISIONING' });
      alert('Deploy Success!, You can see the status in the header.');
      setOpen(false);
    } catch (e) {
      alert('Deploy Failed!');
    }
  };

  // const onClickWebThreeTier = async () => {
  //   let publicCnt = 1;
  //   let privateCnt = 1;
  //   const body = blueprintToJson({
  //     id: currentBlueprintInfo.uuid,
  //     name: currentBlueprintInfo.name,
  //     description: currentBlueprintInfo.description,
  //     scope: currentBlueprintInfo.scope,
  //   });
  //   body.components.map((component, index) => {
  //     component.options = options[component.id];
  //     if (component.type === 'EC2') {
  //       if (options[component.id].subnetType === 'PUBLIC') {
  //         component.type = `PUBLIC_INSTANCE${publicCnt}`;
  //         publicCnt += 1;
  //       } else {
  //         component.type = `PRIVATE_INSTANCE${privateCnt}`;
  //         privateCnt += 1;
  //       }
  //     }
  //   });
  //   body.scope = scope;
  //   const encodedSVG = getSvgBlob();
  //   body['svgFile'] = encodedSVG;
  //   console.log(body);
  //   const data = await postWebThreeTier(body);
  //   console.log(data);
  //   return body;
  // };

  const handlePopoverTrigger = () => {
    if (btnDisabled) {
      setOpen(false);
    } else {
      setOpen((v) => !v);
    }
  };

  useEffect(() => {
    if (currentBlueprintInfo.status === 'PROVISIONING') {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [currentBlueprintInfo]);

  return (
    <div className='absolute right-4 top-16 z-20'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger onClick={handlePopoverTrigger}>
          <div className='p-2 bg-[#00CBBF] text-white rounded-md cursor-pointer'>
            {btnDisabled ? 'Deploying' : 'Deploy'}
          </div>
        </PopoverTrigger>
        <PopoverContent className='bg-white justify-center items-center rounded-2xl shadow-lg'>
          <div
            className='px-4 py-2 w-full flex gap-2 items-center cursor-pointer hover:bg-gray-100'
            onClick={onClickSaveConfirm}
          >
            <FontAwesomeIcon className={``} icon={faFloppyDisk} />
            Save Architecture
          </div>
          <div
            className='px-4 py-2 w-full flex gap-2 items-center cursor-pointer hover:bg-gray-100'
            onClick={onClickExportButton}
          >
            <FontAwesomeIcon icon={faPalette} />
            <input type='file' id='fileInput' className='hidden' />
            Export Architecture
          </div>
          <div
            className='px-4 py-2 w-full flex gap-2 items-center cursor-pointer hover:bg-gray-100'
            onClick={onClickDeployButton}
          >
            <FontAwesomeIcon icon={faRocket} />
            Deploy To AWS
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DeployButton;
