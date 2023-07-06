'use client';
import CreateLineButton from '@/src/components/Blueprint/FloatingButton/CreateLine/CreateLineButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  x: number;
  y: number;
}

const CreateLineContainer = ({ x, y }: IProps) => {
  return (
    <div
      style={{
        top: y.toString() + 'px',
        left: x.toString() + 'px',
      }}
      className={`flex flex-col absolute gap-y-4 text-2xl w-12 z-10`}
    >
      <CreateLineButton>
        <FontAwesomeIcon color={'white'} icon={faArrowUpLong} />
      </CreateLineButton>
      <CreateLineButton>
        <FontAwesomeIcon color={'white'} icon={faArrowUpLong} />
      </CreateLineButton>
    </div>
  );
};

export default CreateLineContainer;
