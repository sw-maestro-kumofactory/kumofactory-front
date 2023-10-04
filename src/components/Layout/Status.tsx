import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

import { DeployState } from '@/src/types/Deploy';
import { StatusStyle } from '@/src/assets/StatusStyle';

interface IProps {
  currentState: DeployState;
  onClick: () => void;
}

const Status = ({ currentState, onClick }: IProps) => {
  return (
    <div className='flex gap-x-2 w-fit h-8 items-center justify-start'>
      <div className={`w-8 h-8 rounded-full`} style={{ backgroundColor: StatusStyle[currentState].fill }}></div>
      <div className='w-32 flex justify-center'>{currentState}</div>
      <div className='flex justify-center items-center w-8 h-8 border-[#E2E9F0] border-2 rounded-xl text-[#323438]'>
        <FontAwesomeIcon className='cursor-pointer' icon={faRotate} onClick={onClick} />
      </div>
    </div>
  );
};

export default Status;
