interface IProps {
  active: boolean;
  onClick: () => void;
  name: string;
}

const RDSInfo = ({ active, onClick, name }: IProps) => {
  return (
    <div>
      <div
        className={`p-2 w-full h-fit flex justify-between text-center ${
          active ? 'bg-[#799ACF] text-white' : 'text-black'
        }`}
        onClick={onClick}
      >
        <label className='text-lg h-fit'>{name}</label>
      </div>
    </div>
  );
};

export default RDSInfo;
