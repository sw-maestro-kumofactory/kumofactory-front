interface IProps {
  onClick?: (e: any) => void;
  type: string;
  children: React.ReactNode;
}
const ItemButtonContainer = ({ children, type, onClick }: IProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-white w-[70px] rounded-2xl mt-2 select-none ${type}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ItemButtonContainer;
