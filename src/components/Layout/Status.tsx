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
    <div className='flex gap-x-4 w-fit h-8 items-center justify-start'>
      <div>
        <FontAwesomeIcon className='cursor-pointer' icon={faRotate} onClick={onClick} />
      </div>
      <div className={`w-8 h-8 rounded-full`} style={{ backgroundColor: StatusStyle[currentState].fill }}></div>
      <div className='w-32 flex justify-center'>{currentState}</div>
    </div>
  );
};

export default Status;
