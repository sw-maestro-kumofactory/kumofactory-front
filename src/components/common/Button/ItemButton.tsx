interface IProps {
  onClick?: (e: any) => void;
  type: string;
  children: React.ReactNode;
}
const ItemButtonContainer = ({ children, type, onClick }: IProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-white w-[70px] cursor-pointer rounded-2xl mt-4 select-none mr-1 ${type}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ItemButtonContainer;
