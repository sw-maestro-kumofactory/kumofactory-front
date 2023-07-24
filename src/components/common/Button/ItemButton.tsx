interface IProps {
  onClick?: (e: any) => void;
  children: React.ReactNode;
}
const ItemButtonContainer = ({ children, onClick }: IProps) => {
  return (
    <div
      className='flex flex-col items-center justify-center text-white w-20 cursor-pointer rounded-2xl mt-4 select-none mr-1'
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ItemButtonContainer;
