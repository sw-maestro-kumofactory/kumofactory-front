'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { faPalette, faRocket } from '@fortawesome/free-solid-svg-icons';

import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/common/Popover';
import { ExportSvg, getSvgBlob } from '@/src/utils/ExportSvg';
import { postDeployBlueprintData, postSaveBlueprintData } from '@/src/api/blueprint';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';

const DeployButton = () => {
  const [deploying, setDeploying] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { blueprintToJson, setBlueprintScope } = useBlueprintStore((state) => state.CommonAction);
  const currentBlueprintInfo = useBlueprintStore((state) => state.currentBlueprintInfo);
  const scope = useBlueprintStore((state) => state.blueprintScope[currentBlueprintInfo.uuid]);
  const options = useBlueprintStore((state) => state.options);

  const getData = () => {
    const body = blueprintToJson({
      id: currentBlueprintInfo.uuid,
      name: currentBlueprintInfo.name,
      scope: currentBlueprintInfo.scope,
    });
    body.components.map((component, index) => {
      component.options = options[component.id];
    });
    body.scope = scope;
    const encodedSVG = getSvgBlob();
    body['svgFile'] = encodedSVG;
    return body;
  };

  const onClickSaveConfirm = async () => {
    try {
      const data = getData();
      await postSaveBlueprintData(data);
    } catch (e) {
      alert('Save Failed!');
    }
  };

  const onClickExportButton = () => {
    setOpen(false);
    ExportSvg();
  };

  const onClickDeployButton = async () => {
    try {
      const data = getData();
      await postDeployBlueprintData(data);
    } catch (e) {
      alert('Deploy Failed!');
    }
  };
  return (
    <div className='absolute right-4 top-20'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger onClick={() => setOpen((v) => !v)}>
          <div className='p-2 bg-[#799ACF] text-white rounded-md cursor-pointer'>
            {deploying ? 'Deploying' : 'Deploy'}
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
