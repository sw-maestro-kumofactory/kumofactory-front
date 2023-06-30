interface IProps {
  onClick: (e: any) => void;
  children: React.ReactNode;
}
const ItemButtonContainer = ({ children, onClick }: IProps) => {
  return (
    <div
      className='flex items-center justify-center bg-[#799ACF] text-white text-2xl font-bold h-32 cursor-pointer rounded-2xl m-4 select-none'
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ItemButtonContainer;
