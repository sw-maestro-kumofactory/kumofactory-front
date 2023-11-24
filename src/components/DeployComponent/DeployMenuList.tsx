import AvailableInstances from '@/src/components/DeployComponent/Instance/AvailableInstances';
import AvailableRDS from '@/src/components/DeployComponent/RDS/AvailableRDS';

interface IProps {
  disabled?: boolean;
}

const DeployMenuList = ({ disabled }: IProps) => {
  return (
    <div className=' overflow-x-hidden fixed w-[294px] min-w-[294px] h-full border-r-2 border-[#195091]-100 overflow-scroll select-none bg-white'>
      <Title title='Available Instances' />
      <AvailableInstances />
    </div>
  );
};

const Title = ({ title }: { title: string }) => {
  return <div className='ml-[32px] my-[23px] text-[#323438] font-bold text-[#15px]'>{title}</div>;
};

export default DeployMenuList;
