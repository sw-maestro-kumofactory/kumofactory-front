'use client';
import ItemButtonContainer from '@/src/components/common/Button/ItemButton';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
const AreaItem = ({ type }: { type: string }) => {
  const { createArea } = useBlueprintStore((state) => state.AreaAction);
  return (
    <ItemButtonContainer
      onClick={() =>
        createArea({
          id: new Date().toString(),
          width: 500,
          height: 500,
          sx: 50,
          sy: 50,
        })
      }
    >
      {type}
    </ItemButtonContainer>
  );
};

export default AreaItem;
