interface IProps {
  onClick?: (e: any) => void;
  children: React.ReactNode;
}
const ItemButtonContainer = ({ children, onClick }: IProps) => {
  return (
    <div
      className='flex flex-col items-center justify-center text-white text-lg font-bold w-20 cursor-pointer rounded-2xl mx-3 select-none'
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ItemButtonContainer;
