import ItemButtonContainer from '@/src/components/common/Button/ItemButton';

interface IProps {
  children: React.ReactNode;
}

const CreateLineButton = ({ children }: IProps) => {
  return <button className='flex items-center justify-center w-12 h-12 rounded-full bg-[#195091]'>{children}</button>;
};

export default CreateLineButton;
