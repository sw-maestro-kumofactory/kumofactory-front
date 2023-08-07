'use client';
import { useFloating } from '@floating-ui/react';
import { useLayoutEffect, useState } from 'react';

import useTutorialStore from '@/src/hooks/Store/Tutorial/useTutorialStore';

interface IProps {
  anchor: Element | null;
}

const Tooltip = ({ anchor }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { decreaseNumber, increaseNumber, setIsDone } = useTutorialStore((state) => state.tutorialAction);
  const { isPositioned, refs, floatingStyles } = useFloating({
    elements: {
      reference: anchor,
    },
    open: isOpen,
  });

  useLayoutEffect(() => {
    if (isPositioned) {
      console.log('isPositioned');
      setIsOpen(true);
    } else {
      console.log('!isPositioned');
      setIsOpen(false);
    }
  }, [isPositioned]);

  return (
    <div className='z-20 bg-white rounded-xl ' ref={refs.setFloating} style={floatingStyles}>
      <div className='w-full h-full border-2 border-solid border-gray-400  rounded-xl p-4'>
        <div>tutorial Component</div>
        <div className='flex gap-x-4 mt-4'>
          <div id='btn-set' className='flex gap-x-1 align-middle border-solid border-2 border-[#195091] rounded-xl p-2'>
            <button onClick={decreaseNumber}>{'<- prev'}</button>
            <div>|</div>
            <button onClick={increaseNumber}>{'next- >'}</button>
          </div>
          <button onClick={setIsDone}>skip</button>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
