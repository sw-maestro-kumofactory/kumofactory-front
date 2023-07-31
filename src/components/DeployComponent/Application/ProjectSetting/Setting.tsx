import EV from '@/src/components/DeployComponent/Application/ProjectSetting/EV';

interface IProps {
  id: string;
}
const Setting = ({ id }: IProps) => {
  return (
    <div className='w-full h-full flex p-8 '>
      <EV />
    </div>
  );
};

export default Setting;
