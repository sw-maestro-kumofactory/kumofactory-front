import DeployMenuList from '@/src/components/DeployComponent/DeployMenuList';
import DeployComponent from '@/src/components/DeployComponent/Application/DeployComponent';

const DeployPage = () => {
  return (
    <div className='h-full flex'>
      <DeployMenuList />
      <DeployComponent />
    </div>
  );
};

export default DeployPage;
