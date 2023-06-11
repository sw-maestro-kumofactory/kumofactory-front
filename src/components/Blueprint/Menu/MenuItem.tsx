interface IProps {
  name: string;
  onClick: () => void;
}

const MenuItem = ({ name }: IProps) => {
  return (
    <div className='flex items-center justify-center bg-[#799ACF] text-white text-2xl font-bold h-32 cursor-pointer rounded-2xl m-4 select-none'>
      {name}
    </div>
  );
};

export default MenuItem;
