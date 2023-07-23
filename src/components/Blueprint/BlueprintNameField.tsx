import { useEffect, useState } from 'react';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';

const BlueprintNameField = () => {
  const blueprintSrc = useBlueprintStore((state) => state.blueprintElementPosition);
  const name = useBlueprintStore((state) => state.name);
  const setName = useBlueprintStore((state) => state.CommonAction.setName);
  const isEdit = useBlueprintStore((state) => state.isEdit);
  const setIsEdit = useBlueprintStore((state) => state.CommonAction.setIsEdit);

  useEffect(() => {
    const handleKeyboardEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        setIsEdit(false);
      }
    };
    const field = document.querySelector('.Input-Wrapper') as HTMLElement;
    field?.addEventListener('keydown', handleKeyboardEnter);
    return () => {
      field?.removeEventListener('keydown', handleKeyboardEnter);
    };
  }, []);

  return (
    <div className={`Input-Wrapper absolute w-auto m-4 left-${blueprintSrc.x} top-${blueprintSrc.y} z-10`}>
      {isEdit ? (
        <input
          className='w-auto min-w-[2ch]'
          type='text'
          onChange={(e) => {
            const t = e.target.value;
            setName(t);
          }}
          onClick={(e) => e.stopPropagation()}
          value={name}
          autoFocus
        />
      ) : (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsEdit(true);
          }}
        >
          {name}
        </div>
      )}
    </div>
  );
};

export default BlueprintNameField;
