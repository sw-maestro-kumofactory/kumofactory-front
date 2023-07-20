'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';

import CreateLineButton from '@/src/components/Blueprint/FloatingButton/CreateLine/CreateLineButton';

const CreateLineContainer = () => {
  return (
    <div
      className={`flex flex-col absolute text-2xl w-12 z-20`}
      onClick={(e) => {
        e.stopPropagation();
        console.log(true);
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <CreateLineButton>
        <FontAwesomeIcon color={'white'} icon={faArrowUpLong} />
      </CreateLineButton>
    </div>
  );
};

export default CreateLineContainer;
