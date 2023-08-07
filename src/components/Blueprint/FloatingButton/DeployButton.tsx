interface IProps {
  onClick: (e: React.MouseEvent) => void;
}

const DeployButton = ({ onClick }: IProps) => {
  return (
    <div className='fixed right-8 top-24 p-4 bg-[#799acf] rounded-xl text-white cursor-pointer' onClick={onClick}>
      Deploy
    </div>
  );
};

export default DeployButton;
