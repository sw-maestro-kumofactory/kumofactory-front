'use client';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
interface IProps {
  children: React.ReactNode;
}

const CreateLineButton = ({ children }: IProps) => {
  const { setLineDrawingMode } = useBlueprintStore((state) => state.LineAction);
  return (
    <button
      className='flex items-center justify-center w-12 h-12 rounded-full bg-[#00C0B5]'
      onClick={() => setLineDrawingMode(true)}
    >
      {children}
    </button>
  );
};

export default CreateLineButton;
