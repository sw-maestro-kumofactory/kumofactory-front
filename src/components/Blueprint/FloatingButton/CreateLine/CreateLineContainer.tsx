'use client';
import CreateLineButton from '@/src/components/Blueprint/FloatingButton/CreateLine/CreateLineButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpLong } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';

const CreateLineContainer = () => {
  const lineContainerLocation = useBlueprintStore((state) => state.lineContainerLocation);
  if (lineContainerLocation.x === -1) return <></>;
  return (
    <div
      style={{
        top: lineContainerLocation.y.toString() + 'px',
        left: lineContainerLocation.x.toString() + 'px',
      }}
      className={`flex flex-col absolute gap-y-4 text-2xl w-12 `}
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
