import { useState } from 'react';

import ConfirmPopover from '@/src/components/common/Popover/ConfirmPopover';

interface IProps {
  onClick: () => void;
}

const DeployButton = ({ onClick }: IProps) => {
  const [deploying, setDeploying] = useState<boolean>(false);

  return (
    <div className='absolute right-8 top-20'>
      <ConfirmPopover
        Heading={'Confirm Deploy?'}
        Description={'Your Architecture will be deployed in AWS'}
        onClickConfirm={onClick}
      >
        <div className='p-2 bg-[#799ACF] text-white rounded-md cursor-pointer'>
          {deploying ? 'Deploying' : 'Deploy'}
        </div>
      </ConfirmPopover>
    </div>
  );
};

export default DeployButton;
