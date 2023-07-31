import AvailableInstances from '@/src/components/DeployComponent/AvailableInstances';

const DeployMenuList = () => {
  return (
    <div className='overflow-x-hidden w-[294px] min-w-[294px] h-full border-r-2 border-[#195091]-100 overflow-scroll select-none'>
      {Title({ title: 'Available Instnaces' })}
      <AvailableInstances />
      {Title({ title: 'Database Setting' })}
    </div>
  );
};

const Title = ({ title }: { title: string }) => {
  return <div className='w-full flex justify-center items-center text-[#195091] h-20 font-bold text-xl'>{title}</div>;
};

export default DeployMenuList;
